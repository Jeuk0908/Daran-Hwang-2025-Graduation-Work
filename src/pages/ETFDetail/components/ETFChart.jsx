import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

/**
 * ETF 차트 컴포넌트 (recharts 사용)
 *
 * @param {Object} props
 * @param {Array<Object>} props.data - 차트 데이터 [{date, close, nav, index}, ...]
 * @param {number} props.height - 차트 높이 (기본값: 180)
 */
export const ETFChart = ({
  data = [],
  height = 180,
  period = '1D'
}) => {
  // 데이터가 없으면 빈 상태 표시
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F7F7F8',
          borderRadius: '12px'
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
          차트 데이터가 없습니다
        </p>
      </div>
    );
  }

  // 이동평균 스무딩 함수
  const applySmoothingToData = (data, windowSize) => {
    if (!data || data.length < windowSize) return data;

    return data.map((item, index) => {
      // 윈도우 범위 계산
      const start = Math.max(0, index - Math.floor(windowSize / 2));
      const end = Math.min(data.length, index + Math.ceil(windowSize / 2));
      const window = data.slice(start, end);

      // 각 수치의 평균 계산
      const avgClose = window.reduce((sum, d) => sum + d.close, 0) / window.length;
      const avgNav = window.reduce((sum, d) => sum + d.nav, 0) / window.length;
      const avgIndex = window.reduce((sum, d) => sum + d.index, 0) / window.length;

      return {
        ...item,
        close: Math.round(avgClose),
        nav: Math.round(avgNav),
        index: Math.round(avgIndex)
      };
    });
  };

  // 기간별 스무딩 적용 (1Y, MAX는 더 강한 스무딩)
  const getSmoothedData = () => {
    if (period === 'MAX') {
      return applySmoothingToData(data, 9); // 9-포인트 이동평균
    } else if (period === '1Y') {
      return applySmoothingToData(data, 7); // 7-포인트 이동평균
    }
    return data; // 다른 기간은 원본 데이터 사용
  };

  const smoothedData = getSmoothedData();

  // Y축 범위 계산 (스무딩된 데이터의 최소/최대값 기준)
  const allValues = smoothedData.flatMap(d => [d.close, d.nav, d.index]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const padding = (maxValue - minValue) * 0.1; // 10% 여유
  const yAxisDomain = [
    Math.floor(minValue - padding),
    Math.ceil(maxValue + padding)
  ];

  // 기간별 X축 틱 간격 설정
  const getTickInterval = () => {
    switch (period) {
      case '1D':
        return Math.floor(smoothedData.length / 6); // 약 4시간 간격
      case '1M':
        return Math.floor(smoothedData.length / 6); // 약 5일 간격
      case '3M':
        return Math.floor(smoothedData.length / 6); // 약 15일 간격
      case '6M':
        return Math.floor(smoothedData.length / 6); // 약 30일 간격
      case '1Y':
        return Math.floor(smoothedData.length / 6); // 약 2개월 간격
      case 'MAX':
        return Math.floor(smoothedData.length / 6); // 약 4개월 간격
      default:
        return Math.floor(smoothedData.length / 6);
    }
  };

  // 기간별 곡선 타입 설정 (3M 이상은 부드러운 곡선)
  const getCurveType = () => {
    return ['3M', '6M', '1Y', 'MAX'].includes(period) ? 'basis' : 'monotone';
  };

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #E6E7EA',
            borderRadius: '8px',
            padding: '8px 12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              color: '#1A1C20',
              margin: '0 0 4px 0'
            }}
          >
            {payload[0].payload.date}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                color: entry.color,
                margin: '2px 0'
              }}
            >
              {entry.name}: {entry.value.toLocaleString('ko-KR')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={smoothedData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          {/* 그리드 */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#F7F7F8"
            vertical={false}
          />

          {/* X축 */}
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 10,
              fill: '#ADB2BD'
            }}
            interval={getTickInterval()}
            minTickGap={30}
          />

          {/* Y축 */}
          <YAxis
            domain={yAxisDomain}
            axisLine={false}
            tickLine={false}
            tick={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 10,
              fill: '#ADB2BD'
            }}
            tickFormatter={(value) => value.toLocaleString('ko-KR')}
          />

          {/* 툴팁 */}
          <Tooltip content={<CustomTooltip />} />

          {/* 그라디언트 정의 */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0092FF" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#B3DBFF" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          {/* Area (종가와 NAV 사이) */}
          <Area
            type={getCurveType()}
            dataKey="close"
            fill="url(#areaGradient)"
            stroke="none"
            animationDuration={300}
            isAnimationActive={true}
          />

          {/* 라인들 */}
          <Line
            type={getCurveType()}
            dataKey="close"
            stroke="#0092FF"
            strokeWidth={2}
            dot={false}
            name="종가"
            animationDuration={300}
            isAnimationActive={true}
          />
          <Line
            type={getCurveType()}
            dataKey="nav"
            stroke="#FB7D1D"
            strokeWidth={2}
            dot={false}
            name="기준가격"
            animationDuration={300}
            isAnimationActive={true}
          />
          <Line
            type={getCurveType()}
            dataKey="index"
            stroke="#4AD944"
            strokeWidth={2}
            dot={false}
            name="기초지수"
            animationDuration={300}
            isAnimationActive={true}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
