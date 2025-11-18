import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import { getPortfolios, deletePortfolio, getDefaultPortfolioBookmark, getDefaultPortfolioData, getPortfolioOrder } from '../../utils/portfolioStorage';
import iconCheckOff from '../../assets/icon_check_off.svg';
import iconCheckOn from '../../assets/icon_check_on.svg';
import iconHeartOutline from '../../assets/icon_heart_outline.svg';

const PortfolioDelete = () => {
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);
  const [portfolios, setPortfolios] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = () => {
    // 기본 포트폴리오 데이터
    const defaultData = getDefaultPortfolioData();
    const defaultPortfolio = {
      id: 'default-1',
      portfolioName: '미국 빅테크 배당금',
      isMainPortfolio: true,
      isBookmarked: getDefaultPortfolioBookmark(),
      amount: defaultData.amount,
      returnRate: defaultData.returnRate,
      riskType: '투자 성향',
      investmentStyle: '투자 키워드',
      createdAt: '2024-01-01T00:00:00.000Z'
    };

    const savedPortfolios = getPortfolios();

    // 모든 포트폴리오를 ID로 매핑
    const portfolioMap = {
      'default-1': defaultPortfolio,
      ...Object.fromEntries(savedPortfolios.map(p => [p.id, p]))
    };

    // 저장된 순서대로 포트폴리오 배열 생성
    const order = getPortfolioOrder();
    const sortedPortfolios = order
      .map(id => portfolioMap[id])
      .filter(Boolean);

    setPortfolios(sortedPortfolios);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCheckboxClick = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDeleteClick = () => {
    if (selectedIds.length === 0) return;

    // 선택된 포트폴리오 삭제
    selectedIds.forEach(id => {
      if (id !== 'default-1') { // 기본 포트폴리오는 삭제 불가
        deletePortfolio(id);
      }
    });

    // 포트폴리오 페이지로 돌아가기
    navigate('/portfolio');
  };

  const getPortfolioTags = (portfolio) => {
    const riskType = portfolio.riskType || '안정형';
    const investmentStyle = portfolio.investmentStyle || '배당';
    return [`# ${riskType}`, `# ${investmentStyle}`];
  };

  const formatNumber = (num) => {
    return num.toLocaleString('ko-KR');
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#F7F7F8',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Navigation */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF',
          padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 0`,
          boxShadow: hasScrolled ? '0 2px 8px 0 rgba(0, 0, 0, 0.04)' : 'none',
          transition: 'box-shadow 0.2s ease'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '50px',
            width: '100%'
          }}
        >
          {/* 좌측: 뒤로가기 + 제목 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0'
            }}
          >
            <button
              onClick={handleBackClick}
              style={{
                padding: '12px 12px 12px 0',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="뒤로가기"
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* 뒤로가기 아이콘 (180도 회전 + Y축 반전) */}
                <div
                  style={{
                    transform: 'rotate(180deg) scaleY(-1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
                    <path d="M7 2L16 12L7 22" stroke="#1A1C20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </button>
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1.25,
                color: '#1A1C20',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              포트폴리오 삭제
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - 포트폴리오 리스트 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: `20px ${LAYOUT.HORIZONTAL_PADDING}px`,
          paddingBottom: '160px' // 하단 고정 영역 높이
        }}
      >
        {portfolios.map((portfolio) => {
          const isSelected = selectedIds.includes(portfolio.id);
          const tags = getPortfolioTags(portfolio);
          const changeDirection = portfolio.returnRate >= 0 ? 'up' : 'down';

          return (
            <div
              key={portfolio.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #FAFCFF',
                borderRadius: '12px',
                padding: '20px 16px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.04)'
              }}
              onClick={() => handleCheckboxClick(portfolio.id)}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  paddingBottom: '12px'
                }}
              >
                {/* 체크박스 */}
                <img
                  src={isSelected ? iconCheckOn : iconCheckOff}
                  alt="체크박스"
                  style={{
                    width: '24px',
                    height: '24px',
                    flexShrink: 0
                  }}
                />

                {/* 포트폴리오 정보 */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  {/* 상단: 이름 + 태그 + 하트 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center'
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'Pretendard, sans-serif',
                          fontSize: '16px',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          color: '#474C57',
                          margin: 0,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {portfolio.portfolioName}
                      </p>
                      {!portfolio.isManualCreated && (
                        <div
                          style={{
                            display: 'flex',
                            gap: '2px',
                            alignItems: 'center'
                          }}
                        >
                          {tags.map((tag, index) => (
                            <p
                              key={index}
                              style={{
                                fontFamily: 'Pretendard, sans-serif',
                                fontSize: '10px',
                                fontWeight: 500,
                                lineHeight: 1.25,
                                color: '#757E8F',
                                margin: 0,
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {tag}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <img
                      src={iconHeartOutline}
                      alt="하트"
                      style={{
                        width: '24px',
                        height: '24px',
                        flexShrink: 0
                      }}
                    />
                  </div>

                  {/* 하단: 금액 + 수익률 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'Pretendard, sans-serif',
                        fontSize: '20px',
                        fontWeight: 700,
                        lineHeight: 1.5,
                        color: '#000000',
                        margin: 0
                      }}
                    >
                      {formatNumber(portfolio.amount)}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0'
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'Pretendard, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          color: changeDirection === 'up' ? '#43A329' : '#EB843A',
                          margin: 0
                        }}
                      >
                        {changeDirection === 'up' ? '+' : '-'}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Pretendard, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          color: changeDirection === 'up' ? '#43A329' : '#EB843A',
                          margin: 0
                        }}
                      >
                        {Math.abs(portfolio.returnRate).toFixed(2)}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Pretendard, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          color: changeDirection === 'up' ? '#43A329' : '#EB843A',
                          margin: 0
                        }}
                      >
                        %
                      </p>
                      {/* 화살표 아이콘 */}
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transform: changeDirection === 'down' ? 'scaleY(-1)' : 'none'
                        }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.25 5.25L4 2.5L6.75 5.25" stroke={changeDirection === 'up' ? '#43A329' : '#EB843A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 고정 영역 */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '430px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* 캡션 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `4px ${LAYOUT.HORIZONTAL_PADDING}px 0`
          }}
        >
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#757E8F',
              textAlign: 'center',
              margin: 0
            }}
          >
            삭제할 포트폴리오를 선택해 주세요
          </p>
        </div>

        {/* 버튼 */}
        <div
          style={{
            padding: `12px ${LAYOUT.HORIZONTAL_PADDING}px`,
            paddingBottom: '12px'
          }}
        >
          <button
            onClick={handleDeleteClick}
            disabled={selectedIds.length === 0}
            style={{
              width: '100%',
              backgroundColor: selectedIds.length > 0 ? '#F6F7F8' : '#E6E7EA',
              borderRadius: '12px',
              padding: '16px',
              border: 'none',
              cursor: selectedIds.length > 0 ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: selectedIds.length > 0 ? '#005CCC' : '#9198A6',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              삭제하기
            </p>
          </button>
        </div>

        {/* Home Indicator */}
        <div
          style={{
            height: '34px',
            background: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '8px'
          }}
        >
          <div
            style={{
              width: '134px',
              height: '5px',
              backgroundColor: '#000000',
              borderRadius: '100px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioDelete;
