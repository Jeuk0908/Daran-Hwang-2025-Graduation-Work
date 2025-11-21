import { useEffect, useState } from 'react'

/**
 * 비활동 경고 컴포넌트
 *
 * 사용자가 일정 시간 동안 비활동 상태일 때 전체화면 오버레이로 경고를 표시합니다.
 * 사용자의 어떤 행동(클릭, 터치, 스크롤)이 감지되면 경고가 사라집니다.
 *
 * @param {Object} props
 * @param {Function} props.onDismiss - 경고 닫기 콜백 (선택적)
 *
 * @example
 * {showWarning && <InactivityWarning onDismiss={() => setShowWarning(false)} />}
 */
export function InactivityWarning({ onDismiss }) {
  const [countdown, setCountdown] = useState(30)

  // 컴포넌트 마운트/언마운트 추적
  useEffect(() => {
    console.log('[InactivityWarning] 🎭 Component MOUNTED')
    return () => {
      console.log('[InactivityWarning] 🎭 Component UNMOUNTED')
    }
  }, [])

  // 카운트다운 타이머
  useEffect(() => {
    console.log('[InactivityWarning] ▶️ Warning displayed, starting 30 second countdown')
    setCountdown(30)

    const interval = setInterval(() => {
      setCountdown((prev) => {
        const newCount = prev - 1
        console.log(`[InactivityWarning] Time remaining: ${newCount} seconds`)

        if (newCount <= 0) {
          console.log('[InactivityWarning] Countdown complete, auto-quit will trigger')
          clearInterval(interval)
        }

        return newCount
      })
    }, 1000)

    return () => {
      console.log('[InactivityWarning] Cleaning up countdown timer')
      clearInterval(interval)
    }
  }, [])

  // 사용자 행동 감지
  useEffect(() => {
    console.log('[InactivityWarning] ✅ Setting up activity listeners')

    // 사용자 행동 감지 핸들러
    const handleUserAction = (event) => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('[InactivityWarning] 👆 User activity detected:', event.type)
      console.log('[InactivityWarning] Calling onDismiss to hide warning...')
      if (onDismiss) {
        onDismiss()
        console.log('[InactivityWarning] ✅ onDismiss called successfully')
      } else {
        console.warn('[InactivityWarning] ⚠️ onDismiss is not defined!')
      }
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    }

    // 사용자 인터랙션 이벤트 리스너 등록 (터치, 클릭, 스크롤만)
    const events = ['touchstart', 'click', 'scroll']
    events.forEach(event => {
      document.addEventListener(event, handleUserAction, { once: true })
    })

    // 클린업
    return () => {
      console.log('[InactivityWarning] 🧹 Cleaning up activity listeners')
      events.forEach(event => {
        document.removeEventListener(event, handleUserAction)
      })
    }
  }, [onDismiss])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      zIndex: 10000,
      animation: 'fadeIn 0.3s ease-out',
      textAlign: 'center'
    }}>
      <div style={{
        fontFamily: 'Pretendard',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '1.5',
        color: '#FFFFFF'
      }}>
        움직임이 없어요!
      </div>
      <div style={{
        fontFamily: 'Pretendard',
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '1.5',
        color: '#FFFFFF'
      }}>
        {countdown}초 뒤 초기화면으로<br />돌아갑니다.
      </div>

      {/* 하단 안내 텍스트 */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily: 'Pretendard',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '1.5',
        color: '#FFFFFF'
      }}>
        화면을 터치해 계속하기
      </div>

      {/* 애니메이션 CSS */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
