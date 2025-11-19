/**
 * WebSocket 클라이언트 클래스
 *
 * 미션 추적 이벤트를 백엔드로 전송하는 WebSocket 연결을 관리합니다.
 *
 * 주요 기능:
 * - WebSocket 연결 생성 및 관리
 * - 이벤트 메시지 전송
 * - 연결 상태 관리 및 재연결
 * - 서버 응답 처리 (connection_ack, event_ack, error)
 *
 * @class WebSocketClient
 */
export class WebSocketClient {
  constructor() {
    this.ws = null
    this.attemptId = null
    this.isConnected = false
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 1000 // 1초
    this.eventListeners = new Map()
    this.pendingEvents = [] // 연결 대기 중 이벤트 큐
  }

  /**
   * WebSocket 연결 시작
   *
   * @param {string} wsUrl - WebSocket 서버 URL (예: wss://your-domain.com/ws)
   * @param {string} attemptId - 미션 시도 ID
   * @param {string} wsToken - WebSocket 인증 토큰
   * @returns {Promise<void>}
   */
  connect(wsUrl, attemptId, wsToken) {
    return new Promise((resolve, reject) => {
      try {
        // 기존 연결이 있으면 닫기
        if (this.ws) {
          this.ws.close()
        }

        this.attemptId = attemptId

        // WebSocket 연결 생성
        const url = `${wsUrl}?attemptId=${attemptId}&token=${wsToken}`
        this.ws = new WebSocket(url)

        // 연결 성공
        this.ws.onopen = () => {
          console.log('[WebSocket] Connected:', attemptId)
          this.isConnected = true
          this.reconnectAttempts = 0

          // 대기 중이던 이벤트 전송
          this.flushPendingEvents()

          this.emit('open', { attemptId })
          resolve()
        }

        // 메시지 수신
        this.ws.onmessage = (event) => {
          this.handleMessage(event.data)
        }

        // 연결 종료
        this.ws.onclose = (event) => {
          console.log('[WebSocket] Disconnected:', event.code, event.reason)
          this.isConnected = false
          this.emit('close', { code: event.code, reason: event.reason })

          // 비정상 종료 시 재연결 시도
          if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.attemptReconnect(wsUrl, attemptId, wsToken)
          }
        }

        // 에러 처리
        this.ws.onerror = (error) => {
          console.error('[WebSocket] Error:', error)
          this.emit('error', { error })
          reject(error)
        }

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
   * @param {string} wsToken - WebSocket 인증 토큰
   */
  attemptReconnect(wsUrl, attemptId, wsToken) {
    this.reconnectAttempts++
    const delay = this.reconnectDelay * this.reconnectAttempts

    console.log(`[WebSocket] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`)

    setTimeout(() => {
      this.connect(wsUrl, attemptId, wsToken)
        .catch((error) => {
          console.error('[WebSocket] Reconnection failed:', error)
        })
    }, delay)
  }

  /**
   * 서버 메시지 처리
   *
   * @param {string} data - 서버에서 받은 메시지 (JSON string)
   */
  handleMessage(data) {
    try {
      const message = JSON.parse(data)
      console.log('[WebSocket] Message received:', message)

      switch (message.type) {
        case 'connection_ack':
          console.log('[WebSocket] Connection acknowledged:', message.attemptId)
          this.emit('connection_ack', message)
          break

        case 'event_ack':
          console.log('[WebSocket] Event acknowledged:', message.eventId)
          this.emit('event_ack', message)
          break

        case 'error':
          console.error('[WebSocket] Server error:', message.code, message.message)
          this.emit('server_error', message)
          break

        default:
          console.warn('[WebSocket] Unknown message type:', message.type)
      }

    } catch (error) {
      console.error('[WebSocket] Failed to parse message:', error)
    }
  }

  /**
   * 이벤트 전송
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

      // WebSocket 메시지 포맷 (BACKEND_WEBSOCKET_SPEC.md 참조)
      const message = {
        eventType: event.eventType,
        timestamp: new Date().toISOString(),
        sessionId: event.sessionId,
        attemptId: this.attemptId,
        data: event.data
      }

      // 연결되지 않은 경우 큐에 저장
      if (!this.isConnected) {
        console.warn('[WebSocket] Not connected, queueing event:', event.eventType)
        this.pendingEvents.push({ message, resolve, reject })
        return
      }

      // 이벤트 전송
      try {
        this.ws.send(JSON.stringify(message))
        console.log('[WebSocket] Event sent:', event.eventType, message)
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

    console.log(`[WebSocket] Flushing ${this.pendingEvents.length} pending events`)

    const events = [...this.pendingEvents]
    this.pendingEvents = []

    events.forEach(({ message, resolve, reject }) => {
      try {
        this.ws.send(JSON.stringify(message))
        console.log('[WebSocket] Pending event sent:', message.eventType)
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
   * @param {string} eventName - 이벤트 이름 (open, close, error, connection_ack, event_ack, server_error)
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
    if (this.ws) {
      console.log('[WebSocket] Disconnecting...')
      this.isConnected = false
      this.ws.close()
      this.ws = null
    }
  }

  /**
   * 연결 상태 확인
   *
   * @returns {boolean}
   */
  getConnectionState() {
    return this.isConnected
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
