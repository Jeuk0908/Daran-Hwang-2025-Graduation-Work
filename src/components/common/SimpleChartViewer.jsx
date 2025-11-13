import iconUpupS from '../../assets/자산 card ui/icon_upup_s.svg';
import iconDowndownS from '../../assets/자산 card ui/icon_downdown_s.svg';

/**
 * SimpleChartViewer - 간이 차트 뷰어 컴포넌트
 *
 * @param {Object} props
 * @param {number} props.rank - TOP 순위 (예: 1)
 * @param {string} props.name - ETF 이름 (예: "TIGER 미국S&P500")
 * @param {string} props.code - 종목 코드 (예: "12341") - showPriceComparison이 false일 때 표시
 * @param {string} props.priceComparisonText - 가격 비교 텍스트 (예: "실시간 가치보다")
 * @param {string} props.priceComparisonValue - 비교 값 (예: "0.3")
 * @param {'up' | 'down'} props.priceComparisonDirection - 가격 비교 방향 (up: 저렴, down: 비쌈)
 * @param {string} props.priceComparisonLabel - 비교 라벨 (예: "저렴해요", "비싸요")
 * @param {string} props.chartImage - 차트 이미지 URL (선택)
 * @param {string} props.currentPrice - 현재 가격 (예: "21,970")
 * @param {string} props.changePercent - 변동률 (예: "2.59")
 * @param {'up' | 'down'} props.changeDirection - 변동 방향
 * @param {boolean} props.showTopLabel - TOP 라벨 표시 여부 (기본: true)
 * @param {boolean} props.showPriceComparison - 가격 비교 정보 표시 여부 (기본: true, false면 code 표시)
 * @param {boolean} props.isSelected - 선택 여부 (포트폴리오 제작 시 사용)
 * @param {function} props.onClick - 클릭 핸들러
 */
export const SimpleChartViewer = ({
  rank = 1,
  name = 'TIGER 미국S&P500',
  code,
  priceComparisonText = '실시간 가치보다',
  priceComparisonValue = '0.3',
  priceComparisonDirection = 'up',
  priceComparisonLabel = '저렴해요',
  chartImage,
  currentPrice = '21,970',
  changePercent = '2.59',
  changeDirection = 'up',
  showTopLabel = true,
  showPriceComparison = true,
  isSelected = false,
  onClick
}) => {
  const isUp = changeDirection === 'up';
  const isPriceUp = priceComparisonDirection === 'up';
  const changeColor = isUp ? '#43A329' : '#DA6816';
  const priceComparisonColor = isPriceUp ? '#43A329' : '#DA6816';

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
        transition: 'all 0.2s ease'
      }}
    >
      {/* TOP 라벨 */}
      {showTopLabel && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}
        >
          <p
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
            TOP
          </p>
          <p
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
            {rank}
          </p>
        </div>
      )}

      {/* 메인 콘텐츠 */}
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

          {/* 가격 비교 정보 또는 종목 코드 */}
          {showPriceComparison ? (
            <div
              style={{
                display: 'flex',
                gap: '2px',
                alignItems: 'center',
                width: '151px'
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
                {priceComparisonText}
              </p>
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
                    color: priceComparisonColor,
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {priceComparisonValue}
                </p>
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: priceComparisonColor,
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  %
                </p>
              </div>
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: priceComparisonColor,
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                {priceComparisonLabel}
              </p>
            </div>
          ) : (
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
          )}
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
              {isUp ? '+' : ''}
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