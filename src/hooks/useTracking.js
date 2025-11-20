import { useCallback, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTrackingContext } from '../contexts/TrackingContext'
import * as trackingUtils from '../utils/tracking'

/**
 * 통합 추적 훅
 *
 * 편리한 이벤트 추적 인터페이스를 제공합니다.
 * TrackingContext와 tracking utilities를 결합하여 사용하기 쉬운 API를 제공합니다.
 *
 * @param {Object} options - 옵션
 * @param {boolean} options.trackPageViews - 페이지 뷰 자동 추적 (기본값: false)
 * @param {boolean} options.isMissionPage - 미션 페이지 여부 (기본값: false)
 *
 * @returns {Object} 추적 함수 및 상태
 *
 * @example
 * const tracking = useTracking({ trackPageViews: true, isMissionPage: true })
 *
 * // 페이지 뷰 추적 (자동)
 *
 * // 버튼 클릭 추적
 * tracking.trackButtonClick('다음', 'primary')
 *
 * // 포트폴리오 생성 단계 추적
 * tracking.trackPortfolioStep(1, 'risk_type_selection', 'neutral', '중립형', 10.5)
 */
export function useTracking({ trackPageViews = false, isMissionPage = false } = {}) {
  const context = useTrackingContext()
  const location = useLocation()
  const pageEnterTime = useRef(Date.now())
  const previousPath = useRef(location.pathname)

  // 페이지 뷰 자동 추적
  useEffect(() => {
    if (!trackPageViews) return

    const currentTime = Date.now()
    const duration = currentTime - pageEnterTime.current

    // 페이지 뷰 이벤트 전송
    const event = trackingUtils.createPageViewEvent(
      location.pathname,
      duration,
      null, // scrollDepth - 향후 구현
      previousPath.current
    )

    context.trackEvent(event).catch((error) => {
      console.error('[useTracking] Failed to track page view:', error)
    })

    // 현재 시간 및 경로 저장
    pageEnterTime.current = currentTime
    previousPath.current = location.pathname

  }, [location.pathname, trackPageViews, context])

  // ==========================================
  // 미션 관련 이벤트 추적 함수
  // ==========================================

  /**
   * 미션 시작 추적
   */
  const trackMissionStarted = useCallback((missionType, missionName, userAgent = navigator.userAgent) => {
    const event = trackingUtils.createMissionStartedEvent(missionType, missionName, userAgent)
    return context.trackEvent(event)
  }, [context])

  /**
   * 포트폴리오 생성 단계 추적
   */
  const trackPortfolioStep = useCallback((step, stepName, selectedValue, selectedLabel, timeOnStep) => {
    const event = trackingUtils.createPortfolioCreationStepEvent(
      step,
      stepName,
      selectedValue,
      selectedLabel,
      timeOnStep
    )
    return context.trackEvent(event)
  }, [context])

  /**
   * 포트폴리오 생성 완료 추적
   */
  const trackPortfolioCreated = useCallback((portfolioId, portfolioName, creationMethod) => {
    const event = trackingUtils.createPortfolioCreatedEvent(portfolioId, portfolioName, creationMethod)
    return context.trackEvent(event)
  }, [context])

  /**
   * 단어카드 클릭 추적
   */
  const trackVocabularyCardClick = useCallback((cardId, term, isLocked) => {
    const event = trackingUtils.createVocabularyCardClickedEvent(cardId, term, isLocked)
    return context.trackEvent(event)
  }, [context])

  /**
   * 단어 상세 열람 추적
   */
  const trackVocabularyDetailView = useCallback((term, definition, openedVia) => {
    const event = trackingUtils.createVocabularyDetailViewedEvent(term, definition, openedVia)
    return context.trackEvent(event)
  }, [context])

  /**
   * 카운트다운 틱 추적
   */
  const trackCountdownTick = useCallback((remainingSeconds) => {
    const event = trackingUtils.createVocabularyCountdownTickEvent(remainingSeconds)
    return context.trackEvent(event)
  }, [context])

  /**
   * 카운트다운 완료 추적
   */
  const trackCountdownComplete = useCallback(() => {
    const event = trackingUtils.createVocabularyCountdownCompleteEvent()
    return context.trackEvent(event)
  }, [context])

  /**
   * 미션 완료 모달 표시 추적
   */
  const trackMissionCompleteModalShown = useCallback((missionId, missionName) => {
    const event = trackingUtils.createMissionCompleteModalShownEvent(missionId, missionName)
    return context.trackEvent(event)
  }, [context])

  /**
   * 미션 평가 제출 추적
   */
  const trackMissionRatingSubmitted = useCallback((rating, ratingText, feedback, hasFeedback) => {
    const event = trackingUtils.createMissionRatingSubmittedEvent(rating, ratingText, feedback, hasFeedback)
    return context.trackEvent(event)
  }, [context])

  /**
   * 미션 완료 추적
   */
  const trackMissionCompleted = useCallback((rating = null, feedback = null) => {
    const event = trackingUtils.createMissionCompletedEvent(rating, feedback)
    return context.trackEvent(event)
  }, [context])

  /**
   * 미션 포기 추적
   */
  const trackMissionQuitted = useCallback((reason = null, durationBeforeQuit = null) => {
    const event = trackingUtils.createMissionQuittedEvent(reason, durationBeforeQuit)
    return context.trackEvent(event)
  }, [context])

  // ==========================================
  // 일반 사용자 인터랙션 이벤트 추적 함수
  // ==========================================

  /**
   * 버튼 클릭 추적
   */
  const trackButtonClick = useCallback((buttonText, variant = 'primary') => {
    const event = trackingUtils.createButtonClickedEvent(buttonText, variant, location.pathname)
    return context.trackEvent(event)
  }, [context, location.pathname])

  /**
   * 네비게이션 클릭 추적
   */
  const trackNavigationClick = useCallback((navType, to, tabName = null) => {
    const event = trackingUtils.createNavigationClickedEvent(navType, location.pathname, to, tabName)
    return context.trackEvent(event)
  }, [context, location.pathname])

  /**
   * 입력 필드 인터랙션 추적
   */
  const trackInputInteraction = useCallback((inputId, action, inputLength) => {
    const event = trackingUtils.createInputInteractionEvent(inputId, action, inputLength, location.pathname)
    return context.trackEvent(event)
  }, [context, location.pathname])

  /**
   * 카드 클릭 추적
   */
  const trackCardClick = useCallback((cardType, cardId, cardTitle) => {
    const event = trackingUtils.createCardClickedEvent(cardType, cardId, cardTitle, location.pathname)
    return context.trackEvent(event)
  }, [context, location.pathname])

  /**
   * 모달 인터랙션 추적
   */
  const trackModalInteraction = useCallback((modalType, action, modalId) => {
    const event = trackingUtils.createModalInteractionEvent(modalType, action, modalId, location.pathname)
    return context.trackEvent(event)
  }, [context, location.pathname])

  /**
   * 검색 수행 추적
   */
  const trackSearch = useCallback((searchQuery, resultCount) => {
    const event = trackingUtils.createSearchPerformedEvent(
      searchQuery,
      searchQuery.length,
      resultCount,
      location.pathname
    )
    return context.trackEvent(event)
  }, [context, location.pathname])

  /**
   * 북마크 토글 추적
   */
  const trackBookmarkToggle = useCallback((itemType, itemId, action) => {
    const event = trackingUtils.createBookmarkToggledEvent(itemType, itemId, action, location.pathname)
    return context.trackEvent(event)
  }, [context, location.pathname])

  /**
   * 콘텐츠 조회 추적
   */
  const trackContentViewed = useCallback((contentType, contentId, contentTitle) => {
    const event = trackingUtils.createContentViewedEvent(contentType, contentId, contentTitle, location.pathname)
    return context.trackEvent(event)
  }, [context, location.pathname])

  /**
   * 섹션 조회 추적 (탭 전환 등)
   */
  const trackSectionViewed = useCallback((sectionType, parentContentType, parentContentId) => {
    const event = trackingUtils.createSectionViewedEvent(sectionType, parentContentType, parentContentId, location.pathname)
    return context.trackEvent(event)
  }, [context, location.pathname])

  return {
    // Context 상태
    sessionId: context.sessionId,
    activeMission: context.activeMission,
    attemptId: context.attemptId,
    isConnected: context.isConnected,
    error: context.error,

    // Context 함수
    startTracking: context.startTracking,
    stopTracking: context.stopTracking,

    // 미션 관련 추적 함수
    trackMissionStarted,
    trackPortfolioStep,
    trackPortfolioCreated,
    trackVocabularyCardClick,
    trackVocabularyDetailView,
    trackCountdownTick,
    trackCountdownComplete,
    trackMissionCompleteModalShown,
    trackMissionRatingSubmitted,
    trackMissionCompleted,
    trackMissionQuitted,

    // 일반 인터랙션 추적 함수
    trackButtonClick,
    trackNavigationClick,
    trackInputInteraction,
    trackCardClick,
    trackModalInteraction,
    trackSearch,
    trackBookmarkToggle,
    trackContentViewed,
    trackSectionViewed,

    // 직접 이벤트 전송 (커스텀 이벤트용)
    trackEvent: context.trackEvent
  }
}

/**
 * 경로에서 페이지 이름 추출
 *
 * @param {string} pathname - 경로
 * @returns {string} 페이지 이름
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
