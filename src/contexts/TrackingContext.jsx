import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSession } from '../hooks/useSession'
import { getActiveMission } from '../utils/missionStorage'
import { wsClient } from '../utils/websocket'

/**
 * 포트폴리오 미션에만 적용되는 공통 페이지
 */
const PORTFOLIO_COMMON_PAGES = [
  '/mission-selection',
  '/mission-start',
  '/mission-rating',
  '/mission-complete',
  '/mission-quit'
]

/**
 * 현재 페이지가 활성 미션과 관련 있는지 확인
 *
 * @param {string} pathname - 현재 페이지 경로
 * @param {string} missionType - 미션 타입 ('portfolio' | 'vocabulary')
 * @returns {boolean} 미션과 관련 있으면 true
 */
function isPageMissionRelevant(pathname, missionType) {
  if (!missionType) return false

  // 포트폴리오 미션: /portfolio 목록과 생성 플로우만 허용
  if (missionType === 'portfolio') {
    // 포트폴리오 미션 공통 페이지 확인
    if (PORTFOLIO_COMMON_PAGES.some(page => pathname.startsWith(page))) {
      return true
    }

    // 정확히 /portfolio 경로 (목록 페이지)
    if (pathname === '/portfolio') return true
    // /portfolio/create로 시작하는 생성 플로우 (자동/직접 제작)
    if (pathname.startsWith('/portfolio/create')) return true
    // 그 외 포트폴리오 관련 페이지 (상세, 리밸런싱 등)는 false
    return false
  }

  // 단어카드 미션: 특정 페이지만 허용
  if (missionType === 'vocabulary') {
    // /mission-complete만 공통 페이지로 허용
    if (pathname.startsWith('/mission-complete')) return true

    // 단어카드 미션 전용 페이지
    if (pathname === '/vocabulary') return true
    if (pathname === '/search') return true
    if (pathname === '/mypage') return true
    if (pathname.startsWith('/etf/')) return true  // ETF 상세 (동적 라우트)

    // 그 외 페이지는 모두 false
    return false
  }

  return false
}

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
  const location = useLocation()
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
      console.log('[TrackingContext] Environment variables:', {
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_WS_URL: import.meta.env.VITE_WS_URL,
        VITE_ENABLE_WS: import.meta.env.VITE_ENABLE_WS,
        DEV: import.meta.env.DEV,
        MODE: import.meta.env.MODE
      })

      // 1. BE API 호출하여 MissionAttempt 생성 및 attemptId, wsUrl 받기
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
      console.log('[TrackingContext] API URL:', apiUrl)
      const response = await fetch(`${apiUrl}/api/missions/start`, {
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
      const wsUrl = data.wsUrl || import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws'
      console.log('[TrackingContext] WebSocket URL:', wsUrl, {
        fromAPI: data.wsUrl,
        fromEnv: import.meta.env.VITE_WS_URL,
        fallback: 'ws://localhost:8080/ws'
      })
      await wsClient.connect(
        wsUrl,
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
   * 이벤트 전송 (sessionId, isMissionRelevant 자동 추가)
   *
   * @param {Object} event - 이벤트 데이터
   * @param {string} event.eventType - 이벤트 타입
   * @param {Object} event.data - 이벤트별 데이터
   * @returns {Promise<void>}
   */
  const trackEvent = useCallback(async (event) => {
    // isMissionRelevant 판단: 미션 진행 중 + 현재 페이지가 미션과 관련 있는지 확인
    const isMissionRelevant = activeMission
      ? isPageMissionRelevant(location.pathname, activeMission)
      : false

    // sessionId와 isMissionRelevant 자동 추가
    const eventWithMetadata = {
      ...event,
      sessionId,
      data: {
        ...event.data,
        isMissionRelevant
      }
    }

    await wsClient.sendEvent(eventWithMetadata)
  }, [sessionId, activeMission, location.pathname])

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
