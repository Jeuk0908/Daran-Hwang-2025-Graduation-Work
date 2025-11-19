import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { Button } from '../components/common/Button'
import { useTracking } from '../hooks/useTracking'
import { getActiveMission, clearActiveMission } from '../utils/missionStorage'

function MissionComplete() {
  const navigate = useNavigate()
  const tracking = useTracking()
  const [isCompleting, setIsCompleting] = useState(false)
  const missionStartTime = useRef(null)

  // 컴포넌트 마운트 시 미션 완료 이벤트 전송
  useEffect(() => {
    const sendCompletionEvent = async () => {
      try {
        const missionId = getActiveMission()
        if (!missionId) {
          console.warn('[MissionComplete] No active mission found')
          return
        }

        const missionNames = {
          portfolio: '포트폴리오 제작 미션',
          vocabulary: '단어카드 열람 미션'
        }

        const missionName = missionNames[missionId] || missionId

        // 총 소요 시간 계산 (임시: 페이지 마운트 시간 기준)
        // TODO: 실제 미션 시작 시간을 추적하여 정확한 duration 계산
        const totalDuration = 0 // 실제 구현 시 정확한 시간 계산 필요

        console.log('[MissionComplete] Tracking mission completion:', { missionId, missionName, totalDuration })

        // 미션 완료 모달 표시 이벤트
        await tracking.trackMissionCompleteModalShown(missionId, missionName)

        // 미션 완료 이벤트
        await tracking.trackMissionCompleted(missionId, missionName, totalDuration)

        console.log('[MissionComplete] Mission completion tracked successfully')

      } catch (error) {
        console.error('[MissionComplete] Failed to track mission completion:', error)
      }
    }

    sendCompletionEvent()
  }, [tracking])

  const handleComplete = async () => {
    if (isCompleting) return

    setIsCompleting(true)

    try {
      console.log('[MissionComplete] Stopping tracking and cleaning up...')

      // WebSocket 연결 종료
      tracking.stopTracking()

      // 미션 상태 초기화
      clearActiveMission()

      // 스플래시 페이지로 이동
      navigate('/', { replace: true, state: { resetSplash: true } })

    } catch (error) {
      console.error('[MissionComplete] Error during completion:', error)
      // 에러가 발생해도 미션 종료 프로세스 진행
      clearActiveMission()
      navigate('/', { replace: true, state: { resetSplash: true } })
    } finally {
      setIsCompleting(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#ffffff'
    }}>
      {/* 중앙 메시지 */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px'
      }}>
        <h1 style={{
          fontFamily: 'Pretendard',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '1.5',
          color: '#000000',
          textAlign: 'center',
          margin: 0,
          whiteSpace: 'pre-line'
        }}>
          {'참여 감사합니다.\n개선을 통해 더 발전하겠습니다.'}
        </h1>
      </div>

      {/* 하단 버튼 영역 */}
      <div style={{
        padding: '12px 16px 34px',
        marginTop: 'auto'
      }}>
        <Button
          variant="primary"
          onClick={handleComplete}
          disabled={isCompleting}
        >
          {isCompleting ? '완료 중...' : '미션 완료'}
        </Button>
      </div>
    </div>
  )
}

export default MissionComplete
