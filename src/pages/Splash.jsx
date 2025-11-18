import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import splashImage from '../assets/images/스플래시.svg'

function Splash() {
  const [isVisible, setIsVisible] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // 이미 스플래시를 본 경우 바로 홈으로 이동 (세션당 1회만 표시)
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    if (hasSeenSplash) {
      navigate('/home', { replace: true })
      return
    }

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
  }, [navigate])

  const handleTap = () => {
    setIsVisible(false)

    // 스플래시를 본 것으로 표시
    sessionStorage.setItem('hasSeenSplash', 'true')

    // 애니메이션 완료 후 홈으로 이동
    setTimeout(() => {
      navigate('/home', { replace: true })
    }, 500) // 0.5초 애니메이션 시간과 동일
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
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
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
