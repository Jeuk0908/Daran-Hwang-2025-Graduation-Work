import { useState, useEffect, useCallback, useRef } from 'react'
import { wsClient } from '../utils/websocket'

/**
 * WebSocket 연결 관리 훅
 *
 * WebSocket 연결의 생명주기를 관리하고 이벤트 전송 기능을 제공합니다.
 *
 * @param {Object} config - WebSocket 설정
 * @param {string} config.wsUrl - WebSocket 서버 URL
 * @param {string} config.attemptId - 미션 시도 ID
 * @param {boolean} config.autoConnect - 자동 연결 여부 (기본값: false)
 *
 * @returns {Object} WebSocket 상태 및 함수
 * @returns {boolean} isConnected - 연결 상태
 * @returns {Function} connect - 연결 시작 함수
 * @returns {Function} disconnect - 연결 종료 함수
 * @returns {Function} sendEvent - 이벤트 전송 함수
 * @returns {number} pendingEvents - 대기 중인 이벤트 수
 * @returns {Object} connectionInfo - 연결 정보
 *
 * @example
 * const { isConnected, connect, sendEvent, disconnect } = useWebSocket({
 *   wsUrl: 'wss://your-domain.com/ws',
 *   attemptId: 'attempt_1234567890',
 *   autoConnect: true
 * })
 *
 * // 이벤트 전송
 * sendEvent({
 *   eventType: 'page_view',
 *   sessionId: sessionId,
 *   data: { url: '/home', pageName: 'Home' }
 * })
 */
export function useWebSocket({ wsUrl, attemptId, autoConnect = false } = {}) {
  const [isConnected, setIsConnected] = useState(false)
  const [pendingEvents, setPendingEvents] = useState(0)
  const [connectionInfo, setConnectionInfo] = useState(null)
  const [error, setError] = useState(null)

  const configRef = useRef({ wsUrl, attemptId })

  // 설정 업데이트
  useEffect(() => {
    configRef.current = { wsUrl, attemptId }
  }, [wsUrl, attemptId])

  /**
   * WebSocket 연결
   */
  const connect = useCallback(async () => {
    const { wsUrl, attemptId } = configRef.current

    if (!wsUrl || !attemptId) {
      const error = new Error('Missing WebSocket configuration: wsUrl, attemptId required')
      console.error('[useWebSocket]', error)
      setError(error)
      return
    }

    try {
      console.log('[useWebSocket] Connecting...', { attemptId })
      await wsClient.connect(wsUrl, attemptId)
      setConnectionInfo({
        attemptId,
        connectedAt: new Date().toISOString()
      })
      setError(null)
    } catch (error) {
      console.error('[useWebSocket] Connection failed:', error)
      setError(error)
    }
  }, [])

  /**
   * WebSocket 연결 종료
   */
  const disconnect = useCallback(() => {
    console.log('[useWebSocket] Disconnecting...')
    wsClient.disconnect()
    setConnectionInfo(null)
    setError(null)
  }, [])

  /**
   * 이벤트 전송
   */
  const sendEvent = useCallback(async (event) => {
    try {
      await wsClient.sendEvent(event)
    } catch (error) {
      console.error('[useWebSocket] Failed to send event:', error)
      setError(error)
    }
  }, [])

  // WebSocket 이벤트 리스너 등록
  useEffect(() => {
    // 연결 성공
    const handleOpen = (data) => {
      console.log('[useWebSocket] Connected:', data)
      setIsConnected(true)
    }

    // 연결 종료
    const handleClose = (data) => {
      console.log('[useWebSocket] Disconnected:', data)
      setIsConnected(false)
    }

    // 에러 발생
    const handleError = (data) => {
      console.error('[useWebSocket] Error:', data)
      setError(data.error)
    }

    // 연결 확인 응답
    const handleConnectionAck = (data) => {
      console.log('[useWebSocket] Connection acknowledged:', data)
    }

    // 이벤트 확인 응답
    const handleEventAck = (data) => {
      console.log('[useWebSocket] Event acknowledged:', data)
    }

    // 서버 에러
    const handleServerError = (data) => {
      console.error('[useWebSocket] Server error:', data.code, data.message)
      setError(new Error(`Server error: ${data.code} - ${data.message}`))
    }

    // 리스너 등록
    wsClient.on('open', handleOpen)
    wsClient.on('close', handleClose)
    wsClient.on('error', handleError)
    wsClient.on('connection_ack', handleConnectionAck)
    wsClient.on('event_ack', handleEventAck)
    wsClient.on('server_error', handleServerError)

    // 클린업
    return () => {
      wsClient.off('open', handleOpen)
      wsClient.off('close', handleClose)
      wsClient.off('error', handleError)
      wsClient.off('connection_ack', handleConnectionAck)
      wsClient.off('event_ack', handleEventAck)
      wsClient.off('server_error', handleServerError)
    }
  }, [])

  // 대기 중인 이벤트 수 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setPendingEvents(wsClient.getPendingEventCount())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // 자동 연결
  useEffect(() => {
    if (autoConnect && wsUrl && attemptId) {
      connect()
    }

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      if (autoConnect) {
        disconnect()
      }
    }
  }, [autoConnect, wsUrl, attemptId, connect, disconnect])

  return {
    isConnected,
    connect,
    disconnect,
    sendEvent,
    pendingEvents,
    connectionInfo,
    error
  }
}
