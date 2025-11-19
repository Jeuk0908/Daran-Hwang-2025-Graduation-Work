import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

/**
 * 세션 ID 관리 훅
 *
 * 브라우저 탭 단위로 고유한 세션 ID를 생성하고 관리합니다.
 * sessionStorage를 사용하여 페이지 새로고침 시에도 세션을 유지합니다.
 * 탭을 닫으면 세션이 종료됩니다.
 *
 * @returns {string} sessionId - UUID v4 형식의 세션 ID
 */
export function useSession() {
  const [sessionId] = useState(() => {
    // sessionStorage에서 기존 세션 ID 확인
    const existingSession = sessionStorage.getItem('sessionId')

    if (existingSession) {
      console.log('[Session] Existing session found:', existingSession)
      return existingSession
    }

    // 새로운 세션 ID 생성 (UUID v4)
    const newSessionId = uuidv4()
    sessionStorage.setItem('sessionId', newSessionId)
    console.log('[Session] New session created:', newSessionId)

    return newSessionId
  })

  // 세션 ID 변경 감지 (디버깅 용도)
  useEffect(() => {
    console.log('[Session] Active session ID:', sessionId)

    // 탭 닫기 시 세션 종료 (optional)
    const handleBeforeUnload = () => {
      console.log('[Session] Session will be cleared on tab close')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [sessionId])

  return sessionId
}

/**
 * 세션 ID 가져오기 (훅 외부에서 사용)
 *
 * @returns {string} sessionId - 현재 세션 ID
 */
export function getSessionId() {
  const existingSession = sessionStorage.getItem('sessionId')

  if (existingSession) {
    return existingSession
  }

  // 세션이 없으면 새로 생성
  const newSessionId = uuidv4()
  sessionStorage.setItem('sessionId', newSessionId)

  return newSessionId
}

/**
 * 세션 초기화 (테스트 용도)
 */
export function clearSession() {
  sessionStorage.removeItem('sessionId')
  console.log('[Session] Session cleared')
}
