import { Client } from '@stomp/stompjs'

/**
 * STOMP WebSocket 클라이언트 클래스
 *
 * STOMP over WebSocket을 사용하여 미션 추적 이벤트를 백엔드로 전송합니다.
 *
 * 주요 기능:
 * - STOMP 프로토콜 기반 WebSocket 연결
 * - Destination 기반 메시지 라우팅
 * - Pub/Sub 패턴 지원
 * - ACK 및 에러 메시지 구독
 * - 자동 재연결
 *
 * @class WebSocketClient
 */
export class WebSocketClient {
  constructor() {
    this.stompClient = null
    this.attemptId = null
    this.sessionId = null
    this.isConnected = false
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 1000 // 1초
    this.eventListeners = new Map()
    this.subscriptions = new Map()
    this.pendingEvents = [] // 연결 대기 중 이벤트 큐
  }

  /**
   * STOMP WebSocket 연결 시작
   *
   * @param {string} wsUrl - WebSocket 서버 URL (예: ws://localhost:8080/ws)
   * @param {string} attemptId - 미션 시도 ID
   * @param {string} sessionId - 세션 ID
   * @returns {Promise<void>}
   */
  connect(wsUrl, attemptId, sessionId) {
    return new Promise((resolve, reject) => {
      try {
        // 기존 연결이 있으면 닫기
        if (this.stompClient) {
          this.disconnect()
        }

        this.attemptId = attemptId
        this.sessionId = sessionId

        // STOMP 클라이언트 생성
        this.stompClient = new Client({
          brokerURL: wsUrl,

          // 연결 성공
          onConnect: (frame) => {
            console.log('[WebSocket] Connected:', { attemptId, sessionId })
            console.log('[WebSocket] STOMP frame:', frame)
            this.isConnected = true
            this.reconnectAttempts = 0

            // ACK 메시지 구독
            try {
              const ackSubscription = this.stompClient.subscribe(
                `/topic/mission/${attemptId}/ack`,
                (message) => {
                  const ack = JSON.parse(message.body)
                  console.log('[WebSocket] ACK received:', ack)
                  this.emit('event_ack', ack)
                }
              )
              this.subscriptions.set('ack', ackSubscription)

              // 에러 메시지 구독
              const errorSubscription = this.stompClient.subscribe(
                `/topic/mission/${attemptId}/error`,
                (message) => {
                  const error = JSON.parse(message.body)
                  console.error('[WebSocket] Server error:', error)
                  this.emit('server_error', error)
                }
              )
              this.subscriptions.set('error', errorSubscription)

              console.log('[WebSocket] Subscriptions ready')

              // Connection ACK 이벤트 발생
              this.emit('open', { attemptId, sessionId })

              // 대기 중이던 이벤트 전송
              this.flushPendingEvents()

              resolve()
            } catch (error) {
              console.error('[WebSocket] Subscription failed:', error)
              reject(error)
            }
          },

          // 연결 종료
          onDisconnect: (frame) => {
            console.log('[WebSocket] Disconnected:', {
              sessionId: this.sessionId,
              frame: frame
            })
            this.isConnected = false
            this.emit('close', { reason: 'disconnected' })
          },

          // STOMP 에러
          onStompError: (frame) => {
            console.error('[WebSocket] STOMP error:', frame.headers['message'])
            console.error('[WebSocket] Error details:', frame.body)
            this.isConnected = false
            this.emit('error', { error: frame.body })
            reject(new Error(frame.headers['message'] || 'STOMP error'))
          },

          // WebSocket 에러
          onWebSocketError: (event) => {
            console.error('[WebSocket] WebSocket error:', event)
            this.emit('error', { error: event })
            reject(event)
          },

          // WebSocket 닫힘
          onWebSocketClose: (event) => {
            console.log('[WebSocket] WebSocket closed:', {
              sessionId: this.sessionId,
              code: event.code,
              reason: event.reason,
              wasClean: event.wasClean
            })
            this.isConnected = false
            this.emit('close', { code: event.code, reason: event.reason })

            // 비정상 종료 시 재연결 시도
            if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
              this.attemptReconnect(wsUrl, attemptId, sessionId)
            }
          },

          // 디버그 로그 (개발 환경에서만)
          debug: (str) => {
            if (import.meta.env.DEV) {
              console.log('[WebSocket] STOMP Debug:', str)
            }
          }
        })

        // 연결 시작
        this.stompClient.activate()

      } catch (error) {
        console.error('[WebSocket] Connection failed:', error)
        reject(error)
      }
    })
  }

  /**
   * 재연결 시도
   *
   * @param {string} wsUrl - WebSocket 서버 URL
   * @param {string} attemptId - 미션 시도 ID
   * @param {string} sessionId - 세션 ID
   */
  attemptReconnect(wsUrl, attemptId, sessionId) {
    this.reconnectAttempts++
    const delay = this.reconnectDelay * this.reconnectAttempts

    console.log(`[WebSocket] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`, { sessionId })

    setTimeout(() => {
      this.connect(wsUrl, attemptId, sessionId)
        .catch((error) => {
          console.error('[WebSocket] Reconnection failed:', error)
        })
    }, delay)
  }

  /**
   * 이벤트 전송 (STOMP destination 사용)
   *
   * @param {Object} event - 이벤트 데이터
   * @param {string} event.eventType - 이벤트 타입
   * @param {string} event.sessionId - 세션 ID
   * @param {Object} event.data - 이벤트별 데이터
   * @returns {Promise<void>}
   */
  sendEvent(event) {
    return new Promise((resolve, reject) => {
      // 필수 필드 검증
      if (!event.eventType || !event.sessionId || !event.data) {
        const error = new Error('Missing required event fields: eventType, sessionId, data')
        console.error('[WebSocket] Invalid event:', error)
        reject(error)
        return
      }

      // STOMP 메시지 포맷
      const message = {
        eventType: event.eventType,
        timestamp: new Date().toISOString(),
        sessionId: event.sessionId,
        attemptId: this.attemptId,
        data: event.data
      }

      // 연결되지 않은 경우 큐에 저장
      if (!this.isConnected || !this.stompClient?.connected) {
        console.warn('[WebSocket] Not connected, queueing event:', {
          eventType: event.eventType,
          sessionId: event.sessionId
        })
        this.pendingEvents.push({ message, resolve, reject })
        // 큐에 저장 후 즉시 resolve (나중에 연결되면 전송됨)
        resolve()
        return
      }

      // STOMP destination으로 이벤트 전송
      try {
        this.stompClient.publish({
          destination: '/app/mission/event',
          body: JSON.stringify(message)
        })
        console.log('[WebSocket] Event sent:', {
          eventType: event.eventType,
          sessionId: event.sessionId,
          attemptId: this.attemptId
        })
        resolve()
      } catch (error) {
        console.error('[WebSocket] Failed to send event:', error)
        reject(error)
      }
    })
  }

  /**
   * 대기 중인 이벤트 전송
   */
  flushPendingEvents() {
    if (this.pendingEvents.length === 0) return

    console.log(`[WebSocket] Flushing ${this.pendingEvents.length} pending events`, { sessionId: this.sessionId })

    const events = [...this.pendingEvents]
    this.pendingEvents = []

    events.forEach(({ message, resolve, reject }) => {
      try {
        this.stompClient.publish({
          destination: '/app/mission/event',
          body: JSON.stringify(message)
        })
        console.log('[WebSocket] Pending event sent:', {
          eventType: message.eventType,
          sessionId: message.sessionId
        })
        resolve()
      } catch (error) {
        console.error('[WebSocket] Failed to send pending event:', error)
        reject(error)
      }
    })
  }

  /**
   * 이벤트 리스너 등록
   *
   * @param {string} eventName - 이벤트 이름 (open, close, error, event_ack, server_error)
   * @param {Function} callback - 콜백 함수
   */
  on(eventName, callback) {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, [])
    }
    this.eventListeners.get(eventName).push(callback)
  }

  /**
   * 이벤트 리스너 제거
   *
   * @param {string} eventName - 이벤트 이름
   * @param {Function} callback - 콜백 함수
   */
  off(eventName, callback) {
    if (!this.eventListeners.has(eventName)) return

    const listeners = this.eventListeners.get(eventName)
    const index = listeners.indexOf(callback)
    if (index !== -1) {
      listeners.splice(index, 1)
    }
  }

  /**
   * 이벤트 발생
   *
   * @param {string} eventName - 이벤트 이름
   * @param {*} data - 이벤트 데이터
   */
  emit(eventName, data) {
    if (!this.eventListeners.has(eventName)) return

    const listeners = this.eventListeners.get(eventName)
    listeners.forEach((callback) => {
      try {
        callback(data)
      } catch (error) {
        console.error(`[WebSocket] Error in ${eventName} listener:`, error)
      }
    })
  }

  /**
   * WebSocket 연결 종료
   */
  disconnect() {
    if (this.stompClient) {
      console.log('[WebSocket] Disconnecting...', {
        sessionId: this.sessionId,
        attemptId: this.attemptId
      })

      // 모든 구독 해제
      this.subscriptions.forEach((subscription, key) => {
        try {
          subscription.unsubscribe()
          console.log(`[WebSocket] Unsubscribed from ${key}`)
        } catch (error) {
          console.error(`[WebSocket] Failed to unsubscribe from ${key}:`, error)
        }
      })
      this.subscriptions.clear()

      // STOMP 연결 종료
      this.stompClient.deactivate()
      this.isConnected = false
      this.stompClient = null
    }
  }

  /**
   * 연결 상태 확인
   *
   * @returns {boolean}
   */
  getConnectionState() {
    return this.isConnected && this.stompClient?.connected
  }

  /**
   * 대기 중인 이벤트 개수
   *
   * @returns {number}
   */
  getPendingEventCount() {
    return this.pendingEvents.length
  }
}

/**
 * 싱글톤 WebSocket 클라이언트 인스턴스
 */
export const wsClient = new WebSocketClient()
