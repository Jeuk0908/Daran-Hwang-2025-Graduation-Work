import { createContext, useContext, useState, useCallback } from 'react'
import { useSession } from '../hooks/useSession'
import { useWebSocket } from '../hooks/useWebSocket'
import { getActiveMission } from '../utils/missionStorage'

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
  const [wsConfig, setWsConfig] = useState(null)

  // WebSocket 연결 (설정이 있을 때만)
  const {
    isConnected,
    connect,
    disconnect,
    sendEvent,
    pendingEvents,
    connectionInfo,
    error
  } = useWebSocket({
    wsUrl: wsConfig?.wsUrl,
    attemptId: wsConfig?.attemptId,
    wsToken: wsConfig?.wsToken,
    autoConnect: false // 수동으로 연결 관리
  })

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

      // TODO: API 호출하여 attemptId, wsUrl, wsToken 받기
      // 현재는 임시로 하드코딩
      const mockApiResponse = {
        attemptId: `attempt_${Date.now()}`,
        wsUrl: 'ws://localhost:3001/ws', // 개발 환경용
        wsToken: 'mock-jwt-token',
        expiresIn: 600
      }

      setAttemptId(mockApiResponse.attemptId)
      setWsConfig({
        wsUrl: mockApiResponse.wsUrl,
        attemptId: mockApiResponse.attemptId,
        wsToken: mockApiResponse.wsToken
      })
      setActiveMission(missionType)

      // WebSocket 연결
      await connect()

      console.log('[TrackingContext] Tracking started:', {
        missionType,
        attemptId: mockApiResponse.attemptId,
        sessionId
      })

    } catch (error) {
      console.error('[TrackingContext] Failed to start tracking:', error)
      throw error
    }
  }, [sessionId, connect])

  /**
   * 미션 추적 중지
   *
   * WebSocket 연결을 종료하고 추적 상태를 초기화합니다.
   */
  const stopTracking = useCallback(() => {
    console.log('[TrackingContext] Stopping tracking...')
    disconnect()
    setAttemptId(null)
    setWsConfig(null)
    setActiveMission(null)
  }, [disconnect])

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

    await sendEvent(eventWithSession)
  }, [sessionId, sendEvent])

  const value = {
    // 세션 정보
    sessionId,

    // 미션 정보
    activeMission,
    attemptId,

    // WebSocket 상태
    isConnected,
    pendingEvents,
    connectionInfo,
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
