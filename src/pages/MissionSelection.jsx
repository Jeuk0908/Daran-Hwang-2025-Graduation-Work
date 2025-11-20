import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav } from '../components/common/TopNav'
import { Button } from '../components/common/Button'
import { setActiveMission } from '../utils/missionStorage'
import beaverIcon from '../assets/목표를 향해 비버.svg'
import catIcon from '../assets/얼리어덥터 고양이.svg'

function MissionSelection() {
  const navigate = useNavigate()
  const [selectedMission, setSelectedMission] = useState(null)

  const handleBack = () => {
    navigate('/onboarding', { replace: true })
  }

  const handleMissionSelect = (missionId) => {
    setSelectedMission(missionId)
  }

  const handleNext = () => {
    if (!selectedMission) return
    // 선택한 미션을 localStorage에 저장
    setActiveMission(selectedMission)
    // 미션 선택 후 시작 안내 페이지로 이동
    navigate('/mission-start', { replace: true })
  }

  // 미션 카드 데이터
  const missions = [
    {
      id: 'portfolio',
      title: '나만의 포트폴리오 만들어보기',
      icon: beaverIcon,
      conditions: [
        '나만의 ETF 포트폴리오 제작'
      ]
    },
    {
      id: 'vocabulary',
      title: 'ETF 단어 카드 열어보기',
      icon: catIcon,
      conditions: [
        '단어장 찾아보기',
        '원하는 ETF를 찾아 단어 카드 열어보기',
        '검색으로 단어 뜻 찾아보기'
      ]
    }
  ]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100dvh', // iOS Safari 호환: Dynamic Viewport Height
      height: '100%',
      backgroundColor: '#ffffff'
    }}>
      <TopNav
        depth="2"
        state="icon"
        title=""
        showTitle={false}
        showIconL={false}
        showIconR={false}
        onBackClick={handleBack}
      />

      {/* 헤더 섹션 */}
      <div style={{
        padding: '32px 16px 98px',
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
          진행할 미션을 골라주세요
        </h1>
        <p style={{
          fontFamily: 'Pretendard',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '1.5',
          color: '#474C57',
          margin: 0
        }}>
          각 소요 예상시간은 3분으로, 중도 포기가 가능합니다.
        </p>
      </div>

      {/* 미션 카드 섹션 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        flex: 1,
        padding: '0'
      }}>
        {missions.map((mission) => {
          const isSelected = selectedMission === mission.id
          const isNonSelected = selectedMission && selectedMission !== mission.id

          return (
            <div
              key={mission.id}
              onClick={() => handleMissionSelect(mission.id)}
              style={{
                padding: '10px 16px',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  backgroundColor: isNonSelected ? '#F7F7F8' : '#ffffff',
                  boxShadow: isSelected
                    ? '1px 2px 13.6px 0px rgba(52, 144, 255, 0.25), inset 0 0 0 1px #99C7FF'
                    : '1px 2px 13.6px 0px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  padding: '20px 12px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  transition: 'background-color 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* 아이콘 */}
                <img
                  src={mission.icon}
                  alt=""
                  style={{
                    width: '48px',
                    height: '48px',
                    flexShrink: 0,
                    opacity: isNonSelected ? 0.6 : 1,
                    transition: 'opacity 0.2s ease'
                  }}
                />

              {/* 텍스트 영역 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flex: 1
              }}>
                {/* 제목 */}
                <p style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '1.35',
                  color: isSelected ? '#005CCC' : isNonSelected ? '#5E6573' : '#1A1C20',
                  margin: 0,
                  transition: 'color 0.2s ease'
                }}>
                  {mission.title}
                </p>

                {/* 클리어 조건 */}
                <div style={{
                  fontFamily: 'Pretendard',
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '1.5',
                  color: isSelected ? '#3490FF' : '#474C57',
                  transition: 'color 0.2s ease'
                }}>
                  <p style={{ margin: '0 0 4px 0' }}>
                    {mission.id === 'vocabulary'
                      ? '<클리어 조건 (이 중 하나라도 달성 시 미션 완료)>'
                      : '<클리어 조건>'}
                  </p>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '18px',
                    listStyleType: 'disc'
                  }}>
                    {mission.conditions.map((condition, index) => (
                      <li key={index} style={{ marginBottom: index < mission.conditions.length - 1 ? '0' : '0' }}>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          )
        })}
      </div>

      {/* 하단 버튼 영역 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 'auto'
      }}>
        {/* 캡션 */}
        <div style={{
          padding: '4px 16px 0',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: 'Pretendard',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '1.5',
            color: '#757E8F',
            margin: 0
          }}>
            원하는 미션을 선택해 주세요
          </p>
        </div>

        {/* 버튼 */}
        <div style={{
          padding: '12px 16px 34px'
        }}>
          {selectedMission ? (
            <Button
              variant="primary"
              onClick={handleNext}
            >
              다음으로
            </Button>
          ) : (
            <div style={{
              width: '100%',
              padding: '16px',
              background: '#F7F7F8',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <span style={{
                fontFamily: 'Pretendard',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '1.35',
                color: '#9198A6'
              }}>
                다음으로
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MissionSelection
