/**
 * 추적 API 서비스
 *
 * 백엔드 REST API와 통신하여 미션 관련 데이터를 처리합니다.
 * BACKEND_WEBSOCKET_SPEC.md의 API 엔드포인트 스펙을 따릅니다.
 */

// TODO: 환경 변수로 관리 (.env 파일에 정의)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

/**
 * API 요청 헬퍼
 *
 * @param {string} endpoint - API 엔드포인트
 * @param {Object} options - fetch 옵션
 * @returns {Promise<Object>} 응답 데이터
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  }

  const response = await fetch(url, { ...defaultOptions, ...options })

  // HTTP 에러 처리
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: {
        code: 'UNKNOWN_ERROR',
        message: `HTTP ${response.status}: ${response.statusText}`
      }
    }))

    throw new Error(error.error?.message || `API request failed: ${response.statusText}`)
  }

  return response.json()
}

/**
 * 미션 시작 API 호출
 *
 * @param {string} sessionId - 세션 ID (UUID v4)
 * @param {string} missionType - 미션 타입 ('portfolio' | 'vocabulary')
 * @returns {Promise<Object>} { attemptId, wsUrl, wsToken, expiresIn }
 *
 * @example
 * const result = await startMission(sessionId, 'portfolio')
 * // { attemptId: 'attempt_1234567890', wsUrl: 'wss://...', wsToken: '...', expiresIn: 600 }
 */
export async function startMission(sessionId, missionType) {
  console.log('[TrackingService] Starting mission:', { sessionId, missionType })

  const response = await apiRequest('/missions/start', {
    method: 'POST',
    body: JSON.stringify({
      sessionId,
      missionType,
      timestamp: new Date().toISOString()
    })
  })

  if (!response.success) {
    throw new Error('Failed to start mission: ' + (response.error?.message || 'Unknown error'))
  }

  console.log('[TrackingService] Mission started:', response.data)
  return response.data
}

/**
 * 미션 시도 정보 조회
 *
 * @param {string} attemptId - 미션 시도 ID
 * @returns {Promise<Object>} 미션 시도 정보
 */
export async function getMissionAttempt(attemptId) {
  console.log('[TrackingService] Getting mission attempt:', attemptId)

  const response = await apiRequest(`/missions/${attemptId}`, {
    method: 'GET'
  })

  if (!response.success) {
    throw new Error('Failed to get mission attempt: ' + (response.error?.message || 'Unknown error'))
  }

  return response.data
}

/**
 * 미션 시도 목록 조회
 *
 * @param {Object} params - 쿼리 파라미터
 * @param {string} params.missionType - 미션 타입 ('portfolio' | 'vocabulary' | 'all')
 * @param {string} params.status - 상태 ('pending' | 'in_progress' | 'completed' | 'quitted' | 'all')
 * @param {string} params.sortBy - 정렬 기준 ('startTime' | 'duration' | 'rating')
 * @param {string} params.order - 정렬 순서 ('asc' | 'desc')
 * @param {number} params.limit - 개수 제한
 * @param {number} params.offset - 오프셋
 * @returns {Promise<Object>} { attempts, pagination }
 */
export async function listMissionAttempts(params = {}) {
  const {
    missionType = 'all',
    status = 'all',
    sortBy = 'startTime',
    order = 'desc',
    limit = 20,
    offset = 0
  } = params

  const queryString = new URLSearchParams({
    missionType,
    status,
    sortBy,
    order,
    limit: limit.toString(),
    offset: offset.toString()
  }).toString()

  console.log('[TrackingService] Listing mission attempts:', queryString)

  const response = await apiRequest(`/missions?${queryString}`, {
    method: 'GET'
  })

  if (!response.success) {
    throw new Error('Failed to list mission attempts: ' + (response.error?.message || 'Unknown error'))
  }

  return response.data
}

/**
 * 미션 평가 제출
 *
 * @param {string} attemptId - 미션 시도 ID
 * @param {Object} review - 평가 데이터
 * @param {number} review.rating - 평점 (1-5)
 * @param {string} review.ratingText - 평점 텍스트
 * @param {string} review.feedback - 피드백 (선택)
 * @param {boolean} review.hasFeedback - 피드백 제공 여부
 * @returns {Promise<Object>} { reviewId, attemptId, rating, submittedAt }
 *
 * @example
 * const result = await submitMissionReview('attempt_123', {
 *   rating: 4,
 *   ratingText: '쉬움',
 *   feedback: '좋았어요',
 *   hasFeedback: true
 * })
 */
