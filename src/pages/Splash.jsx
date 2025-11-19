import { useState, useEffect } from 'react'
import splashImage from '../assets/images/스플래시.svg'

function Splash({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // 스플래시 페이지에서 상태바 색상을 파란색으로 변경
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    const metaStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#3490FF')
    }
    if (metaStatusBar) {
      metaStatusBar.setAttribute('content', 'black-translucent')
    }

    return () => {
      // 페이지 떠날 때 원래 색상으로 복원
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#FFFFFF')
      }
      if (metaStatusBar) {
        metaStatusBar.setAttribute('content', 'default')
      }
    }
  }, [])

  // 뒤로가기/앞으로가기 방지
  useEffect(() => {
    // 히스토리에 더미 상태 추가
    window.history.pushState(null, '', window.location.href)

    const preventNavigation = (e) => {
      // 뒤로가기 시도 시 다시 앞으로 이동
      window.history.pushState(null, '', window.location.href)
    }

    window.addEventListener('popstate', preventNavigation)

    return () => {
      window.removeEventListener('popstate', preventNavigation)
    }
  }, [])

  const handleTap = () => {
    // 즉시 콜백 호출하여 네비게이션 시작
    if (onComplete) {
      onComplete()
    }

    // 슬라이드 애니메이션 시작
    setIsVisible(false)
  }

  return (
    <div
      onClick={handleTap}
      onTouchStart={handleTap}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#3490FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      <img
        src={splashImage}
        alt="스플래시"
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '430px',
          objectFit: 'cover'
        }}
      />
    </div>
  )
}

export default Splash
