import { useEffect, useRef, useCallback } from 'react'

/**
 * 사용자 비활동 감지 타이머 Hook
 *
 * 지정된 시간 동안 사용자 인터랙션이 없으면 콜백을 실행합니다.
 * 미션 진행 중 자동 포기 기능에 사용됩니다.
 *
 * **중요**: 터치, 클릭, 스크롤 이벤트가 감지되면 경고 전후 관계없이 타이머가 리셋됩니다.
 *
 * @param {Object} options - 옵션
 * @param {boolean} options.isActive - 타이머 활성화 여부
 * @param {Function} options.onWarning - 경고 시점 콜백 (1분 30초)
 * @param {Function} options.onTimeout - 타임아웃 콜백 (2분)
 * @param {number} options.warningTime - 경고 시점 (밀리초, 기본 105000ms = 1분 45초)
 * @param {number} options.timeoutDuration - 타임아웃 시간 (밀리초, 기본 120000ms = 2분)
 *
 * @example
 * useInactivityTimer({
 *   isActive: activeMission !== null,
 *   onWarning: () => setShowWarning(true),
 *   onTimeout: () => handleAutoQuit(),
 *   warningTime: 90000,   // 1분 30초
 *   timeoutDuration: 120000  // 2분
 * })
 */
export function useInactivityTimer({
  isActive,
  onWarning,
  onTimeout,
  warningTime = 105000, // 1분 45초
  timeoutDuration = 120000 // 2분
}) {
  const warningTimerRef = useRef(null)
  const timeoutTimerRef = useRef(null)
  const hasWarned = useRef(false)

  // 콜백을 ref로 저장 (의존성 안정화)
  const onWarningRef = useRef(onWarning)
  const onTimeoutRef = useRef(onTimeout)

  useEffect(() => {
    onWarningRef.current = onWarning
    onTimeoutRef.current = onTimeout
  }, [onWarning, onTimeout])

  // 타이머 클리어 함수
  const clearTimers = useCallback(() => {
    console.log('[InactivityTimer] 🧹 Clearing timers:', {
      warningTimer: warningTimerRef.current,
      timeoutTimer: timeoutTimerRef.current
    })

    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current)
      warningTimerRef.current = null
    }
    if (timeoutTimerRef.current) {
      clearTimeout(timeoutTimerRef.current)
      timeoutTimerRef.current = null
    }
    hasWarned.current = false
  }, [])

  // 타이머 시작 함수
  const startTimers = useCallback(() => {
    clearTimers()

    console.log('[InactivityTimer] 🔄 Starting new timers:', {
      warningTime: `${warningTime / 1000}s`,
      timeoutDuration: `${timeoutDuration / 1000}s`,
      timestamp: new Date().toISOString()
    })

    // 경고 타이머 (1분 30초)
    warningTimerRef.current = setTimeout(() => {
      if (!hasWarned.current) {
        console.log('[InactivityTimer] ⚠️ Warning triggered at', new Date().toISOString())
        hasWarned.current = true
        onWarningRef.current?.()
      }
    }, warningTime)

    // 타임아웃 타이머 (2분)
    timeoutTimerRef.current = setTimeout(() => {
      console.log('[InactivityTimer] 🔴 Timeout triggered at', new Date().toISOString())
      console.log('[InactivityTimer] Calling onTimeout callback...')
      try {
        onTimeoutRef.current?.()
        console.log('[InactivityTimer] ✓ onTimeout callback completed')
      } catch (error) {
        console.error('[InactivityTimer] ❌ onTimeout callback failed:', error)
      }
    }, timeoutDuration)

    console.log('[InactivityTimer] Timer IDs set:', {
      warningTimer: warningTimerRef.current,
      timeoutTimer: timeoutTimerRef.current
    })
  }, [clearTimers, warningTime, timeoutDuration])

  // 사용자 인터랙션 핸들러 (타이머 리셋)
  const handleUserActivity = useCallback(() => {
    if (isActive) {
      console.log('[InactivityTimer] 🔄 User activity detected, resetting timers')
      startTimers()
    }
  }, [isActive, startTimers])

  // 이벤트 리스너 설정
  useEffect(() => {
    console.log('[InactivityTimer] Effect triggered, isActive:', isActive)

    if (!isActive) {
      console.log('[InactivityTimer] Timer is NOT active, clearing timers')
      clearTimers()
      return
    }

    console.log('[InactivityTimer] ✅ Timer is ACTIVE, starting inactivity timer')
    console.log('[InactivityTimer] Warning time:', warningTime, 'ms')
    console.log('[InactivityTimer] Timeout duration:', timeoutDuration, 'ms')

    // 초기 타이머 시작
    startTimers()

    // 감지할 이벤트 목록 (터치, 클릭, 스크롤만)
    const events = ['touchstart', 'click', 'scroll']

    // 이벤트 리스너 등록
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity, { passive: true })
    })

    // 클린업
    return () => {
      console.log('[InactivityTimer] Cleaning up inactivity timer')
      clearTimers()
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity)
      })
    }
  }, [isActive, startTimers, handleUserActivity, clearTimers, warningTime, timeoutDuration])
}
