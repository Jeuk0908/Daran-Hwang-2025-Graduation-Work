import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useTrackingContext } from '../../contexts/TrackingContext'

/**
 * 자동 추적 컴포넌트
 *
 * 모든 사용자 인터랙션을 자동으로 추적합니다:
 * - 페이지 이동 (page_view)
 * - 클릭 이벤트 (button_clicked, navigation_clicked, card_clicked)
 * - 입력 필드 인터랙션 (input_interaction)
 *
 * @example
 * <AutoTracker />
 */
export function AutoTracker() {
  const location = useLocation()
  const { trackEvent, sessionId, isConnected } = useTrackingContext()
  const pageEnterTime = useRef(Date.now())
  const previousPath = useRef(location.pathname)
  const inputTimers = useRef(new Map())

  // ==========================================
  // 페이지 이동 자동 추적
  // ==========================================
  useEffect(() => {
    const currentTime = Date.now()
    const duration = currentTime - pageEnterTime.current

    // 페이지 뷰 이벤트
    const event = {
      eventType: 'page_view',
      data: {
        page: location.pathname,
        duration,
        scrollDepth: null, // TODO: 향후 스크롤 깊이 추적 구현
        referrer: previousPath.current
      }
    }

    // WebSocket 연결되어 있을 때만 전송
    if (isConnected) {
      trackEvent(event).catch((error) => {
        console.error('[AutoTracker] Failed to track page view:', error)
      })
    }

    // 현재 시간 및 경로 저장
    pageEnterTime.current = currentTime
    previousPath.current = location.pathname

  }, [location.pathname, trackEvent, isConnected])

  // ==========================================
  // 클릭 이벤트 자동 추적
  // ==========================================
  useEffect(() => {
    const handleClick = (e) => {
      if (!isConnected) return

      const target = e.target
      const element = target.closest('button, a, [role="button"], [data-track]')

      if (!element) return

      // 이벤트 정보 추출
      const elementType = getElementType(element)
      const elementText = getElementText(element)
      const elementId = element.id || element.dataset.trackId || ''

      let event = null

      // 요소 타입에 따라 적절한 이벤트 생성
      switch (elementType) {
        case 'navigation':
          event = {
            eventType: 'navigation_clicked',
            data: {
              navType: element.closest('nav')?.dataset.navType || 'unknown',
              from: location.pathname,
              to: element.getAttribute('href') || element.dataset.to || '',
              tabName: elementText
            }
          }
          break

        case 'card':
          event = {
            eventType: 'card_clicked',
            data: {
              cardType: element.dataset.cardType || 'unknown',
              cardId: elementId,
              cardTitle: elementText,
              currentPage: location.pathname
            }
          }
          break

        case 'button':
        default:
          event = {
            eventType: 'button_clicked',
            data: {
              buttonText: elementText,
              variant: element.dataset.variant || getButtonVariant(element),
              currentPage: location.pathname
            }
          }
          break
      }

      if (event) {
        trackEvent(event).catch((error) => {
          console.error('[AutoTracker] Failed to track click:', error)
        })
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [location.pathname, trackEvent, isConnected])

  // ==========================================
  // 입력 필드 인터랙션 자동 추적
  // ==========================================
  useEffect(() => {
    const handleFocus = (e) => {
      if (!isConnected) return

      const target = e.target
      if (!['INPUT', 'TEXTAREA'].includes(target.tagName)) return

      const inputId = target.id || target.name || target.placeholder || 'unknown'

      const event = {
        eventType: 'input_interaction',
        data: {
          inputId,
          action: 'focus',
          inputLength: target.value?.length || 0,
          currentPage: location.pathname
        }
      }

      trackEvent(event).catch((error) => {
        console.error('[AutoTracker] Failed to track input focus:', error)
      })
    }

    const handleBlur = (e) => {
      if (!isConnected) return

      const target = e.target
      if (!['INPUT', 'TEXTAREA'].includes(target.tagName)) return

      const inputId = target.id || target.name || target.placeholder || 'unknown'

      const event = {
        eventType: 'input_interaction',
        data: {
          inputId,
          action: 'blur',
          inputLength: target.value?.length || 0,
          currentPage: location.pathname
        }
      }

      trackEvent(event).catch((error) => {
        console.error('[AutoTracker] Failed to track input blur:', error)
      })
    }

    const handleChange = (e) => {
      if (!isConnected) return

      const target = e.target
      if (!['INPUT', 'TEXTAREA'].includes(target.tagName)) return

      const inputId = target.id || target.name || target.placeholder || 'unknown'

      // 디바운스: 500ms 후에 전송
      if (inputTimers.current.has(inputId)) {
        clearTimeout(inputTimers.current.get(inputId))
      }

      const timer = setTimeout(() => {
        const event = {
          eventType: 'input_interaction',
          data: {
            inputId,
            action: 'change',
            inputLength: target.value?.length || 0,
            currentPage: location.pathname
          }
        }

        trackEvent(event).catch((error) => {
          console.error('[AutoTracker] Failed to track input change:', error)
        })

        inputTimers.current.delete(inputId)
      }, 500)

      inputTimers.current.set(inputId, timer)
    }

    document.addEventListener('focus', handleFocus, true)
    document.addEventListener('blur', handleBlur, true)
    document.addEventListener('input', handleChange, true)

    return () => {
      document.removeEventListener('focus', handleFocus, true)
      document.removeEventListener('blur', handleBlur, true)
      document.removeEventListener('input', handleChange, true)

      // 클린업: 모든 타이머 제거
      inputTimers.current.forEach((timer) => clearTimeout(timer))
      inputTimers.current.clear()
    }
  }, [location.pathname, trackEvent, isConnected])

  return null // UI 없음
}

/**
 * 요소 타입 판단
 */
function getElementType(element) {
  // 네비게이션 링크
  if (element.closest('nav') || element.closest('[data-nav]')) {
    return 'navigation'
  }

  // 카드
  if (
    element.closest('[data-card]') ||
    element.classList.contains('card') ||
    element.closest('.card')
  ) {
    return 'card'
  }

  // 기본값: 버튼
  return 'button'
}

/**
 * 요소 텍스트 추출
 */
function getElementText(element) {
  // aria-label 우선
  if (element.getAttribute('aria-label')) {
    return element.getAttribute('aria-label')
  }

  // data-track-text
  if (element.dataset.trackText) {
    return element.dataset.trackText
  }

  // textContent (최대 50자)
  const text = element.textContent?.trim() || ''
  return text.length > 50 ? text.substring(0, 50) + '...' : text
}

/**
 * 버튼 variant 추출
 */
function getButtonVariant(element) {
  // data-variant 속성
  if (element.dataset.variant) {
    return element.dataset.variant
  }

  // 클래스 이름에서 추출
  const classes = element.className || ''
  if (classes.includes('primary')) return 'primary'
  if (classes.includes('secondary')) return 'secondary'
  if (classes.includes('grey')) return 'grey'
  if (classes.includes('skeleton')) return 'skeleton'

  return 'default'
}

/**
 * 페이지 이름 추출
 */
function getPageName(pathname) {
  const pathMap = {
    '/': 'Splash',
    '/onboarding': 'Onboarding',
    '/mission-selection': 'Mission Selection',
    '/mission-start': 'Mission Start',
    '/mission-quit': 'Mission Quit',
    '/mission-complete': 'Mission Complete',
    '/mission-rating': 'Mission Rating',
    '/home': 'Home',
    '/portfolio': 'Portfolio List',
    '/search': 'Search',
    '/mypage': 'My Page',
    '/vocabulary': 'Vocabulary',
    '/bookmark': 'Bookmark',
    '/interest-etf': 'Interest ETF',
    '/theme': 'Theme',
    '/portfolio/create': 'Portfolio Create Entry',
    '/portfolio/create/method': 'Portfolio Method Selection',
    '/portfolio/create/auto': 'Portfolio Auto Create',
    '/portfolio/create/step1': 'Portfolio Manual Step 1',
    '/portfolio/create/step2': 'Portfolio Manual Step 2',
    '/portfolio/create/step3': 'Portfolio Manual Step 3',
    '/portfolio/create/step4': 'Portfolio Manual Step 4'
  }

  // 동적 경로 처리
  if (pathname.includes('/portfolio/') && pathname.includes('/detail')) {
    return 'Portfolio Detail'
  }
  if (pathname.includes('/portfolio/') && pathname.includes('/rebalance')) {
    return 'Portfolio Rebalance'
  }
  if (pathname.includes('/etf/') && pathname.includes('/detail')) {
    return 'ETF Detail'
  }

  return pathMap[pathname] || pathname
}

/**
 * 미션 페이지 여부 확인
 */
function isMissionPage(pathname) {
  const missionPages = [
    '/mission-selection',
    '/mission-start',
    '/mission-quit',
    '/mission-complete',
    '/mission-rating',
    '/portfolio/create',
    '/vocabulary'
  ]

  return missionPages.some((path) => pathname.startsWith(path))
}
