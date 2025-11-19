import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import starFilled from '../assets/Star(bule).svg'
import starUnfilled from '../assets/Star(gray).svg'

function MissionRating() {
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const handleStarClick = (value) => {
    setRating(value)
  }

  const handleComplete = () => {
    // 평점과 피드백을 저장하고 미션 완료 페이지로 이동
    navigate('/mission-complete', { replace: true })
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
      minHeight: '100vh',
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
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#3490FF',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontFamily: 'Pretendard',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '1.35',
              color: '#FFFFFF',
              textAlign: 'center'
            }}
          >
            완료하기
          </button>
        </div>
      )}
    </div>
  )
}

export default MissionRating
