import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getActiveMission } from '../../utils/missionStorage'
import cancelIcon from '../../assets/icon_cancel(S).svg'

// 미션 ID에 따른 미션 이름 매핑
const MISSION_NAMES = {
  portfolio: '포트폴리오 제작 미션 중',
  vocabulary: '단어카드 열람 미션 중'
}

export function QuitButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()
  const buttonRef = useRef(null)
  const activeMission = getActiveMission()
  const missionName = activeMission ? MISSION_NAMES[activeMission] : ''

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
    <>
      {/* 미션 이름 텍스트 - 하단에 표시 */}
      {missionName && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          backgroundColor: 'rgba(26, 28, 32, 0.7)',
          borderRadius: '4px',
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '1.35',
            color: '#FFFFFF',
            whiteSpace: 'nowrap'
          }}>
            {missionName}
          </span>
        </div>
      )}

      {/* X 버튼 / 포기하기 버튼 - 상단에 표시 */}
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
        <div style={{
          position: 'relative',
          width: isExpanded ? '60px' : '28px',
          height: '28px',
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
              width: '16px',
              height: '16px',
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
    </>
  )
}
