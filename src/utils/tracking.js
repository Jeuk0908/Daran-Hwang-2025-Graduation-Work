/**
 * 이벤트 추적 유틸리티
 *
 * EVENT_TRACKING.md 기반의 이벤트 데이터 생성 함수를 제공합니다.
 */

/**
 * 미션 시작 이벤트 생성
 *
 * @param {string} missionType - 미션 타입 ('PORTFOLIO' | 'VOCABULARY')
 * @param {string} missionName - 미션 이름 (한글)
 * @param {string} userAgent - 사용자 에이전트 (선택)
 * @returns {Object} 이벤트 데이터
 */
export function createMissionStartedEvent(missionType, missionName, userAgent = navigator.userAgent) {
  return {
    eventType: 'mission_started',
    data: {
      missionType,
      missionName,
      userAgent
    }
  }
}

/**
 * 페이지 뷰 이벤트 생성
 *
 * @param {string} page - 페이지 경로
 * @param {number} duration - 현재 페이지 체류 시간 (밀리초, 선택)
 * @param {number} scrollDepth - 스크롤 깊이 0-100% (선택)
 * @param {string} referrer - 이전 페이지 (선택)
 * @returns {Object} 이벤트 데이터
 */
export function createPageViewEvent(page, duration = null, scrollDepth = null, referrer = null) {
  const data = { page }
  if (duration !== null) data.duration = duration
  if (scrollDepth !== null) data.scrollDepth = scrollDepth
  if (referrer !== null) data.referrer = referrer

  return {
    eventType: 'page_view',
    data
  }
}

/**
 * 포트폴리오 생성 단계 이벤트 생성
 *
 * @param {number} step - 단계 번호 (1-5)
 * @param {string} stepName - 단계 이름
 * @param {string} selectedValue - 선택한 값
 * @param {string} selectedLabel - 선택한 값의 라벨
 * @param {number} timeOnStep - 단계 체류 시간 (초)
 * @returns {Object} 이벤트 데이터
 */
export function createPortfolioCreationStepEvent(step, stepName, selectedValue, selectedLabel, timeOnStep) {
  return {
    eventType: 'portfolio_creation_step',
    data: {
      step,
      stepName,
      selectedValue,
      selectedLabel,
      timeOnStep
    }
  }
}

/**
 * 포트폴리오 생성 완료 이벤트 생성
 *
 * @param {string} portfolioId - 포트폴리오 ID
 * @param {string} portfolioName - 포트폴리오 이름
 * @param {string} creationMethod - 생성 방법 ('auto' | 'manual')
 * @returns {Object} 이벤트 데이터
 */
export function createPortfolioCreatedEvent(portfolioId, portfolioName, creationMethod) {
  return {
    eventType: 'portfolio_created',
    data: {
      portfolioId,
      portfolioName,
      creationMethod,
      createdAt: new Date().toISOString()
    }
  }
}

/**
 * 단어카드 클릭 이벤트 생성
 *
 * @param {string} cardId - 카드 ID
 * @param {string} term - 용어
 * @param {boolean} isLocked - 잠금 상태
 * @returns {Object} 이벤트 데이터
 */
export function createVocabularyCardClickedEvent(cardId, term, isLocked) {
  return {
    eventType: 'vocabulary_card_clicked',
    data: {
      cardId,
      term,
      isLocked
    }
  }
}

/**
 * 단어 상세 열람 이벤트 생성
 *
 * @param {string} term - 용어
 * @param {string} definition - 정의
 * @param {string} openedVia - 열람 경로 ('vocabulary_card' | 'search_result' | 'etf_detail')
 * @returns {Object} 이벤트 데이터
 */
export function createVocabularyDetailViewedEvent(term, definition, openedVia) {
  return {
    eventType: 'vocabulary_detail_viewed',
    data: {
      term,
      definition,
      openedVia,
      viewedAt: new Date().toISOString()
    }
  }
}

/**
 * 카운트다운 틱 이벤트 생성
 *
 * @param {number} remainingSeconds - 남은 초 (3, 2, 1)
 * @returns {Object} 이벤트 데이터
 */
