import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTracking } from '../hooks/useTracking'
import starFilled from '../assets/Star(bule).svg'
import starUnfilled from '../assets/Star(gray).svg'

function MissionRating() {
  const navigate = useNavigate()
  const tracking = useTracking()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStarClick = (value) => {
    setRating(value)
  }

  const handleComplete = async () => {
    if (isSubmitting || rating === 0) return

    setIsSubmitting(true)

    try {
      const ratingText = getRatingText()
      const hasFeedback = feedback.trim().length > 0

      console.log('[MissionRating] Submitting rating:', {
        rating,
        ratingText,
        feedback: feedback.trim(),
        hasFeedback
      })

      // 미션 평가 제출 이벤트를 백그라운드에서 전송 (await 제거)
      // 이벤트 전송 성공 여부와 관계없이 다음 페이지로 이동
      tracking.trackMissionRatingSubmitted(
        rating,
        ratingText,
        feedback.trim() || null,
        hasFeedback
      ).catch(error => {
        console.error('[MissionRating] Failed to submit rating (background):', error)
      })

      // 1초 로딩 효과 (이벤트 전송 시간 확보)
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('[MissionRating] Navigating to mission complete')

      // 미션 완료 페이지로 이동
      navigate('/mission-complete', { replace: true })

    } catch (error) {
      console.error('[MissionRating] Failed to complete rating process:', error)
      // 에러가 발생해도 1초 후 미션 완료 페이지로 이동
      setTimeout(() => {
        navigate('/mission-complete', { replace: true })
      }, 1000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 별점에 따른 설명 텍스트
  const getRatingText = () => {
    switch(rating) {
      case 5: return '아주 쉬움'
      case 4: return '쉬움'
      case 3: return '보통'
      case 2: return '어려움'
      case 1: return '아주 어려움'
      default: return ''
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100dvh', // iOS Safari 호환: Dynamic Viewport Height
      backgroundColor: '#ffffff'
    }}>
      {/* 헤더 섹션 */}
      <div style={{
        padding: '32px 16px',
        paddingTop: '154px'
      }}>
        <h1 style={{
          fontFamily: 'Pretendard',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '1.5',
          color: '#000000',
          margin: 0
        }}>
          난이도는 어땠나요?
        </h1>
      </div>

      {/* 별점 선택 영역 */}
      <div style={{
        marginTop: '18px',
        paddingLeft: rating > 0 ? '11px' : '16px',
        paddingRight: rating > 0 ? '0' : '16px',
        display: 'flex',
        justifyContent: rating > 0 ? 'flex-start' : 'center',
        transition: 'padding 1s cubic-bezier(0.25, 0.8, 0.25, 1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: rating > 0 ? 'flex-start' : 'center',
          gap: rating > 0 ? '15.5px' : '16px',
          alignItems: 'center',
          width: rating > 0 ? '302px' : 'auto',
          height: rating > 0 ? '43px' : '66px',
          transition: 'width 1.1s cubic-bezier(0.25, 0.8, 0.25, 1), height 1.1s cubic-bezier(0.25, 0.8, 0.25, 1), gap 1s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <img
              key={value}
              src={value <= rating ? starFilled : starUnfilled}
              alt={`${value}점`}
              onClick={() => handleStarClick(value)}
              style={{
                width: rating > 0 ? '48px' : '66px',
                height: rating > 0 ? '43px' : '66px',
                cursor: 'pointer',
                transition: 'all 1s cubic-bezier(0.25, 0.8, 0.25, 1)',
                transform: (rating > 0 && value <= rating) ? 'scale(1.1)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                if (rating > 0 && value <= rating) {
                  e.currentTarget.style.transform = 'scale(1.1)'
                } else {
                  e.currentTarget.style.transform = 'scale(1)'
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* 설명 텍스트 */}
      <div style={{
        padding: '0 16px',
        marginTop: '18px'
      }}>
        <p style={{
          fontFamily: 'Pretendard',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1.5',
          color: '#474C57',
          margin: 0,
          whiteSpace: 'pre-line'
        }}>
          {rating > 0
            ? getRatingText()
            : '5점 - 아주 쉬움\n4점 - 쉬움\n3점 - 보통\n2점 - 어려움\n1점 - 아주 어려움'
          }
        </p>
      </div>

      {/* 텍스트 입력 필드 */}
      {rating > 0 && (
        <div style={{
          padding: '24px 16px',
          marginTop: '18px'
        }}>
          <input
            type="text"
            placeholder="(선택) 피드백/후기를 남겨주세요"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#E6E7EA',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'Pretendard',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1.5',
              color: '#5E6573',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
      )}

      {/* 완료하기 버튼 */}
      {rating > 0 && (
        <div style={{
          padding: '12px 16px',
          marginTop: 'auto',
          paddingBottom: '24px'
        }}>
          <button
            onClick={handleComplete}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: isSubmitting ? '#ADB2BD' : '#3490FF',
              border: 'none',
              borderRadius: '12px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontFamily: 'Pretendard',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '1.35',
              color: '#FFFFFF',
              textAlign: 'center'
            }}
          >
            {isSubmitting ? '전송 중...' : '완료하기'}
          </button>
        </div>
      )}
    </div>
  )
}

export default MissionRating
