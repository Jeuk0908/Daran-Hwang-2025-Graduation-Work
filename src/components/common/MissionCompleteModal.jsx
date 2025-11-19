import { useEffect, useState } from 'react'

/**
 * 미션 완료 모달 컴포넌트
 * 미션 조건 달성 시 표시되는 축하 모달
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 열림 상태
 * @param {function} props.onClose - 모달 닫기 핸들러
 * @param {function} props.onNext - "다음으로" 버튼 클릭 핸들러
 */
export const MissionCompleteModal = ({ isOpen, onClose, onNext }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 애니메이션 시작
      setIsAnimating(true)
      // body 스크롤 방지
      document.body.style.overflow = 'hidden'
    } else {
      // 모달이 닫힐 때 애니메이션 종료
      setIsAnimating(false)
      // body 스크롤 복원
      document.body.style.overflow = ''
    }

    return () => {
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)', // Safari 지원
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: '20px',
        opacity: isAnimating ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      {/* 모달 컨텐츠 */}
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
          gap: '12px',
          paddingTop: '24px',
          paddingBottom: '12px'
        }}
      >
        {/* 텍스트 영역 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '0 16px'
        }}>
          {/* 제목 */}
          <p style={{
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '1.35',
            color: '#1A1C20',
            margin: 0
          }}>
            미션을 달성했어요!
          </p>

          {/* 설명 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '46px'
          }}>
            <p style={{
              fontFamily: 'Pretendard',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '1.5',
              color: '#474C57',
              margin: 0,
              whiteSpace: 'pre-line'
            }}>
              {'축하해요! 미션을 달성했어요.\n다음으로 넘어가 평점을 작성해 볼까요?'}
            </p>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div style={{
          padding: '12px 16px'
        }}>
          <button
            onClick={onNext}
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
            다음으로
          </button>
        </div>
      </div>
    </div>
  )
}
