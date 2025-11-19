import { useEffect, useState } from 'react'

/**
 * 단어카드 상세 모달 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 열림 상태
 * @param {Function} props.onClose - 모달 닫기 핸들러
 * @param {string} props.icon - 아이콘 이미지 경로
 * @param {string} props.title - 용어 제목
 * @param {string} props.description - 용어 설명
 * @param {number} props.countdown - 카운트다운 숫자 (null이면 표시 안 함)
 */
export const VocabularyDetailModal = ({ isOpen, onClose, icon, title, description, countdown }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsAnimating(false)
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        zIndex: 1000,
        padding: '20px',
        opacity: isAnimating ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '390px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          transform: isAnimating ? 'scale(1)' : 'scale(0.9)',
          opacity: isAnimating ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '32px 24px'
        }}
      >
        {/* 아이콘 */}
        <div style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#F7F7F8',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          boxShadow: '0px 1px 3.7px 0px inset rgba(0, 0, 0, 0.25)'
        }}>
          <img
            src={icon}
            alt={title}
            style={{
              width: '168px',
              height: '168px',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* 제목 */}
        <h2 style={{
          fontFamily: 'Pretendard',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '1.35',
          color: '#1A1C20',
          margin: 0,
          textAlign: 'center'
        }}>
          {title}
        </h2>

        {/* 설명 */}
        <p style={{
          fontFamily: 'Pretendard',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1.5',
          color: '#474C57',
          margin: 0,
          textAlign: 'left'
        }}>
          {description}
        </p>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#3490FF',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontFamily: 'Pretendard',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '1.5',
            color: '#FFFFFF',
            textAlign: 'center'
          }}
        >
          닫기
        </button>
      </div>

      {/* 카운트다운 표시 (모달 외부 하단) */}
      {countdown !== null && countdown > 0 && (
        <p style={{
          fontFamily: 'Pretendard',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '1.5',
          color: '#FFFFFF',
          margin: 0,
          textAlign: 'center',
          opacity: isAnimating ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}>
          미션 완료까지 {countdown}초...
        </p>
      )}
    </div>
  )
}
