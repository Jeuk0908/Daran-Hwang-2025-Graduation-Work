/**
 * SelectionCard - 투자성향 선택 카드 컴포넌트
 *
 * 투자성향 테스트 등에서 사용되는 선택 가능한 카드 버튼
 * 3가지 상태: default(미선택), nonSelect아니(비활성), select(선택)
 */

/**
 * SelectionCard - 선택 가능한 카드 버튼
 *
 * @param {Object} props
 * @param {string} props.title - 카드 제목
 * @param {string} props.description - 카드 설명
 * @param {function} props.onClick - 클릭 핸들러
 * @param {'default' | 'nonSelect' | 'select'} props.state - 카드 상태
 * @param {string} props.icon - 커스텀 아이콘 경로 (선택사항, 기본값: 체크 아이콘)
 * @param {boolean} props.showIcon - 아이콘 표시 여부
 */
export const SelectionCard = ({
  title = '독립 자금 개미',
  description = '소극적 투자로 안전이 무조건 1순위예요.',
  onClick,
  state = 'default',
  icon,
  showIcon = true
}) => {
  // 상태별 스타일 정의
  const stateStyles = {
    default: {
      card: {
        backgroundColor: 'white',
        boxShadow: '1px 2px 13.6px rgba(0, 0, 0, 0.1)'
      },
      title: {
        color: '#1A1C20'
      },
      description: {
        color: '#9198A6'
      },
      iconFill: '#9198A6'
    },
    nonSelect: {
      card: {
        backgroundColor: '#F7F7F8'
      },
      title: {
        color: '#5E6573'
      },
      description: {
        color: '#9198A6'
      },
      iconFill: '#9198A6'
    },
    select: {
      card: {
        backgroundColor: 'white',
        boxShadow: '1px 2px 13.6px rgba(52, 144, 255, 0.25), inset 0 0 0 1px #99C7FF'
      },
      title: {
        color: '#005CCC'
      },
      description: {
        color: '#3490FF'
      },
      iconFill: '#3490FF'
    }
  };

  const styles = stateStyles[state];

  // 체크 아이콘 렌더링 (커스텀 아이콘이 있으면 그것을 사용)
  const renderIcon = () => {
    if (icon) {
      return (
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img
            src={icon}
            alt=""
            style={{
              width: '24px',
              height: '24px'
            }}
          />
        </div>
      );
    }

    // 기본 체크 아이콘 (SVG inline)
    return (
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill={styles.iconFill}
            style={{ transition: 'fill 0.2s ease' }}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12ZM17.2804 8.21967C17.5733 8.51256 17.5733 8.98744 17.2804 9.28033L11.2804 15.2803C11.0165 15.5442 10.5986 15.5739 10.3 15.35L6.30004 12.35C5.96867 12.1015 5.90152 11.6314 6.15004 11.3C6.39857 10.9686 6.86867 10.9015 7.20004 11.15L10.6797 13.7597L16.2197 8.21967C16.5126 7.92678 16.9875 7.92678 17.2804 8.21967Z"
            fill={state === 'select' ? styles.iconFill : styles.iconFill}
            style={{ transition: 'fill 0.2s ease' }}
          />
        </svg>
      </div>
    );
  };

  return (
    <div
      style={{
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '10px',
        paddingBottom: '10px',
        borderRadius: '8px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '12px',
        display: 'inline-flex'
      }}
    >
      <div
        onClick={onClick}
        style={{
          width: '361px',
          padding: '20px 12px',
          background: styles.card.backgroundColor,
          boxShadow: styles.card.boxShadow || 'none',
          borderRadius: '8px',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '16px',
          display: 'flex',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'background 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        {/* 아이콘 */}
        {showIcon && renderIcon()}

        {/* 텍스트 영역 */}
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}
        >
          {/* 제목 */}
          <div
            style={{
              alignSelf: 'stretch',
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '21.6px',
              color: styles.title.color,
              wordWrap: 'break-word',
              transition: 'color 0.2s ease'
            }}
          >
            {title}
          </div>

          {/* 설명 */}
          <div
            style={{
              alignSelf: 'stretch',
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '18px',
              color: styles.description.color,
              wordWrap: 'break-word',
              transition: 'color 0.2s ease'
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
