/**
 * ContentCardSkeleton - 탐색 탭 콘텐츠 카드 스켈레톤 컴포넌트
 * 비디오, 뉴스, 용어 카드 등의 로딩 플레이스홀더
 *
 * @param {Object} props
 * @param {'small' | 'medium' | 'large'} props.size - 스켈레톤 크기
 */
export const ContentCardSkeleton = ({ size = 'medium' }) => {
  const heights = {
    small: '120px',
    medium: '180px',
    large: '240px'
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)',
        width: '100%',
        boxSizing: 'border-box',
        minHeight: heights[size]
      }}
    >
      {/* 이미지/썸네일 영역 */}
      <div
        style={{
          width: '100%',
          height: '100px',
          backgroundColor: '#E6E7EA',
          borderRadius: '8px',
          marginBottom: '12px',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}
      />

      {/* 제목 */}
      <div
        style={{
          width: '85%',
          height: '18px',
          backgroundColor: '#E6E7EA',
          borderRadius: '4px',
          marginBottom: '8px',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.1s'
        }}
      />

      {/* 부제목/설명 */}
      <div
        style={{
          width: '70%',
          height: '14px',
          backgroundColor: '#E6E7EA',
          borderRadius: '4px',
          marginBottom: '8px',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.2s'
        }}
      />

      {/* 추가 정보 (size가 medium 이상일 때) */}
      {size !== 'small' && (
        <div
          style={{
            width: '60%',
            height: '14px',
            backgroundColor: '#E6E7EA',
            borderRadius: '4px',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: '0.3s'
          }}
        />
      )}

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  );
};
