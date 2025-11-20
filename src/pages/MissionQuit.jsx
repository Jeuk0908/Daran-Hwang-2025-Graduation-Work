import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { useTracking } from '../hooks/useTracking'
import { getActiveMission, clearActiveMission } from '../utils/missionStorage'

function MissionQuit() {
  const navigate = useNavigate()
  const location = useLocation()
  const tracking = useTracking()
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleComplete = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const missionId = getActiveMission()
      if (!missionId) {
        console.warn('[MissionQuit] No active mission found')
        navigate('/mission-complete', { replace: true })
        return
      }

      const missionNames = {
        portfolio: '포트폴리오 제작 미션',
        vocabulary: '단어카드 열람 미션'
      }

      const missionName = missionNames[missionId] || missionId
      const reason = feedback.trim() || null // 포기 사유 (선택)

      // 포기 전 소요 시간 계산 (임시: null로 설정)
      // TODO: 실제 미션 시작 시간을 추적하여 정확한 duration 계산 (밀리초 단위)
      const durationBeforeQuit = null

      console.log('[MissionQuit] Tracking mission quit:', {
        missionId,
        missionName,
        reason,
        durationBeforeQuit
      })

      // 미션 포기 이벤트를 백그라운드에서 전송 (await 제거)
      // 이벤트 전송 성공 여부와 관계없이 다음 페이지로 이동
      tracking.trackMissionQuitted(reason, durationBeforeQuit).catch(error => {
        console.error('[MissionQuit] Failed to track mission quit (background):', error)
      })

      // 피드백을 localStorage에도 저장 (백업)
      if (reason) {
        const existingFeedback = JSON.parse(localStorage.getItem('missionFeedback') || '[]')
        existingFeedback.push({
          reason: reason,
          timestamp: new Date().toISOString(),
          missionId,
          missionName
        })
        localStorage.setItem('missionFeedback', JSON.stringify(existingFeedback))
      }

      // 1초 로딩 효과 (이벤트 전송 시간 확보)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // WebSocket 연결 종료
      tracking.stopTracking()

      // 미션 상태 초기화
      clearActiveMission()

      console.log('[MissionQuit] Navigating to mission complete')

      // 미션 완료 페이지로 이동
      navigate('/mission-complete', { replace: true })

    } catch (error) {
      console.error('[MissionQuit] Failed to complete quit process:', error)
      // 에러가 발생해도 1초 후 미션 종료 프로세스 진행
      setTimeout(() => {
        tracking.stopTracking()
        clearActiveMission()
        navigate('/mission-complete', { replace: true })
      }, 1000)
    } finally {
      setIsSubmitting(false)
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
          disabled={isSubmitting}
        >
          {isSubmitting ? '제출 중...' : '완료하기'}
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
