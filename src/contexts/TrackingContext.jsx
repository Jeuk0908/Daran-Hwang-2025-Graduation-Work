import { createContext, useContext } from 'react'
import { useSession } from '../hooks/useSession'

/**
 * 추적 컨텍스트
 *
 * 전역 추적 상태를 관리합니다.
 * 웹소켓 및 미션 기능이 제거된 단순화된 버전입니다.
 */
const TrackingContext = createContext(null)

/**
 * 추적 프로바이더
 *
 * 앱 전체에서 사용할 세션 ID를 제공합니다.
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

  const value = {
    // 세션 정보
    sessionId,

    // 추적 함수 (빈 구현)
    startTracking: () => Promise.resolve(),
    stopTracking: () => {},
    trackEvent: () => Promise.resolve()
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
 * const { sessionId } = useTrackingContext()
 */
export function useTrackingContext() {
  const context = useContext(TrackingContext)

  if (!context) {
    throw new Error('useTrackingContext must be used within TrackingProvider')
  }

  return context
}
