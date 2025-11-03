import { useState } from 'react';

/**
 * Chip Components
 *
 * 다양한 상태와 스타일을 가진 칩(태그) 컴포넌트
 */

/**
 * Chip - 태그(칩) 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.title - 칩 텍스트
 * @param {function} props.onClick - 클릭 핸들러
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {boolean} props.showIcon - 아이콘 표시 여부 (상승/하락 화살표)
 * @param {'select' | 'nonSelect'} props.state - 선택 상태
 * @param {'primary' | 'grey' | 'default' | 'primary2' | 'tab' | 'upTrend' | 'downTrend'} props.color - 색상 테마
 * @param {number} props.iconRotation - 아이콘 회전 각도 (0: 위쪽, 180: 아래쪽)
 */
export const Chip = ({
  title = '꾸준 인기',
  onClick,
  disabled = false,
  showIcon = false,
  state = 'select',
  color = 'primary',
  iconRotation
}) => {
  // 색상 및 상태별 스타일 정의
  const getStyles = () => {
    // 상승 트렌드 (upTrend)
    if (color === 'upTrend') {
      return {
        backgroundColor: '#EFFAEC',
        color: '#43A329',
        border: 'none',
        iconFill: '#43A329',
        iconRotation: 0 // 위쪽 화살표
      };
    }

    // 하락 트렌드 (downTrend)
    if (color === 'downTrend') {
      return {
        backgroundColor: '#FEF6F1',
        color: '#DA6816',
        border: 'none',
        iconFill: '#DA6816',
        iconRotation: 180 // 아래쪽 화살표
      };
    }

    // primary 색상
    if (color === 'primary') {
      if (state === 'select') {
        return {
          backgroundColor: '#3490FF',
          color: '#FFFFFF',
          border: 'none',
          iconFill: '#FFFFFF',
          iconRotation: 0
        };
      }
    }

    // primary2 색상
    if (color === 'primary2') {
      if (state === 'select') {
        return {
          backgroundColor: '#FAFCFF',
          color: '#005CCC',
          border: 'none',
          iconFill: '#005CCC',
          iconRotation: 0
        };
      } else {
        return {
          backgroundColor: '#FFFFFF',
          color: '#005CCC',
          border: '1px solid #E0EEFF',
          iconFill: '#005CCC',
          iconRotation: 0
        };
      }
    }

    // grey 색상
    if (color === 'grey') {
      if (state === 'select') {
        return {
          backgroundColor: '#020203',
          color: '#FFFFFF',
          border: 'none',
          iconFill: '#FFFFFF',
          iconRotation: 0
        };
      } else {
        return {
          backgroundColor: 'transparent',
          color: '#1A1C20',
          border: '1px solid #E6E7EA',
          iconFill: '#1A1C20',
          iconRotation: 0
        };
      }
    }

    // tab 색상 (탭 구분용)
    if (color === 'tab') {
      if (state === 'select') {
        return {
          backgroundColor: '#E6E7EA',
          color: '#1A1C20',
          border: 'none',
          iconFill: '#1A1C20',
          iconRotation: 0
        };
      } else {
        return {
          backgroundColor: '#E6E7EA',
          color: '#1A1C20',
          border: 'none',
          iconFill: '#1A1C20',
          iconRotation: 0
        };
      }
    }

    // default 색상
    return {
      backgroundColor: '#F7F7F8',
      color: '#1A1C20',
      border: 'none',
      iconFill: '#1A1C20',
      iconRotation: 0
    };
  };

  const styles = getStyles();

  // 화살표 아이콘 렌더링
  const renderIcon = () => {
    if (!showIcon) return null;

    // iconRotation prop이 제공되면 그것을 사용, 아니면 styles의 값 사용
    const rotation = iconRotation !== undefined ? iconRotation : styles.iconRotation;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '4px',
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.2s ease'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 8L6 12L14 12L10 8Z"
            fill={styles.iconFill}
            style={{ transition: 'fill 0.2s ease' }}
          />
        </svg>
      </div>
    );
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: showIcon ? '12px' : '10px',
        paddingRight: showIcon ? '4px' : '10px',
        paddingTop: '4px',
        paddingBottom: '4px',
        height: '32px',
        backgroundColor: styles.backgroundColor,
        border: styles.border,
        borderRadius: '12px',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '21px',
        color: styles.color,
        whiteSpace: 'nowrap',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background-color 0.2s ease, color 0.2s ease, border 0.2s ease',
        outline: 'none'
      }}
    >
      {title}
      {renderIcon()}
    </button>
  );
};

/**
 * TrendChip - 트렌드 토글 칩 컴포넌트 (상승/하락 전환)
 *
 * @param {Object} props
 * @param {boolean} props.isUpTrend - 상승 트렌드 여부 (true: 상승, false: 하락)
 * @param {function} props.onToggle - 토글 핸들러 (새로운 상태를 인자로 받음)
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {string} props.title - 칩 텍스트 (기본값: '꾸준 인기')
 */
export const TrendChip = ({
  isUpTrend = true,
  onToggle,
  disabled = false,
  title = '꾸준 인기'
}) => {
  const [trend, setTrend] = useState(isUpTrend);

  const handleClick = () => {
    if (disabled) return;
    const newTrend = !trend;
    setTrend(newTrend);
    if (onToggle) {
      onToggle(newTrend);
    }
  };

  const styles = trend ? {
    backgroundColor: '#EFFAEC',
    color: '#43A329',
    iconFill: '#43A329',
    iconRotation: 0
  } : {
    backgroundColor: '#FEF6F1',
    color: '#DA6816',
    iconFill: '#DA6816',
    iconRotation: 180
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '12px',
        paddingRight: '4px',
        paddingTop: '4px',
        paddingBottom: '4px',
        height: '32px',
        backgroundColor: styles.backgroundColor,
        border: 'none',
        borderRadius: '12px',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '21px',
        color: styles.color,
        whiteSpace: 'nowrap',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background-color 0.3s ease, color 0.3s ease',
        outline: 'none'
      }}
    >
      {title}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '4px',
          transform: `rotate(${styles.iconRotation}deg)`,
          transition: 'transform 0.3s ease'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 8L6 12L14 12L10 8Z"
            fill={styles.iconFill}
            style={{ transition: 'fill 0.3s ease' }}
          />
        </svg>
      </div>
    </button>
  );
};
