import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useSession } from '../hooks/useSession'
import { getActiveMission } from '../utils/missionStorage'
import { wsClient } from '../utils/websocket'

/**
 * 추적 컨텍스트
 *
 * 전역 추적 상태를 관리하고 WebSocket 연결, 세션 ID, 미션 정보를 제공합니다.
 */
const TrackingContext = createContext(null)

/**
 * 추적 프로바이더
 *
 * 앱 전체에서 사용할 추적 기능을 제공합니다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 자식 컴포넌트
 *
 * @example
 * <TrackingProvider>
 *   <App />
 * </TrackingProvider>
 */
export function TrackingProvider({ children }) {
  const sessionId = useSession()
  const [activeMission, setActiveMission] = useState(() => getActiveMission())
  const [attemptId, setAttemptId] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState(null)

  // WebSocket 이벤트 리스너 설정
  useEffect(() => {
    const handleOpen = () => {
      console.log('[TrackingContext] WebSocket connected')
      setIsConnected(true)
      setError(null)
    }

    const handleClose = () => {
      console.log('[TrackingContext] WebSocket disconnected')
      setIsConnected(false)
    }

    const handleError = (data) => {
      console.error('[TrackingContext] WebSocket error:', data)
      setError(data.error)
    }

    // 리스너 등록
    wsClient.on('open', handleOpen)
    wsClient.on('close', handleClose)
    wsClient.on('error', handleError)

    // 클린업
    return () => {
      wsClient.off('open', handleOpen)
      wsClient.off('close', handleClose)
      wsClient.off('error', handleError)
    }
  }, [])

  /**
   * 미션 추적 시작
   *
   * 미션 시작 API를 호출하고 WebSocket 연결을 시작합니다.
   *
   * @param {string} missionType - 미션 타입 ('portfolio' | 'vocabulary')
   * @returns {Promise<void>}
   */
  const startTracking = useCallback(async (missionType) => {
    try {
      console.log('[TrackingContext] Starting tracking for mission:', missionType)

      // 1. BE API 호출하여 MissionAttempt 생성 및 attemptId, wsUrl 받기
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/missions/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: sessionId,
          missionType: missionType.toUpperCase(), // 'portfolio' -> 'PORTFOLIO'
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to start mission: ${response.statusText}`)
      }

      const apiResponse = await response.json()
      const data = apiResponse.data || apiResponse // { attemptId, wsUrl, expiresIn }
      console.log('[TrackingContext] Mission attempt created:', data)

      if (!data.attemptId) {
        throw new Error('API response missing attemptId')
      }

      // 2. 받은 attemptId와 wsUrl로 WebSocket 연결
      await wsClient.connect(
        data.wsUrl || import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws',
        data.attemptId,
        sessionId
      )

      // 3. 연결 성공 후 상태 업데이트
      setAttemptId(data.attemptId)
      setActiveMission(missionType)

      console.log('[TrackingContext] Tracking started:', {
        missionType,
        attemptId: data.attemptId,
        sessionId,
        expiresIn: data.expiresIn
      })

    } catch (error) {
      console.error('[TrackingContext] Failed to start tracking:', error)
      throw error
    }
  }, [sessionId])

  /**
   * 미션 추적 중지
   *
   * WebSocket 연결을 종료하고 추적 상태를 초기화합니다.
   */
  const stopTracking = useCallback(() => {
    console.log('[TrackingContext] Stopping tracking...')
    wsClient.disconnect()
    setAttemptId(null)
    setActiveMission(null)
  }, [])

  /**
   * 이벤트 전송 (sessionId 자동 추가)
   *
   * @param {Object} event - 이벤트 데이터
   * @param {string} event.eventType - 이벤트 타입
   * @param {Object} event.data - 이벤트별 데이터
   * @returns {Promise<void>}
   */
  const trackEvent = useCallback(async (event) => {
    // sessionId 자동 추가
    const eventWithSession = {
      ...event,
      sessionId
    }

    await wsClient.sendEvent(eventWithSession)
  }, [sessionId])

  const value = {
    // 세션 정보
    sessionId,

    // 미션 정보
    activeMission,
    attemptId,

    // WebSocket 상태
    isConnected,
    error,

    // 추적 함수
    startTracking,
    stopTracking,
    trackEvent
  }

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  )
}

/**
 * 추적 컨텍스트 사용 훅
 *
 * @returns {Object} 추적 컨텍스트 값
 * @throws {Error} TrackingProvider 외부에서 사용 시 에러 발생
 *
 * @example
 * const { sessionId, isConnected, trackEvent } = useTrackingContext()
 *
 * trackEvent({
 *   eventType: 'page_view',
 *   data: { url: '/home', pageName: 'Home' }
 * })
 */
export function useTrackingContext() {
  const context = useContext(TrackingContext)

  if (!context) {
    throw new Error('useTrackingContext must be used within TrackingProvider')
  }

  return context
}
