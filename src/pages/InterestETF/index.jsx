import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { Chip } from '../../components/common/Chip';
import { SimpleChartViewer } from '../../components/common/SimpleChartViewer';
import { LAYOUT } from '../../constants/layout';
import { getAllETFs } from '../ETFDetail/data/mockData';

const InterestETFPage = () => {
  const navigate = useNavigate();
  const [activeChip, setActiveChip] = useState('오늘 인기');
  const [popularTrend, setPopularTrend] = useState('up');
  const [volumeTrend, setVolumeTrend] = useState('up');

  // 모든 ETF 데이터 가져오기
  const allETFs = getAllETFs();

  // ETF 데이터를 SimpleChartViewer 형식으로 변환
  const convertETFToViewerFormat = (etf, rank) => {
    const navDiff = etf.nav - etf.currentPrice;
    const navDiffPercent = Math.abs((navDiff / etf.currentPrice) * 100).toFixed(1);
    const isExpensive = navDiff < 0;

    return {
      id: etf.id,
      rank,
      name: etf.name,
      code: etf.code,
      priceComparisonText: '실시간 가치보다',
      priceComparisonValue: navDiffPercent,
      priceComparisonDirection: isExpensive ? 'down' : 'up',
      priceComparisonLabel: isExpensive ? '비싸요' : '저렴해요',
      currentPrice: etf.currentPrice.toLocaleString('ko-KR'),
      changePercent: Math.abs(etf.changePercent).toFixed(2),
      changeDirection: etf.changeDirection
    };
  };

  // 인기 기준으로 정렬 (상승/하락 필터링)
  const getPopularETFs = (direction) => {
    return allETFs
      .filter(etf => etf.changeDirection === direction)
      .sort((a, b) => b.popularity - a.popularity)
      .map((etf, index) => convertETFToViewerFormat(etf, index + 1));
  };

  // 거래량 기준으로 정렬 (상승/하락 필터링)
  const getVolumeETFs = (direction) => {
    return allETFs
      .filter(etf => etf.changeDirection === direction)
      .sort((a, b) => b.volume - a.volume)
      .map((etf, index) => convertETFToViewerFormat(etf, index + 1));
  };

  // 표시할 ETF 목록 선택
  const etfList = activeChip === '오늘 인기'
    ? getPopularETFs(popularTrend)
    : getVolumeETFs(volumeTrend);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}
    >
      {/* TopNav */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF'
        }}
      >
        <TopNav
          title="관심 ETF"
          depth="2"
          state="icon"
          showBackButton={true}
          showTitle={true}
          showIconL={false}
          showIconR={false}
          onBackClick={() => navigate(-1)}
        />
      </div>

      {/* Filter Chips */}
      <div
        style={{
          padding: `15px ${LAYOUT.HORIZONTAL_PADDING}px`,
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#FFFFFF'
        }}
      >
        <Chip
          title="오늘 인기"
          color={activeChip === '오늘 인기' ? (popularTrend === 'up' ? 'upTrend' : 'downTrend') : 'default'}
          state={activeChip === '오늘 인기' ? 'select' : 'nonSelect'}
          showIcon={activeChip === '오늘 인기'}
          onClick={() => {
            if (activeChip === '오늘 인기') {
              setPopularTrend(popularTrend === 'up' ? 'down' : 'up');
            } else {
              setPopularTrend('up');
              setActiveChip('오늘 인기');
            }
          }}
        />
        <Chip
          title="거래량"
          color={activeChip === '거래량' ? (volumeTrend === 'up' ? 'upTrend' : 'downTrend') : 'default'}
          state={activeChip === '거래량' ? 'select' : 'nonSelect'}
          showIcon={activeChip === '거래량'}
          onClick={() => {
            if (activeChip === '거래량') {
              setVolumeTrend(volumeTrend === 'up' ? 'down' : 'up');
            } else {
              setVolumeTrend('up');
              setActiveChip('거래량');
            }
          }}
        />
      </div>

      {/* ETF List */}
      <div
        style={{
          padding: `${LAYOUT.GRID_GAP.ROW}px ${LAYOUT.HORIZONTAL_PADDING}px 45px`,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%'
        }}
      >
        {etfList.map((etf, idx) => (
          <SimpleChartViewer
            key={etf.id || idx}
            rank={etf.rank}
            name={etf.name}
            priceComparisonText={etf.priceComparisonText}
            priceComparisonValue={etf.priceComparisonValue}
            priceComparisonDirection={etf.priceComparisonDirection}
            priceComparisonLabel={etf.priceComparisonLabel}
            currentPrice={etf.currentPrice}
            changePercent={etf.changePercent}
            changeDirection={etf.changeDirection}
            onClick={() => navigate(`/etf/${etf.id}/detail`)}
          />
        ))}
      </div>
    </div>
  );
};

export default InterestETFPage;