export function createVocabularyCountdownTickEvent(remainingSeconds) {
  return {
    eventType: 'vocabulary_countdown_tick',
    data: {
      remainingSeconds
    }
  }
}

/**
 * 카운트다운 완료 이벤트 생성
 *
 * @returns {Object} 이벤트 데이터
 */
export function createVocabularyCountdownCompleteEvent() {
  return {
    eventType: 'vocabulary_countdown_complete',
    data: {
      completedAt: new Date().toISOString()
    }
  }
}

/**
 * 미션 완료 모달 표시 이벤트 생성
 *
 * @param {string} missionId - 미션 ID
 * @param {string} missionName - 미션 이름
 * @returns {Object} 이벤트 데이터
 */
export function createMissionCompleteModalShownEvent(missionId, missionName) {
  return {
    eventType: 'mission_complete_modal_shown',
    data: {
      missionId,
      missionName,
      shownAt: new Date().toISOString()
    }
  }
}

/**
 * 미션 평가 제출 이벤트 생성
 *
 * @param {number} rating - 평점 (1-5)
 * @param {string} ratingText - 평점 텍스트
 * @param {string} feedback - 피드백
 * @param {boolean} hasFeedback - 피드백 제공 여부
 * @returns {Object} 이벤트 데이터
 */
export function createMissionRatingSubmittedEvent(rating, ratingText, feedback, hasFeedback) {
  return {
    eventType: 'mission_rating_submitted',
    data: {
      rating,
      ratingText,
      feedback,
      hasFeedback,
      submittedAt: new Date().toISOString()
    }
  }
}

/**
 * 미션 완료 이벤트 생성
 *
 * @param {number} rating - 평점 1-5 (선택)
 * @param {string} feedback - 피드백 (선택)
 * @returns {Object} 이벤트 데이터
 */
export function createMissionCompletedEvent(rating = null, feedback = null) {
  const data = {}
  if (rating !== null) data.rating = rating
  if (feedback !== null) data.feedback = feedback

  return {
    eventType: 'mission_completed',
    data
  }
}

/**
 * 미션 포기 이벤트 생성
 *
 * @param {string} reason - 포기 사유 (선택)
 * @param {number} durationBeforeQuit - 포기 전 소요 시간 밀리초 (선택)
 * @returns {Object} 이벤트 데이터
 */
export function createMissionQuittedEvent(reason = null, durationBeforeQuit = null) {
  const data = {}
  if (reason !== null) data.reason = reason
  if (durationBeforeQuit !== null) data.durationBeforeQuit = durationBeforeQuit

  return {
    eventType: 'mission_quitted',
    data
  }
}

// ============================================
// 일반 사용자 인터랙션 이벤트 (isMissionRelevant: false)
// ============================================

/**
 * 버튼 클릭 이벤트 생성
 *
 * @param {string} buttonText - 버튼 텍스트
 * @param {string} variant - 버튼 변형 ('primary' | 'grey' | 'skeleton' | etc.)
 * @param {string} page - 페이지 경로
 * @returns {Object} 이벤트 데이터
 */
export function createButtonClickedEvent(buttonText, variant, page) {
  return {
    eventType: 'button_clicked',
    data: {
      buttonText,
      variant,
      page,
      clickedAt: new Date().toISOString()
    }
  }
}

/**
 * 네비게이션 클릭 이벤트 생성
 *
 * @param {string} navType - 네비게이션 타입 ('bottom' | 'top' | 'back' | 'tab')
 * @param {string} from - 출발 페이지
 * @param {string} to - 도착 페이지
 * @param {string} tabName - 탭 이름 (탭 네비게이션인 경우)
 * @returns {Object} 이벤트 데이터
 */
export function createNavigationClickedEvent(navType, from, to, tabName = null) {
  return {
    eventType: 'navigation_clicked',
    data: {
      navType,
      from,
      to,
      tabName,
      clickedAt: new Date().toISOString()
    }
  }
}

/**
 * 입력 필드 인터랙션 이벤트 생성
 *
 * @param {string} inputId - 입력 필드 ID
 * @param {string} action - 액션 ('focus' | 'blur' | 'input')
 * @param {number} inputLength - 입력 길이
 * @param {string} page - 페이지 경로
 * @returns {Object} 이벤트 데이터
 */
