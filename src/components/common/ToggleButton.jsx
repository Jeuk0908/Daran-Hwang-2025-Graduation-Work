/**
 * ToggleButton Components
 *
 * StockFilterToggle - 주가 상승/하락 필터 토글
 * GeneralToggle - 일반 ON/OFF 토글
 * SmallToggle - 작은 ON/OFF 토글 (45x24px)
 */

/**
 * StockFilterToggle - 주가 상승/하락 필터링 토글 버튼
 *
 * @param {Object} props
 * @param {'up' | 'down'} props.value - 현재 선택된 값 ('up': 상승, 'down': 하락)
 * @param {function} props.onChange - 값 변경 핸들러 (newValue) => void
 * @param {boolean} props.disabled - 비활성화 여부
 */
export const StockFilterToggle = ({
  value = 'down',
  onChange,
  disabled = false
}) => {
  const handleToggle = () => {
    if (disabled) return;
    const newValue = value === 'down' ? 'up' : 'down';
    onChange?.(newValue);
  };

  const isDown = value === 'down';
  const isUp = value === 'up';

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      style={{
        position: 'relative',
        width: '90px',
        height: '40px',
        backgroundColor: '#E6E7EA',
        borderRadius: '25px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: 0,
        overflow: 'hidden',
        opacity: disabled ? 0.5 : 1,
        transition: 'opacity 0.2s ease'
      }}
      aria-label={`주가 필터: ${isDown ? '하락' : '상승'}`}
      aria-pressed={isDown ? 'true' : 'false'}
    >
      {/* 슬라이딩 배경 */}
      <div
        style={{
          position: 'absolute',
          width: '42px',
          height: '32px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          filter: isDown
            ? 'drop-shadow(0px 0px 8px rgba(235, 132, 58, 0.3))'
            : 'drop-shadow(0px 0px 8px rgba(118, 214, 91, 0.3))',
          top: '4px',
          left: isDown ? '44px' : '4px',
          transition: 'left 0.3s ease, filter 0.3s ease'
        }}
      />

      {/* 상승 텍스트 */}
      <div
        style={{
          position: 'absolute',
          left: '11px',
          top: '8px',
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '24px',
          color: isUp ? '#43A329' : '#ADB2BD',
          transition: 'color 0.3s ease',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        상승
      </div>

      {/* 하락 텍스트 */}
      <div
        style={{
          position: 'absolute',
          left: '51px',
          top: '8px',
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '24px',
          color: isDown ? '#DA6816' : '#ADB2BD',
          transition: 'color 0.3s ease',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        하락
      </div>
    </button>
  );
};

/**
 * GeneralToggle - 일반 ON/OFF 토글 버튼
 *
 * @param {Object} props
 * @param {boolean} props.checked - 토글 상태 (true: ON, false: OFF)
 * @param {function} props.onChange - 상태 변경 핸들러 (newChecked) => void
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {string} props.size - 크기 ('small': 34x20px, 'medium': 56x28px)
 */
export const GeneralToggle = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'medium'
}) => {
  const handleToggle = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  // 크기 설정
  const dimensions = size === 'small'
    ? { width: 34, height: 20, knobSize: 12, padding: 2 }
    : { width: 56, height: 28, knobSize: 19.76, padding: 4.12 };

  const knobPosition = checked
    ? dimensions.width - dimensions.knobSize - dimensions.padding
    : dimensions.padding;

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      role="switch"
      aria-checked={checked}
      style={{
        position: 'relative',
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        backgroundColor: checked ? '#3490FF' : '#ADB2BD',
        borderRadius: '14px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: 0,
        transition: 'background-color 0.3s ease',
        opacity: disabled ? 0.5 : 1
      }}
    >
      {/* 토글 노브 */}
      <div
        style={{
          position: 'absolute',
          width: `${dimensions.knobSize}px`,
          height: `${dimensions.knobSize}px`,
          backgroundColor: '#FFFFFF',
          borderRadius: '9.88px',
          filter: 'drop-shadow(0px 4px 4px rgba(89, 89, 89, 0.25))',
          top: '50%',
          transform: 'translateY(-50%)',
          left: `${knobPosition}px`,
          transition: 'left 0.3s ease'
        }}
      />
    </button>
  );
};

/**
 * SmallToggle - 작은 ON/OFF 토글 버튼 (45x24px)
 *
 * @param {Object} props
 * @param {boolean} props.checked - 토글 상태 (true: ON, false: OFF)
 * @param {function} props.onChange - 상태 변경 핸들러 (newChecked) => void
 * @param {boolean} props.disabled - 비활성화 여부
 */
export const SmallToggle = ({
  checked = false,
  onChange,
  disabled = false
}) => {
  const handleToggle = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  const knobPosition = checked ? 24 : 3;

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      role="switch"
      aria-checked={checked}
      style={{
        position: 'relative',
        width: '45px',
        height: '24px',
        backgroundColor: checked ? '#3490FF' : '#99C7FF',
        borderRadius: '12px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: 0,
        transition: 'background-color 0.3s ease',
        opacity: disabled ? 0.5 : 1
      }}
    >
      {/* 토글 노브 */}
      <div
        style={{
          position: 'absolute',
          width: '18px',
          height: '18px',
          backgroundColor: '#FFFFFF',
          borderRadius: '9px',
          top: '3px',
          left: `${knobPosition}px`,
          transition: 'left 0.3s ease'
        }}
      />
    </button>
  );
};
