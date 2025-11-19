import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'

function MissionQuit() {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')

  const handleComplete = () => {
    // 피드백 제출 로직 (현재는 localStorage에 저장)
    if (feedback.trim()) {
      const existingFeedback = JSON.parse(localStorage.getItem('missionFeedback') || '[]')
      existingFeedback.push({
        feedback: feedback.trim(),
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('missionFeedback', JSON.stringify(existingFeedback))
    }

    // 미션 완료 페이지로 이동
    navigate('/mission-complete', { replace: true })
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
        padding: '0 16px',
        paddingTop: '80px'
      }}>
        <h1 style={{
          fontFamily: 'Pretendard',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '1.5',
          color: '#000000',
          margin: 0,
          whiteSpace: 'pre-line'
        }}>
          {'아쉬워요\n어떤 점이 어려웠는지 알려주세요'}
        </h1>
      </div>

      {/* 텍스트 입력 필드 */}
      <div style={{
        padding: '0 16px',
        paddingTop: '111px'
      }}>
        <input
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="(선택) 어떤 점이 어려웠나요?"
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
            color: '#1A1C20',
            boxSizing: 'border-box',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = '#ffffff'
            e.target.style.border = '1px solid #3490FF'
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = '#E6E7EA'
            e.target.style.border = 'none'
          }}
        />
        <style>{`
          input::placeholder {
            color: #5E6573;
          }
        `}</style>
      </div>

      {/* 하단 버튼 영역 */}
      <div style={{
        padding: '12px 16px',
        marginTop: 'auto'
      }}>
        <Button
          variant="primary"
          onClick={handleComplete}
        >
          완료하기
        </Button>
      </div>

      {/* 홈 인디케이터 영역 */}
      <div style={{
        height: '34px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '134px',
          height: '5px',
          backgroundColor: '#000000',
          borderRadius: '100px'
        }} />
      </div>
    </div>
  )
}

export default MissionQuit
