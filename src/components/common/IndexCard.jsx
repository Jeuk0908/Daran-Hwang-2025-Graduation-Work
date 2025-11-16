import iconUpupS from '../../assets/자산 card ui/icon_upup_s.svg';
import iconDowndownS from '../../assets/자산 card ui/icon_downdown_s.svg';

/**
 * IndexCard - 지수 카드 컴포넌트 (지수 탭용)
 *
 * @param {Object} props
 * @param {string} props.name - 지수 이름 (예: "S&P 500 선물", "코스피")
 * @param {string} props.value - 지수 값 (예: "6,410.75")
 * @param {string} props.changePercent - 변동률 (예: "2.59")
 * @param {'up' | 'down'} props.changeDirection - 변동 방향
 * @param {function} props.onClick - 클릭 핸들러
 */
export const IndexCard = ({
  name = 'S&P 500 선물',
  value = '6,410.75',
  changePercent = '2.59',
  changeDirection = 'up',
  onClick
}) => {
  const isUp = changeDirection === 'up';
  const changeColor = isUp ? '#43A329' : '#DA6816';
  const sign = isUp ? '+' : '-';

  // 간단한 차트 SVG (상승/하락에 따라 다른 형태)
  const ChartSVG = () => {
    if (isUp) {
      return (
        <svg width="100%" height="100%" viewBox="0 0 60 46" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <path
            d="M2 44C8 38 12 30 18 28C24 26 28 32 34 28C40 24 44 18 50 14C52 12 54 10 58 8"
            stroke="#43A329"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    } else {
      return (
        <svg width="100%" height="100%" viewBox="0 0 60 46" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <path
            d="M2 8C8 14 12 22 18 24C24 26 28 20 34 24C40 28 44 34 50 38C52 40 54 42 58 44"
            stroke="#DA6816"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
        cursor: onClick ? 'pointer' : 'default',
        width: '100%',
        boxSizing: 'border-box',
        minWidth: 0 // 텍스트 truncation을 위해 필요
      }}
    >
      {/* 지수 정보 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          width: '100%',
          maxWidth: '72px',
          minWidth: 0 // 텍스트 truncation을 위해 필요
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
            width: '100%',
            minWidth: '100%'
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
            width: '100%',
            minWidth: '100%'
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
                display: 'block',
                transform: isUp ? 'none' : 'scaleY(-1)'
              }}
            />
          </div>
        </div>
      </div>

      {/* 차트 */}
      <div
        style={{
          width: '100%',
          maxWidth: '60px',
          height: '46px',
          flexShrink: 0
        }}
      >
        <ChartSVG />
      </div>
    </div>
  );
};
