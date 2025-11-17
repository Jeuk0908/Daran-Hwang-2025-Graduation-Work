import iconUpupS from '../../assets/자산 card ui/icon_upup_s.svg';
import iconDowndownS from '../../assets/자산 card ui/icon_downdown_s.svg';

/**
 * MarketIndexCard - 시장 지수 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.name - 지수 이름 (예: "S&P 500 선물", "코스피")
 * @param {string} props.value - 지수 값 (예: "6,410.75")
 * @param {string} props.changePercent - 변동률 (예: "2.59")
 * @param {'up' | 'down'} props.changeDirection - 변동 방향
 * @param {string} props.chartImage - 차트 이미지 URL (선택사항)
 * @param {boolean} props.showChart - 차트 표시 여부
 * @param {function} props.onClick - 클릭 핸들러
 */
export const MarketIndexCard = ({
  name = 'S&P 500 선물',
  value = '6,410.75',
  changePercent = '2.59',
  changeDirection = 'up',
  chartImage,
  showChart = false,
  onClick
}) => {
  const isUp = changeDirection === 'up';
  const changeColor = isUp ? '#43A329' : '#DA6816';
  const sign = isUp ? '+' : '-';

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#F7F7F8',
        borderRadius: '12px',
        padding: showChart ? '12px' : '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        justifyContent: 'center',
        minWidth: '110px',
        width: showChart ? 'auto' : '110px',
        flexShrink: 0,
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: showChart ? 'row' : 'column',
          gap: showChart ? '12px' : '2px',
          alignItems: showChart ? 'flex-start' : 'flex-start',
          width: showChart ? 'auto' : '72px'
        }}
      >
        {/* 지수 정보 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            width: showChart ? '72px' : '100%',
            minWidth: 0
          }}
        >
          {/* 지수 이름 */}
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: 1.5,
              color: '#757E8F',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%'
            }}
          >
            {name}
          </p>

          {/* 지수 값 */}
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: 1.5,
              color: '#000000',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%'
            }}
          >
            {value}
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
              {sign}
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

        {/* 차트 (있는 경우에만) */}
        {showChart && chartImage && (
          <div
            style={{
              width: '60px',
              height: '46px',
              flexShrink: 0
            }}
          >
            <img
              src={chartImage}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
