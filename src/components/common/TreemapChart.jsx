import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

/**
 * TreemapChart - 미국 주식 앱 스타일의 트리맵 차트 컴포넌트
 *
 * @param {Object} props
 * @param {Array<Object>} props.data - 트리맵 데이터 (holdings 배열)
 * @param {number} props.height - 차트 높이 (기본값: 300)
 * @param {Object} props.selectedStock - 선택된 주식 객체
 * @param {function} props.onSelectStock - 주식 선택 시 호출되는 콜백 함수
 */
export const TreemapChart = ({ data = [], height = 300, selectedStock = null, onSelectStock = () => {} }) => {
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          backgroundColor: '#F7F7F8',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#ADB2BD',
            margin: 0
          }}
        >
          구성종목 데이터가 없습니다
        </p>
      </div>
    );
  }

  // holdings 데이터를 recharts treemap 형식으로 변환
  const treemapData = {
    name: 'holdings',
    children: data.map((holding) => ({
      name: holding.name, // 종목명 사용 (ticker 대신)
      ticker: holding.ticker,
      size: holding.weight,
      change: holding.change,
      changeDirection: holding.changeDirection,
      weight: holding.weight,
      originalData: holding // 원본 데이터 참조
    }))
  };

  // 트리맵 셀 커스텀 렌더링
  const CustomizedContent = (props) => {
    const { x, y, width, height, name, payload, ...rest } = props;

    // 데이터 추출 (여러 가능성 확인)
    const weight = payload?.weight || rest?.weight || payload?.size || rest?.size || 0;
    const change = payload?.change || rest?.change || 0;
    const changeDirection = payload?.changeDirection || rest?.changeDirection || 'up';
    const originalData = payload?.originalData || rest?.originalData;

    // 등락 방향에 따른 색상 결정 (상승/하락 2가지)
    const isUp = changeDirection === 'up';
    const baseColor = isUp ? '#7BA8CC' : '#D4A574';

    // 선택 여부 확인
    const isSelected = selectedStock && selectedStock.ticker === (originalData?.ticker || rest?.ticker);

    // 선택된 항목은 밝게, 선택되지 않은 항목은 약간 투명하게
    const backgroundColor = isSelected ? baseColor : baseColor + 'B3'; // B3 = 70% opacity
    const strokeColor = '#FFFFFF'; // 테두리는 모두 동일

    // 클릭 핸들러
    const handleClick = () => {
      if (originalData) {
        onSelectStock(originalData);
      }
    };

    // 폰트 크기 동적 조정 (작은 영역도 표시되도록 최소값 낮춤)
    const fontSize = Math.min(Math.max(width / 7, 7), 14);

    // 텍스트 표시 조건 완화 (최소 크기 낮춤)
    const renderText = width >= 25 && height >= 20 && fontSize >= 7;

    // 텍스트 길이 제한 (영역 너비에 맞게 말줄임표 처리)
    const getDisplayName = (text, maxWidth, fontSize) => {
      if (!text) return '';

      // 대략적인 문자당 너비 계산 (한글: fontSize * 0.9, 영문/숫자: fontSize * 0.6)
      const charWidth = fontSize * 0.9;
      const maxChars = Math.floor((maxWidth - 10) / charWidth); // 여백 10px

      if (text.length <= maxChars) {
        return text;
      }

      // 말줄임표 처리
      return text.substring(0, Math.max(1, maxChars - 1)) + '...';
    };

    const displayName = getDisplayName(name, width, fontSize);

    return (
      <g>
        {/* 배경 사각형 */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          onClick={handleClick}
          style={{
            fill: backgroundColor,
            stroke: strokeColor,
            strokeWidth: isSelected ? 4 : 3,
            cursor: 'pointer'
          }}
        />

        {/* 종목명만 표시 (말줄임표 처리) */}
        {renderText && displayName && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            onClick={handleClick}
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: `${fontSize}px`,
              fontWeight: 700,
              fill: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
              stroke: 'rgba(0, 0, 0, 0.3)',
              strokeWidth: 0.5,
              paintOrder: 'stroke fill',
              cursor: 'pointer',
              pointerEvents: 'none'
            }}
          >
            {displayName}
          </text>
        )}
      </g>
    );
  };

  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`,
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '1px 2px 13.6px 0px rgba(0, 0, 0, 0.1)'
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={treemapData.children}
          dataKey="size"
          stroke="#FFFFFF"
          strokeWidth={3}
          content={(props) => <CustomizedContent {...props} />}
          isAnimationActive={false}
        />
      </ResponsiveContainer>
    </div>
  );
};
