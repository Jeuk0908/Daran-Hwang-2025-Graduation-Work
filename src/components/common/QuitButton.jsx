import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import cancelIcon from '../../assets/icon_cancel(S).svg'

export function QuitButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()
  const buttonRef = useRef(null)

  const handleClick = (e) => {
    e.stopPropagation() // 이벤트 전파 중지
    if (!isExpanded) {
      // X 버튼 클릭 시 포기하기 버튼으로 확장
      setIsExpanded(true)
    } else {
      // 포기하기 버튼 클릭 시 미션 포기 페이지로 이동
      navigate('/mission-quit', { replace: true })
    }
  }

  // 버튼 외부 클릭 또는 다른 행동 감지
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setIsExpanded(false)
      }
    }

    const handleScroll = () => {
      setIsExpanded(false)
    }

    if (isExpanded) {
      document.addEventListener('click', handleOutsideClick)
      document.addEventListener('scroll', handleScroll, true)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('scroll', handleScroll, true)
    }
  }, [isExpanded])

  return (
    <div
      ref={buttonRef}
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        cursor: 'pointer'
      }}
    >
      {/* 배경 컨테이너 */}
      <div style={{
        position: 'relative',
        width: isExpanded ? '48px' : '18px',
        height: '18px',
        backgroundColor: '#1A1C20',
        borderRadius: isExpanded ? '4px' : '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}>
        {/* X 아이콘 */}
        <img
          src={cancelIcon}
          alt="닫기"
          style={{
            width: '12px',
            height: '12px',
            filter: 'brightness(0) invert(1)',
            opacity: isExpanded ? 0 : 1,
            transform: isExpanded ? 'scale(0)' : 'scale(1)',
            transition: 'all 0.2s ease'
          }}
        />

        {/* 포기하기 텍스트 */}
        <span style={{
          fontFamily: 'Pretendard',
          fontWeight: 600,
          fontSize: '10px',
          lineHeight: '1.35',
          color: '#FFFFFF',
          whiteSpace: 'nowrap',
          position: 'absolute',
          opacity: isExpanded ? 1 : 0,
          transform: isExpanded ? 'scale(1)' : 'scale(0)',
          transition: 'all 0.2s ease 0.1s' // 0.1초 지연
        }}>
          포기하기
        </span>
      </div>
    </div>
  )
}
