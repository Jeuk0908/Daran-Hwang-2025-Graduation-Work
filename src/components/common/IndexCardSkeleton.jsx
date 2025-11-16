/**
 * IndexCardSkeleton - 지수 카드 스켈레톤 컴포넌트
 * 콘텐츠 로딩 중에 표시되는 플레이스홀더
 */
export const IndexCardSkeleton = () => {
  return (
    <div
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
        width: '100%',
        boxSizing: 'border-box',
        minWidth: 0
      }}
    >
      {/* 지수 정보 스켈레톤 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          width: '100%',
          maxWidth: '72px',
          minWidth: 0
        }}
      >
        {/* 지수 이름 스켈레톤 */}
        <div
          style={{
            width: '100%',
            height: '18px',
            backgroundColor: '#E6E7EA',
            borderRadius: '4px',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        />

        {/* 지수 값 스켈레톤 */}
        <div
          style={{
            width: '90%',
            height: '24px',
            backgroundColor: '#E6E7EA',
            borderRadius: '4px',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: '0.1s'
          }}
        />

        {/* 변동률 스켈레톤 */}
        <div
          style={{
            width: '70%',
            height: '18px',
            backgroundColor: '#E6E7EA',
            borderRadius: '4px',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: '0.2s'
          }}
        />
      </div>

      {/* 차트 스켈레톤 */}
      <div
        style={{
          width: '100%',
          maxWidth: '60px',
          height: '46px',
          backgroundColor: '#E6E7EA',
          borderRadius: '4px',
          flexShrink: 0,
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.3s'
        }}
      />

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