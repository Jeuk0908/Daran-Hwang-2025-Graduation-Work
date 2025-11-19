import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { clearActiveMission } from '../utils/missionStorage'

function MissionComplete() {
  const navigate = useNavigate()

  const handleComplete = () => {
    // 미션 상태 초기화
    clearActiveMission()
    // 스플래시 페이지로 이동 (resetSplash 플래그와 함께)
    navigate('/', { replace: true, state: { resetSplash: true } })
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
        padding: '12px 16px',
        marginTop: 'auto'
      }}>
        <Button
          variant="primary"
          onClick={handleComplete}
        >
          미션 완료
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

export default MissionComplete
