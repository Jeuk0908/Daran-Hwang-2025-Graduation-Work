import React from 'react';

/**
 * RebalanceETFCard 컴포넌트
 *
 * 리밸런싱 계획을 보여주는 ETF 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.title - ETF 이름 (예: "2차 전지 TIGER x2")
 * @param {string} props.targetWeight - 목표 비중 (예: "10")
 * @param {string} props.currentWeight - 현재 비중 (예: "100") - variant="default"일 때만 표시
 * @param {string} props.adjustedWeight - 조정 후 비중 (예: "100")
 * @param {string} props.shares - 주식 수 (예: "2")
 * @param {string} props.actionType - 액션 타입 ("buy" | "sell")
 * @param {string} props.actionShares - 액션 주식 수 (예: "3")
 * @param {string} props.actionText - 액션 텍스트 (예: "3주를 매수할께요")
 * @param {string} props.pricePerShare - 1주당 가격 (예: "123,456,789")
 * @param {string} props.totalAmount - 총 합계 금액 (예: "123,456,789")
 * @param {"default" | "variant2"} props.variant - 카드 변형 (default: 기본형, variant2: 간단한 형태)
 * @param {Function} props.onClick - 클릭 핸들러
 */
const RebalanceETFCard = ({
  title = '2차 전지 TIGER x2',
  targetWeight = '10',
  currentWeight = '100',
  adjustedWeight = '100',
  shares = '2',
  actionType = 'buy',
  actionShares = '3',
  actionText = '3주를 매수할께요',
  pricePerShare = '123,456,789',
  totalAmount = '123,456,789',
  variant = 'default',
  onClick
}) => {
  // variant2 (간단한 형태)
  if (variant === 'variant2') {
    return (
      <div
        onClick={onClick}
        style={{
          width: '100%',
          maxWidth: '361px',
          padding: '20px 16px',
          background: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          cursor: onClick ? 'pointer' : 'default',
        }}
      >
        {/* 상단 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingBottom: '12px',
            borderBottom: '1px solid #F7F7F8',
          }}
        >
          {/* 제목 + 1주당 가격 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '1.5',
                color: '#000000',
                margin: 0,
              }}
            >
              {title}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '5px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  color: '#757E8F',
                  margin: 0,
                }}
              >
                1주 당
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '1.5',
                    color: '#757E8F',
                    margin: 0,
                  }}
                >
                  {pricePerShare}
                </p>
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    color: '#757E8F',
                    margin: 0,
                  }}
                >
                  원
                </p>
              </div>
            </div>
          </div>

          {/* 목표 비중 + 적용 비중 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  color: '#474C57',
                  margin: 0,
                }}
              >
                목표 비중
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <div
                  style={{
                    padding: '8px 16px',
                    background: '#E0EEFF',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Pretendard',
                      fontSize: '16px',
                      fontWeight: '600',
                      lineHeight: '1.35',
                      color: '#1A1C20',
                      margin: 0,
                    }}
                  >
                    {targetWeight}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '1.5',
                    color: '#000000',
                    margin: 0,
                  }}
                >
                  %
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '8px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  color: '#474C57',
                  margin: 0,
                }}
              >
                적용 비중
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '1.5',
                    color: '#474C57',
                    margin: 0,
                  }}
                >
                  {adjustedWeight}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 영역 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontWeight: '600',
                lineHeight: '1.35',
                color: '#005CCC',
                margin: 0,
              }}
            >
              {actionShares}
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '1.5',
                color: '#5E6573',
                margin: 0,
              }}
            >
              주
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '1.5',
                color: '#5E6573',
                margin: 0,
              }}
            >
              {actionType === 'buy' ? '매수' : '매도'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: '1.5',
                color: '#5E6573',
                margin: 0,
              }}
            >
              총 합계
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px' }}>
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '16px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  color: '#005CCC',
                  margin: 0,
                }}
              >
                {totalAmount}
              </p>
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  color: '#5E6573',
                  margin: 0,
                }}
              >
                원
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // default (기본 형태)
  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        maxWidth: '361px',
        padding: '20px 16px',
        background: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {/* 상단 영역 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          paddingBottom: '12px',
          borderBottom: '1px solid #F7F7F8',
        }}
      >
        {/* 제목 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <p
            style={{
              fontFamily: 'Pretendard',
              fontSize: '18px',
              fontWeight: '600',
              lineHeight: '1.35',
              color: '#000000',
              margin: 0,
            }}
          >
            {title}
          </p>
        </div>

        {/* 목표 비중 + 현재 비중 + 조정 후 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: '1.5',
                color: '#474C57',
                margin: 0,
              }}
            >
              목표 비중
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <div
                style={{
                  padding: '8px 16px',
                  background: '#E0EEFF',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '1.35',
                    color: '#1A1C20',
                    margin: 0,
                  }}
                >
                  {targetWeight}
                </p>
              </div>
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  color: '#000000',
                  margin: 0,
                }}
              >
                %
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* 현재 비중 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  color: '#757E8F',
                  margin: 0,
                }}
              >
                현재 비중
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '1.5',
                    color: '#757E8F',
                    margin: 0,
                  }}
                >
                  {currentWeight}%
                </p>
              </div>
            </div>

            {/* 조정 후 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '8px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  color: '#474C57',
                  margin: 0,
                }}
              >
                조정 후
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '1.5',
                    color: '#474C57',
                    margin: 0,
                  }}
                >
                  {adjustedWeight}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 액션 칩 + 최종 보유 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* 액션 칩 */}
            <div
              style={{
                padding: '4px 6px',
                background: actionType === 'buy' ? '#EFFAEC' : '#FFE5E5',
                borderRadius: '8px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '12px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  color: actionType === 'buy' ? '#43A329' : '#DA6816',
                  margin: 0,
                }}
              >
                {actionText}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '1.5',
                color: '#5E6573',
                margin: 0,
              }}
            >
              최종 보유
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontWeight: '600',
                lineHeight: '1.35',
                color: '#1A1C20',
                margin: 0,
              }}
            >
              {shares}
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '1.5',
                color: '#5E6573',
                margin: 0,
              }}
            >
              주
            </p>
          </div>
        </div>
      </div>

      {/* 하단 영역 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
          <p
            style={{
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: '500',
              lineHeight: '1.5',
              color: '#5E6573',
              margin: 0,
            }}
          >
            1주 당
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '1.5',
                color: '#5E6573',
                margin: 0,
              }}
            >
              {pricePerShare}
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: '1.5',
                color: '#5E6573',
                margin: 0,
              }}
            >
              원
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
          <p
            style={{
              fontFamily: 'Pretendard',
              fontSize: '12px',
              fontWeight: '500',
              lineHeight: '1.5',
              color: '#5E6573',
              margin: 0,
            }}
          >
            총 합계
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px' }}>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '1.5',
                color: '#000000',
                margin: 0,
              }}
            >
              {totalAmount}
            </p>
            <p
              style={{
                fontFamily: 'Pretendard',
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: '1.5',
                color: '#5E6573',
                margin: 0,
              }}
            >
              원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebalanceETFCard;
