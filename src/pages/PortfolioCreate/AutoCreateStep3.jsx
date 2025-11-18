import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import iconBackL from '../../assets/icon_back_L.svg';

const AutoCreateStep3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasScrolled = useScrollShadow(0);

  // 이전 페이지에서 전달받은 데이터
  const previousData = location.state || {};

  // 편집 중인 항목 ID 추적
  const [editingItemId, setEditingItemId] = useState(null);

  // 임시 포트폴리오 데이터
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      name: '2차 전지 TIGER x2',
      pricePerShare: 123456789,
      targetWeight: 10,
      appliedWeight: 100,
      buyShares: 2,
      totalAmount: 123456789
    },
    {
      id: 2,
      name: 'KODEX 200',
      pricePerShare: 45678900,
      targetWeight: 20,
      appliedWeight: 100,
      buyShares: 3,
      totalAmount: 137036700
    },
    {
      id: 3,
      name: 'TIGER 미국S&P500',
      pricePerShare: 98765432,
      targetWeight: 30,
      appliedWeight: 100,
      buyShares: 5,
      totalAmount: 493827160
    },
    {
      id: 4,
      name: 'KODEX 배당성장',
      pricePerShare: 56789012,
      targetWeight: 25,
      appliedWeight: 100,
      buyShares: 4,
      totalAmount: 227156048
    },
    {
      id: 5,
      name: 'TIGER 글로벌리츠',
      pricePerShare: 34567890,
      targetWeight: 15,
      appliedWeight: 100,
      buyShares: 2,
      totalAmount: 69135780
    }
  ]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCompleteClick = () => {
    if (totalWeight !== 100) return;
    // 다음 단계로 이동 (4/5) - 포트폴리오 아이템을 포함하여 state로 전달
    navigate('/portfolio/create/auto/step4', {
      state: {
        ...previousData,
        portfolioItems
      }
    });
  };

  const handleWeightClick = (itemId) => {
    setEditingItemId(itemId);
  };

  const handleWeightChange = (itemId, newWeight) => {
    const weight = parseInt(newWeight) || 0;

    // 0-100% 범위 내에서만 입력 가능
    if (weight >= 0 && weight <= 100) {
      setPortfolioItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, targetWeight: weight } : item
        )
      );
    } else if (weight > 100) {
      // 100%를 초과하면 100%로 설정
      setPortfolioItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, targetWeight: 100 } : item
        )
      );
    }
  };

  const handleWeightBlur = () => {
    setEditingItemId(null);
  };

  const handleWeightKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditingItemId(null);
    }
  };

  const formatNumber = (num) => {
    return num.toLocaleString('ko-KR');
  };

  const totalWeight = portfolioItems.reduce((sum, item) => sum + item.targetWeight, 0);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Back Button with Safe Area and Progress */}
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
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <button
            onClick={handleBackClick}
            style={{
              width: '24px',
              height: '24px',
              padding: 0,
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="뒤로가기"
          >
            <img
              src={iconBackL}
              alt="뒤로가기"
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
          </button>

          {/* Progress Indicator */}
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#757E8F',
              margin: 0
            }}
          >
            3/5
          </p>
        </div>
      </div>

      {/* Header Section - Sticky */}
      <div
        style={{
          position: 'sticky',
          top: '50px',
          zIndex: 99,
          backgroundColor: '#FFFFFF',
          padding: `32px ${LAYOUT.HORIZONTAL_PADDING}px`,
          boxShadow: hasScrolled ? '0 2px 8px 0 rgba(0, 0, 0, 0.04)' : 'none',
          transition: 'box-shadow 0.2s ease'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h1
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              lineHeight: 1.5,
              color: '#000000',
              margin: 0
            }}
          >
            어떤 비중으로 매수할까요?
          </h1>
          <div
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#474C57'
            }}
          >
            <p style={{ margin: 0 }}>
              총 비중이 100%가 되도록 입력해 주세요.
            </p>
            <p style={{ margin: 0, color: totalWeight === 100 ? '#00A600' : '#DA6816' }}>
              현재 비중 : {totalWeight}%
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`
        }}
      >
        {/* Portfolio Items */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginBottom: '20px'
          }}
        >
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px 16px',
                boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {/* Title and Price per Share */}
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
                    fontSize: '18px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#000000',
                    margin: 0
                  }}
                >
                  {item.name}
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'flex-end'
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: '#757E8F',
                      margin: 0
                    }}
                  >
                    1주 당
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: '2px',
                      alignItems: 'flex-end'
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'Pretendard, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: 1.5,
                        color: '#757E8F',
                        margin: 0
                      }}
                    >
                      {formatNumber(item.pricePerShare)}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Pretendard, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: '#757E8F',
                        margin: 0
                      }}
                    >
                      원
                    </p>
                  </div>
                </div>
              </div>

              {/* Target Weight and Applied Weight */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  borderBottom: '1px solid #F7F7F8',
                  paddingBottom: '12px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center'
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: '#474C57',
                      margin: 0
                    }}
                  >
                    목표 비중
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      alignItems: 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: '2px',
                        alignItems: 'center'
                      }}
                    >
                      {editingItemId === item.id ? (
                        <>
                          <style>
                            {`
                              /* 숫자 입력 증가/감소 버튼 제거 */
                              input[type=number]::-webkit-inner-spin-button,
                              input[type=number]::-webkit-outer-spin-button {
                                -webkit-appearance: none;
                                margin: 0;
                              }
                              input[type=number] {
                                -moz-appearance: textfield;
                              }
                            `}
                          </style>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={item.targetWeight}
                            onChange={(e) => handleWeightChange(item.id, e.target.value)}
                            onBlur={handleWeightBlur}
                            onKeyDown={handleWeightKeyDown}
                            autoFocus
                            style={{
                              backgroundColor: '#E0EEFF',
                              borderRadius: '4px',
                              padding: 0,
                              border: '2px solid #3490FF',
                              fontFamily: 'Pretendard, sans-serif',
                              fontSize: '16px',
                              fontWeight: 600,
                              lineHeight: '37.59px',
                              color: '#1A1C20',
                              width: '49.56px',
                              height: '37.59px',
                              textAlign: 'center',
                              outline: 'none',
                              boxSizing: 'border-box',
                              display: 'block'
                            }}
                          />
                        </>
                      ) : (
                        <div
                          onClick={() => handleWeightClick(item.id)}
                          style={{
                            backgroundColor: '#E0EEFF',
                            borderRadius: '4px',
                            padding: 0,
                            border: '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                            width: '49.56px',
                            height: '37.59px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxSizing: 'border-box'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C5DFFF'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E0EEFF'}
                        >
                          <p
                            style={{
                              fontFamily: 'Pretendard, sans-serif',
                              fontSize: '16px',
                              fontWeight: 600,
                              lineHeight: 1,
                              color: '#1A1C20',
                              margin: 0
                            }}
                          >
                            {item.targetWeight}
                          </p>
                        </div>
                      )}
                      <p
                        style={{
                          fontFamily: 'Pretendard, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          color: '#000000',
                          margin: 0
                        }}
                      >
                        %
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '6px',
                    alignItems: 'center'
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: '#474C57',
                      margin: 0
                    }}
                  >
                    적용 비중
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'Pretendard, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: 1.5,
                        color: '#474C57',
                        margin: 0
                      }}
                    >
                      {item.appliedWeight}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Buy Info and Total */}
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
                    gap: '4px',
                    alignItems: 'flex-end'
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 1.35,
                      color: '#005CCC',
                      margin: 0
                    }}
                  >
                    {item.buyShares}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: '#5E6573',
                      margin: 0
                    }}
                  >
                    주
                  </p>
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: '#5E6573',
                      margin: 0
                    }}
                  >
                    매수
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'flex-end'
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: '#5E6573',
                      margin: 0
                    }}
                  >
                    총 합계
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: '1px',
                      alignItems: 'flex-end'
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'Pretendard, sans-serif',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: 1.5,
                        color: '#005CCC',
                        margin: 0
                      }}
                    >
                      {formatNumber(item.totalAmount)}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Pretendard, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: '#5E6573',
                        margin: 0
                      }}
                    >
                      원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Sticky */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 99,
          padding: `12px ${LAYOUT.HORIZONTAL_PADDING}px`,
          paddingBottom: '34px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 -2px 8px 0 rgba(0, 0, 0, 0.04)'
        }}
      >
        <Button
          variant={totalWeight === 100 ? 'primary' : 'grey'}
          onClick={handleCompleteClick}
          disabled={totalWeight !== 100}
        >
          완료하기
        </Button>
      </div>
    </div>
  );
};

export default AutoCreateStep3;
