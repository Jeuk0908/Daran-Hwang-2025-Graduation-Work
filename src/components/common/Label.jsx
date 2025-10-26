/**
 * Label - 작은 라벨/뱃지 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.title - 라벨 텍스트
 * @param {function} props.onClick - 클릭 핸들러
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {'primary' | 'grey' | 'down' | 'black' | 'primary2' | 'up' | 'down2' | 'up2'} props.color - 색상 테마
 */
export const Label = ({
  title = '리벨런싱 필요',
  onClick,
  disabled = false,
  color = 'down'
}) => {
  // 색상별 스타일 정의
  const getStyles = () => {
    switch (color) {
      case 'primary':
        return {
          backgroundColor: '#3490FF',
          color: '#FFFFFF'
        };
      case 'primary2':
        return {
          backgroundColor: '#E0EEFF',
          color: '#3490FF'
        };
      case 'grey':
        return {
          backgroundColor: '#E6E7EA',
          color: '#474C57'
        };
      case 'black':
        return {
          backgroundColor: '#020203',
          color: '#FFFFFF'
        };
      case 'down':
        return {
          backgroundColor: '#EB843A',
          color: '#FFFFFF'
        };
      case 'down2':
        return {
          backgroundColor: '#FEF6F1',
          color: '#DA6816'
        };
      case 'up':
        return {
          backgroundColor: '#43A329',
          color: '#FFFFFF'
        };
      case 'up2':
        return {
          backgroundColor: '#EFFAEC',
          color: '#43A329'
        };
      default:
        return {
          backgroundColor: '#EB843A',
          color: '#FFFFFF'
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '6px',
        paddingRight: '6px',
        paddingTop: '4px',
        paddingBottom: '4px',
        backgroundColor: styles.backgroundColor,
        borderRadius: '8px',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '18px',
        color: styles.color,
        whiteSpace: 'nowrap',
        cursor: disabled ? 'not-allowed' : (onClick ? 'pointer' : 'default'),
        opacity: disabled ? 0.5 : 1,
        transition: 'background-color 0.2s ease, color 0.2s ease',
        outline: 'none'
      }}
    >
      {title}
    </div>
  );
};
