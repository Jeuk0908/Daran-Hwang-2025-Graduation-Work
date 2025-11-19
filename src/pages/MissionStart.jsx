import { useNavigate } from 'react-router-dom'
import { TopNav } from '../components/common/TopNav'
import { Button } from '../components/common/Button'
import centerImage from '../assets/images/image 133.svg'

function MissionStart() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/mission-selection', { replace: true })
  }

  const handleStart = () => {
    navigate('/home', { replace: true })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
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
        >
          바로 시작
        </Button>
      </div>
    </div>
  )
}

export default MissionStart