export async function submitMissionReview(attemptId, review) {
  console.log('[TrackingService] Submitting review:', { attemptId, review })

  const response = await apiRequest(`/missions/${attemptId}/review`, {
    method: 'POST',
    body: JSON.stringify(review)
  })

  if (!response.success) {
    throw new Error('Failed to submit review: ' + (response.error?.message || 'Unknown error'))
  }

  console.log('[TrackingService] Review submitted:', response.data)
  return response.data
}

/**
 * 미션 평가 조회
 *
 * @param {string} attemptId - 미션 시도 ID
 * @returns {Promise<Object>} 평가 데이터
 */
export async function getMissionReview(attemptId) {
  console.log('[TrackingService] Getting review:', attemptId)

  const response = await apiRequest(`/missions/${attemptId}/review`, {
    method: 'GET'
  })

  if (!response.success) {
    throw new Error('Failed to get review: ' + (response.error?.message || 'Unknown error'))
  }

  return response.data
}

/**
 * 미션 이벤트 목록 조회
 *
 * @param {string} attemptId - 미션 시도 ID
 * @param {string} eventType - 이벤트 타입 필터 (선택)
 * @returns {Promise<Object>} { attemptId, eventCount, events }
 */
export async function getMissionEvents(attemptId, eventType = null) {
  const queryString = eventType ? `?type=${eventType}` : ''
  console.log('[TrackingService] Getting events:', attemptId, eventType)

  const response = await apiRequest(`/missions/${attemptId}/events${queryString}`, {
    method: 'GET'
  })

  if (!response.success) {
    throw new Error('Failed to get events: ' + (response.error?.message || 'Unknown error'))
  }

  return response.data
}

/**
 * 미션 분석 데이터 조회
 *
 * @param {string} missionType - 미션 타입 ('portfolio' | 'vocabulary' | 'all')
 * @param {string} startDate - 시작 날짜 (ISO 8601)
 * @param {string} endDate - 종료 날짜 (ISO 8601)
 * @returns {Promise<Object>} 분석 데이터
 */
export async function getMissionAnalytics(missionType = 'all', startDate = null, endDate = null) {
  const params = {}
  if (startDate) params.startDate = startDate
  if (endDate) params.endDate = endDate

  const queryString = new URLSearchParams(params).toString()
  console.log('[TrackingService] Getting analytics:', missionType, queryString)

  const response = await apiRequest(`/analytics/missions/${missionType}?${queryString}`, {
    method: 'GET'
  })

  if (!response.success) {
    throw new Error('Failed to get analytics: ' + (response.error?.message || 'Unknown error'))
  }

  return response.data
}

/**
 * 경로 분석 데이터 조회 (Vocabulary 미션 전용)
 *
 * @returns {Promise<Object>} 경로별 통계
 */
export async function getVocabularyPathAnalytics() {
  console.log('[TrackingService] Getting vocabulary path analytics')

  const response = await apiRequest('/analytics/vocabulary/paths', {
    method: 'GET'
  })

  if (!response.success) {
    throw new Error('Failed to get path analytics: ' + (response.error?.message || 'Unknown error'))
  }

  return response.data
}

/**
 * 실시간 통계 조회
 *
 * @returns {Promise<Object>} 실시간 통계 데이터
 */
export async function getRealtimeStats() {
  console.log('[TrackingService] Getting realtime stats')

  const response = await apiRequest('/analytics/realtime', {
    method: 'GET'
  })

  if (!response.success) {
    throw new Error('Failed to get realtime stats: ' + (response.error?.message || 'Unknown error'))
  }

  return response.data
}

/**
 * 데이터 내보내기
 *
 * @param {Object} params - 내보내기 파라미터
 * @param {string} params.format - 포맷 ('json' | 'csv')
 * @param {string} params.missionType - 미션 타입
 * @param {string} params.startDate - 시작 날짜
 * @param {string} params.endDate - 종료 날짜
 * @returns {Promise<Blob>} 파일 데이터
 */
export async function exportData(params = {}) {
  const {
    format = 'json',
    missionType = 'all',
    startDate = null,
    endDate = null
  } = params

  const queryParams = { format, missionType }
  if (startDate) queryParams.startDate = startDate
  if (endDate) queryParams.endDate = endDate

  const queryString = new URLSearchParams(queryParams).toString()
  console.log('[TrackingService] Exporting data:', queryString)

  const response = await fetch(`${API_BASE_URL}/admin/export?${queryString}`)

  if (!response.ok) {
    throw new Error(`Export failed: ${response.statusText}`)
  }

  return response.blob()
}
