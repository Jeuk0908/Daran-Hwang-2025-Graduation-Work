// 미션 관리 유틸리티
const ACTIVE_MISSION_KEY = 'activeMission'

/**
 * 활성 미션 저장
 * @param {string} missionId - 'portfolio' 또는 'vocabulary'
 */
export const setActiveMission = (missionId) => {
  localStorage.setItem(ACTIVE_MISSION_KEY, missionId)
}

/**
 * 현재 활성 미션 조회
 * @returns {string|null} 미션 ID 또는 null
 */
export const getActiveMission = () => {
  return localStorage.getItem(ACTIVE_MISSION_KEY)
}

/**
 * 미션 완료 후 상태 초기화
 */
export const clearActiveMission = () => {
  localStorage.removeItem(ACTIVE_MISSION_KEY)
}

/**
 * 활성 미션이 특정 미션인지 확인
 * @param {string} missionId - 확인할 미션 ID
 * @returns {boolean}
 */
export const isActiveMission = (missionId) => {
  return getActiveMission() === missionId
}