export function createInputInteractionEvent(inputId, action, inputLength, page) {
  return {
    eventType: 'input_interaction',
    data: {
      inputId,
      action,
      inputLength,
      page,
      timestamp: new Date().toISOString()
    }
  }
}

/**
 * 카드 클릭 이벤트 생성
 *
 * @param {string} cardType - 카드 타입 ('portfolio' | 'etf' | 'theme' | 'news' | etc.)
 * @param {string} cardId - 카드 ID
 * @param {string} cardTitle - 카드 제목
 * @param {string} page - 페이지 경로
 * @returns {Object} 이벤트 데이터
 */
export function createCardClickedEvent(cardType, cardId, cardTitle, page) {
  return {
    eventType: 'card_clicked',
    data: {
      cardType,
      cardId,
      cardTitle,
      page,
      clickedAt: new Date().toISOString()
    }
  }
}

/**
 * 모달 인터랙션 이벤트 생성
 *
 * @param {string} modalType - 모달 타입
 * @param {string} action - 액션 ('opened' | 'closed')
 * @param {string} modalId - 모달 ID
 * @param {string} page - 페이지 경로
 * @returns {Object} 이벤트 데이터
 */
export function createModalInteractionEvent(modalType, action, modalId, page) {
  return {
    eventType: 'modal_interaction',
    data: {
      modalType,
      action,
      modalId,
      page,
      timestamp: new Date().toISOString()
    }
  }
}

/**
 * 검색 수행 이벤트 생성
 *
 * @param {string} searchQuery - 검색어
 * @param {number} queryLength - 검색어 길이
 * @param {number} resultCount - 결과 개수
 * @param {string} page - 페이지 경로
 * @returns {Object} 이벤트 데이터
 */
export function createSearchPerformedEvent(searchQuery, queryLength, resultCount, page) {
  return {
    eventType: 'search_performed',
    data: {
      searchQuery,
      queryLength,
      resultCount,
      page,
      searchedAt: new Date().toISOString()
    }
  }
}

/**
 * 북마크 토글 이벤트 생성
 *
 * @param {string} itemType - 아이템 타입 ('portfolio' | 'etf')
 * @param {string} itemId - 아이템 ID
 * @param {string} action - 액션 ('added' | 'removed')
 * @param {string} page - 페이지 경로
 * @returns {Object} 이벤트 데이터
 */
export function createBookmarkToggledEvent(itemType, itemId, action, page) {
  return {
    eventType: 'bookmark_toggled',
    data: {
      itemType,
      itemId,
      action,
      page,
      timestamp: new Date().toISOString()
    }
  }
}

/**
 * 콘텐츠 조회 이벤트 생성
 *
 * @param {string} contentType - 콘텐츠 타입 ('portfolio_detail' | 'etf_detail' | 'theme_detail' | 'rebalance')
 * @param {string} contentId - 콘텐츠 ID
 * @param {string} contentTitle - 콘텐츠 제목
 * @param {string} page - 페이지 경로
 * @returns {Object} 이벤트 데이터
 */
export function createContentViewedEvent(contentType, contentId, contentTitle, page) {
  return {
    eventType: 'content_viewed',
    data: {
      contentType,
      contentId,
      contentTitle,
      page,
      viewedAt: new Date().toISOString()
    }
  }
}

/**
 * 섹션 조회 이벤트 생성 (탭 전환 등)
 *
 * @param {string} sectionType - 섹션 타입 ('returns' | 'info' | 'composition' | 'dividend')
 * @param {string} parentContentType - 부모 콘텐츠 타입 ('portfolio_detail' | 'etf_detail')
 * @param {string} parentContentId - 부모 콘텐츠 ID
 * @param {string} page - 페이지 경로
 * @returns {Object} 이벤트 데이터
 */
export function createSectionViewedEvent(sectionType, parentContentType, parentContentId, page) {
  return {
    eventType: 'section_viewed',
    data: {
      sectionType,
      parentContentType,
      parentContentId,
      page,
      viewedAt: new Date().toISOString()
    }
  }
}
