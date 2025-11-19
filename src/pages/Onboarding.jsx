import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav } from '../components/common/TopNav'
import { Button } from '../components/common/Button'
import arrowDown from '../assets/icon_back(S)_D.svg'

const questions = [
  {
    id: 1,
    question: '미션의 목적이 무엇인가요?',
    answer: (
      <>
        본 테스트는 <span style={{ fontWeight: 700, color: '#0073FF' }}>익명으로 진행</span>되며, 개인을 식별할 수 있는 정보를 수집하지 않습니다.{'\n'}
        <span style={{ fontWeight: 700, color: '#0073FF' }}>응답해주신 내용은 오직 UX 개선 목적으로만 활용</span>됩니다.
      </>
    )
  },
  {
    id: 2,
    question: '이 앱의 목적/목표는 무엇인가요?',
    answer: (
      <>
        금융 투자가 낯설 20대에게 <span style={{ fontWeight: 700, color: '#0073FF' }}>'가상투자를 통한 학습'</span>과{'\n'}
        <span style={{ fontWeight: 700, color: '#0073FF' }}>'포트폴리오, 리밸런싱을 통한 관리'</span>를 통합한 경험을 통해,{'\n'}
        <span style={{ fontWeight: 700, color: '#020203' }}>스스로 경제 흐름을 읽고 자산을 증식시키는 방법을 분산투자 특징을 지닌 ETF를 통해 체득</span>하도록 돕는 것입니다.
      </>
    )
  },
  {
    id: 3,
    question: 'ETF는 무엇인가요?',
    answer: (
      <>
        <span style={{ fontWeight: 700, color: '#0073FF' }}>여러 주식이나 채권을 바구니에 담아 묶음으로 만든</span> 후{'\n'}
        주식처럼 <span style={{ fontWeight: 700 }}>거래소에 상장</span>시켜 사고팔 수 있도록 만든 상품
        {'\n\n'}
        ETF는 <span style={{ fontWeight: 700, color: '#0073FF' }}>분산 투자의 특징</span>을 가져 회사가 어려워져도 전체{'\n'}
        손해를 줄일 수 있는 특징이 있습니다.
        {'\n\n'}
        <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '1.35' }}>예를 들면?</span>
        {'\n\n'}
        과일 주스를 만들기 위해 <span style={{ fontWeight: 700 }}>하나의 쇼핑 카트</span>(ETF)에{'\n'}
        <span style={{ fontWeight: 700 }}>여러가지 과일들</span>(여러 주식이나 채권)을 담습니다.
      </>
    )
  }
]

function Onboarding() {
  const navigate = useNavigate()
  const [expandedId, setExpandedId] = useState(null)

  const toggleQuestion = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleNext = () => {
    navigate('/mission-selection', { replace: true })
  }

  const handleBack = () => {
    // 뒤로가기 시 스플래시로 돌아가지 않고 앱 종료 또는 첫 화면 유지
    navigate('/', { replace: true })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#ffffff'
    }}>
      <TopNav
        depth="2"
        state="icon"
        title=""
        onBack={handleBack}
      />

      {/* 헤더 섹션 */}
      <div style={{
        padding: '32px 16px 90px',
        paddingTop: '28px'
      }}>
        <h1 style={{
          fontFamily: 'Pretendard',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '1.5',
          color: '#000000',
          marginBottom: '16px',
          whiteSpace: 'pre-line'
        }}>
          {'ETF로 시작하는\n라이프스타일 금융 앱 핀핏'}
        </h1>
        <p style={{
          fontFamily: 'Pretendard',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1.5',
          color: '#474C57',
          margin: 0,
          whiteSpace: 'pre-line'
        }}>
          {'앱에 대한 사용자 경험 개선을 위해 미션을 진행하고자\n합니다.'}
        </p>
      </div>

      {/* 질문 카드 섹션 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
        flex: 1,
        padding: '0 16px'
      }}>
        {questions.map((item, index) => (
          <div
            key={item.id}
            style={{
              paddingTop: index === 0 ? '0' : '0',
              paddingBottom: '16px',
              width: '100%'
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                width: '100%',
                boxSizing: 'border-box',
                boxShadow: '1px 2px 13.6px 0px rgba(0,0,0,0.1)',
                paddingBottom: expandedId === item.id ? '24px' : '0'
              }}
            >
              {/* 질문 헤더 */}
              <div
                onClick={() => toggleQuestion(item.id)}
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <p style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '1.5',
                  color: '#30343B',
                  margin: 0,
                  flex: 1,
                  paddingRight: '8px'
                }}>
                  {item.question}
                </p>
                <img
                  src={arrowDown}
                  alt="toggle"
                  style={{
                    width: '24px',
                    height: '24px',
                    opacity: 0.5,
                    transform: expandedId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>

              {/* 확장된 답변 */}
              {expandedId === item.id && (
                <div
                  style={{
                    borderTop: '1px solid #F7F7F8',
                    paddingTop: '12px',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                  }}
                >
                  <div
                    style={{
                      borderBottom: '1px solid #F7F7F8',
                      paddingTop: '16px',
                      paddingBottom: '24px'
                    }}
                  >
                    <p style={{
                      fontFamily: 'Pretendard',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '1.5',
                      color: '#1A1C20',
                      margin: 0,
                      whiteSpace: 'pre-line'
                    }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div style={{
        padding: '12px 16px',
        marginTop: 'auto'
      }}>
        <Button
          variant="primary"
          onClick={handleNext}
        >
          다음으로
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

export default Onboarding
