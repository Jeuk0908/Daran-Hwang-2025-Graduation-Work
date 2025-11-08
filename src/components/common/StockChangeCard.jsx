/**
 * StockChangeCard - 주식 등락율 표시 카드 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.rank - 순위 (예: "1", "2", "3")
 * @param {string} props.name - 종목명 (예: "양자 컴퓨터")
 * @param {string} props.changeRate - 등락율 (예: "2.59")
 * @param {'up' | 'down'} props.direction - 상승/하락 방향
 * @param {function} props.onClick - 클릭 핸들러
 */
export const StockChangeCard = ({
  rank = '1',
  name = '양자 컴퓨터',
  changeRate = '2.59',
  direction = 'up',
  onClick
}) => {
  // 방향별 스타일
  const directionStyles = {
    up: {
      color: '#43A329',
      sign: '+',
      iconRotation: 0
    },
    down: {
      color: '#DA6816',
      sign: '-',
      iconRotation: 180
    }
  };

  const styles = directionStyles[direction];

  // 화살표 아이콘 렌더링
  const renderIcon = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '10px',
          height: '10px',
          transform: `rotate(${styles.iconRotation}deg)`,
          transition: 'transform 0.2s ease'
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 2.5L7.5 5H2.5L5 2.5Z"
            fill={styles.color}
            style={{ transition: 'fill 0.2s ease' }}
          />
        </svg>
      </div>
    );
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: '212px',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '1px 2px 13.6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s ease'
      }}
    >
      {/* TOP 순위 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '2px'
        }}
      >
        <span
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: '18px',
            color: '#757E8F',
            whiteSpace: 'nowrap'
          }}
        >
          TOP {rank}
        </span>
      </div>

      {/* 종목명 + 등락율 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        {/* 종목명 */}
        <span
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            color: '#000000',
            whiteSpace: 'nowrap'
          }}
        >
          {name}
        </span>

        {/* 등락율 + 아이콘 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}
        >
          <span
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '21.6px',
              color: styles.color,
              whiteSpace: 'nowrap',
              transition: 'color 0.2s ease'
            }}
          >
            {styles.sign}{changeRate}%
          </span>
          {renderIcon()}
        </div>
      </div>
    </div>
  );
};
