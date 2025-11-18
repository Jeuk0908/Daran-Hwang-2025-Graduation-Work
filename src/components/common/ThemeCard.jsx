import iconUpupS from '../../assets/자산 card ui/icon_upup_s.svg';
import iconDowndownS from '../../assets/자산 card ui/icon_downdown_s.svg';

/**
 * ThemeCard - 인기 테마 카드 컴포넌트
 *
 * @param {Object} props
 * @param {number} props.rank - TOP 순위 (예: 1)
 * @param {string} props.theme - 테마 이름 (예: "양자 컴퓨터")
 * @param {string} props.changePercent - 변동률 (예: "24.5")
 * @param {'up' | 'down'} props.changeDirection - 변동 방향
 * @param {function} props.onClick - 클릭 핸들러
 */
export const ThemeCard = ({
  rank = 1,
  theme = '양자 컴퓨터',
  changePercent = '24.5',
  changeDirection = 'up',
  onClick
}) => {
  const isUp = changeDirection === 'up';
  const changeColor = isUp ? '#43A329' : '#DA6816';
  const sign = isUp ? '+' : '-';

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#EFF7FF',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        justifyContent: 'center',
        minWidth: '212px',
        width: '212px',
        flexShrink: 0,
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {/* TOP 순위 */}
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
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: 1.5,
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
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#757E8F',
            margin: 0,
            whiteSpace: 'nowrap'
          }}
        >
          {rank}
        </p>
      </div>

      {/* 테마명 + 변동률 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        {/* 테마명 */}
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#000000',
            margin: 0,
            whiteSpace: 'nowrap'
          }}
        >
          {theme}
        </p>

        {/* 변동률 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}
        >
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
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1.35,
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
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1.35,
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
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: changeColor,
                margin: 0,
                whiteSpace: 'nowrap'
              }}
            >
              %
            </p>
          </div>
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
  );
};
