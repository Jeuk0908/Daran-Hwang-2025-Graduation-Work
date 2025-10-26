/**
 * RebalanceButton - 리벨런싱 버튼 컴포넌트 (중간 사이즈)
 *
 * @param {Object} props
 * @param {string} props.title - 버튼 텍스트
 * @param {function} props.onClick - 클릭 핸들러
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {'primary' | 'down' | 'up' | 'up2' | 'primary2' | 'down2' | 'grey' | 'grey2' | 'grey3'} props.color - 색상 테마
 * @param {'default' | 'skeleton'} props.state - 버튼 상태
 */
export const RebalanceButton = ({
  title = '리벨런싱',
  onClick,
  disabled = false,
  color = 'primary',
  state = 'default'
}) => {
  // 색상별 스타일 정의
  const getStyles = () => {
    // skeleton 상태
    if (state === 'skeleton') {
      const skeletonStyles = {
        primary: {
          backgroundColor: 'transparent',
          color: '#0073FF',
          border: '0px 1px 0px 0px solid #F7F7F8'
        },
        primary2: {
          backgroundColor: 'transparent',
          color: '#0073FF',
          border: 'none'
        },
        down: {
          backgroundColor: 'transparent',
          color: '#DA6816',
          border: '0px 1px 0px 0px solid #F7F7F8'
        },
        down2: {
          backgroundColor: 'transparent',
          color: '#DA6816',
          border: 'none'
        },
        grey: {
          backgroundColor: 'transparent',
          color: '#30343B',
          border: '0px 1px 0px 0px solid #F7F7F8'
        },
        grey2: {
          backgroundColor: 'transparent',
          color: '#30343B',
          border: 'none'
        }
      };
      return skeletonStyles[color] || skeletonStyles.primary;
    }

    // default 상태
    const defaultStyles = {
      primary: {
        backgroundColor: '#3490FF',
        color: '#FFFFFF',
        border: 'none'
      },
      primary2: {
        backgroundColor: '#E0EEFF',
        color: '#005CCC',
        border: 'none'
      },
      down: {
        backgroundColor: '#EB843A',
        color: '#FFFFFF',
        border: 'none'
      },
      down2: {
        backgroundColor: '#FEF6F1',
        color: '#DA6816',
        border: 'none'
      },
      up: {
        backgroundColor: '#43A329',
        color: '#FFFFFF',
        border: 'none'
      },
      up2: {
        backgroundColor: '#EFFAEC',
        color: '#43A329',
        border: 'none'
      },
      grey: {
        backgroundColor: '#1A1C20',
        color: '#FFFFFF',
        border: 'none'
      },
      grey2: {
        backgroundColor: '#F7F7F8',
        color: '#1A1C20',
        border: 'none'
      },
      grey3: {
        backgroundColor: '#FFFFFF',
        color: '#1A1C20',
        border: 'none'
      }
    };

    return defaultStyles[color] || defaultStyles.primary;
  };

  const styles = getStyles();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '160px',
        padding: '10px',
        backgroundColor: styles.backgroundColor,
        border: styles.border,
        borderRadius: '8px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '21px',
        color: styles.color,
        whiteSpace: 'nowrap',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background-color 0.2s ease, color 0.2s ease',
        outline: 'none'
      }}
    >
      {title}
    </button>
  );
};
