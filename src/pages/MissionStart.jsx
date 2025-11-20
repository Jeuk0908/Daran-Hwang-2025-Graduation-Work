import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { TopNav } from '../components/common/TopNav'
import { Button } from '../components/common/Button'
import { useTracking } from '../hooks/useTracking'
import { getActiveMission } from '../utils/missionStorage'
import centerImage from '../assets/images/Group 171.png'

function MissionStart() {
  const navigate = useNavigate()
  const [isStarting, setIsStarting] = useState(false)
  const tracking = useTracking()

  const handleBack = () => {
    navigate('/mission-selection', { replace: true })
  }

  const handleStart = async () => {
    if (isStarting) return

    setIsStarting(true)

    try {
      // 활성 미션 정보 가져오기
      const missionId = getActiveMission()
      if (!missionId) {
        console.error('[MissionStart] No active mission found')
        navigate('/mission-selection', { replace: true })
        return
      }

      const missionNames = {
        portfolio: '포트폴리오 제작 미션',
        vocabulary: '단어카드 열람 미션'
      }

      const missionName = missionNames[missionId] || missionId

      // missionId를 missionType으로 변환 (소문자 -> 대문자)
      const missionType = missionId.toUpperCase() // 'portfolio' -> 'PORTFOLIO', 'vocabulary' -> 'VOCABULARY'

      console.log('[MissionStart] Starting mission tracking:', { missionId, missionType, missionName })

      // 웹소켓 연결을 백그라운드에서 시작 (await 제거)
      // 연결 성공 여부와 관계없이 다음 페이지로 이동하여 웹소켓 연결 시간 확보
      tracking.startTracking(missionId).catch(error => {
        console.error('[MissionStart] Failed to start tracking (background):', error)
      })

      // 1초 로딩 효과 (웹소켓 연결 시간 확보)
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('[MissionStart] Navigating to home')

      // 홈 화면으로 이동
      navigate('/home', { replace: true })

    } catch (error) {
      console.error('[MissionStart] Failed to start mission:', error)
      // 에러가 발생해도 1초 후 홈으로 이동
      setTimeout(() => {
        navigate('/home', { replace: true })
      }, 1000)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100dvh', // iOS Safari 호환: Dynamic Viewport Height
      height: '100%',
      backgroundColor: '#ffffff'
    }}>
      <TopNav
        depth="1"
        state="icon"
        title=""
        showTitle={false}
        showIconL={false}
        showIconR={false}
      />

      {/* 헤더 섹션 */}
      <div style={{
        padding: '32px 16px 52px',
        paddingTop: '28px'
      }}>
        <h1 style={{
          fontFamily: 'Pretendard',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '1.5',
          color: '#000000',
          marginBottom: '16px'
        }}>
          시작 전 유의 사항
        </h1>
        <p style={{
          fontFamily: 'Pretendard',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1.5',
          color: '#474C57',
          margin: 0
        }}>
          상단의 x버튼을 통해 포기하기가 가능해요
        </p>
      </div>

      {/* 중앙 이미지 영역 */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px'
      }}>
        <img
          src={centerImage}
          alt="미션 시작 안내"
          style={{
            width: '100%',
            maxWidth: '280px',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>

      {/* 하단 버튼 영역 */}
      <div style={{
        padding: '12px 16px 34px',
        marginTop: 'auto'
      }}>
        <Button
          variant="primary"
          onClick={handleStart}
          disabled={isStarting}
        >
          {isStarting ? '시작중...' : '바로 시작'}
        </Button>
      </div>
    </div>
  )
}

export default MissionStart
