import iconUpupS from '../../assets/자산 card ui/icon_upup_s.svg';
import iconDowndownS from '../../assets/자산 card ui/icon_downdown_s.svg';

/**
 * ETFCard - ETF 선택 리스트 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.name - ETF 이름 (예: "TIGER 미국S&P500")
 * @param {string} props.code - ETF 코드 (예: "12341")
 * @param {string} props.chartImage - 차트 이미지 URL (선택)
 * @param {string} props.currentPrice - 현재 가격 (예: "21,970")
 * @param {string} props.changePercent - 변동률 (예: "2.59")
 * @param {'up' | 'down'} props.changeDirection - 변동 방향
 * @param {boolean} props.isSelected - 선택 여부
 * @param {function} props.onClick - 클릭 핸들러
 */
export const ETFCard = ({
  name = 'TIGER 미국S&P500',
  code = '12341',
  chartImage,
  currentPrice = '21,970',
  changePercent = '2.59',
  changeDirection = 'up',
  isSelected = false,
  onClick
}) => {
  const isUp = changeDirection === 'up';
  const changeColor = isUp ? '#43A329' : '#DA6816';

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? '#FAFCFF' : '#FFFFFF',
        boxShadow: isSelected
          ? '1px 2px 13.6px 0px rgba(52, 144, 255, 0.5)'
          : '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        padding: '20px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        cursor: onClick ? 'pointer' : 'default',
        width: '100%',
        border: 'none',
        transition: 'all 0.2s ease'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        {/* 좌측: ETF 정보 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            justifyContent: 'center',
            width: '187px',
            flexShrink: 0
          }}
        >
          {/* ETF 이름 */}
          <div
            style={{
              display: 'flex',
              gap: '4px',
              alignItems: 'flex-start',
              width: '100%'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: '#1A1C20',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {name}
            </p>
          </div>

          {/* ETF 코드 */}
          <div
            style={{
              display: 'flex',
              gap: '2px',
              alignItems: 'center'
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#757E8F',
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {code}
            </p>
          </div>
        </div>

        {/* 중앙: 차트 */}
        <div
          style={{
            width: '60px',
            height: '46px',
            flexShrink: 0,
            position: 'relative'
          }}
        >
          {chartImage ? (
            <img
              src={chartImage}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#F7F7F8',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg
                width="60"
                height="46"
                viewBox="0 0 60 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 40L15 28L25 35L38 15L58 8"
                  stroke={changeColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        {/* 우측: 가격 정보 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '46px',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '90px',
            flexShrink: 0
          }}
        >
          {/* 현재 가격 */}
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: 1.35,
              color: '#000000',
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            {currentPrice}
          </p>

          {/* 변동률 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0
            }}
          >
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: changeColor,
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {isUp ? '+' : '-'}
            </p>
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: changeColor,
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {changePercent}
            </p>
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.5,
                color: changeColor,
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              %
            </p>
            <div
              style={{
                width: '10px',
                height: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <img
                src={isUp ? iconUpupS : iconDowndownS}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
