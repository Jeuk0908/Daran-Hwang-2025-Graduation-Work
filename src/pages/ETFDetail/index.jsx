import { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { SubNav } from '../../components/common/SubNav';
import { Chip } from '../../components/common/Chip';
import { SmallToggle } from '../../components/common/ToggleButton';
import { TermModal } from '../../components/common/TermModal';
import { ETFInfoCard } from './components/ETFInfoCard';
import { ETFChart } from './components/ETFChart';
import { ETFReturnsTable } from './components/ETFReturnsTable';
import { PeriodFilter } from './components/PeriodFilter';
import { ChartLegend } from './components/ChartLegend';
import { InfoSection } from './components/InfoSection';
import { BasicInfoTab } from './components/BasicInfoTab';
import { CompositionTab } from './components/CompositionTab';
import { DividendTab } from './components/DividendTab';
import { getETFData } from './data/mockData';
import { isETFBookmarked, toggleETFBookmark, addETFSearchHistory } from '../../utils/etfStorage';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import iconSearch from '../../assets/icon_search.svg';
import iconHeartFill from '../../assets/icon_heart_fill.svg';
import iconHeartOutline from '../../assets/icon_heart_outline.svg';
import termCurrentPrice from '../../assets/LargeVocabularyCard/단어장 해금/용어백과 설명.svg';
import termNav from '../../assets/LargeVocabularyCard/단어장 해금/용어백과 설명-14.svg';
import termAssets from '../../assets/LargeVocabularyCard/단어장 해금/용어백과 설명-12.svg';
import termVolume from '../../assets/LargeVocabularyCard/단어장 해금/용어백과 설명-18.svg';

const ETFDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);

  // 상태 관리
  const [activeTab, setActiveTab] = useState('returns');
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showChartTable, setShowChartTable] = useState(false);
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [termModalImage, setTermModalImage] = useState('');

  // ETF 데이터 가져오기
  const etfData = getETFData(id);

  // 페이지 진입 시 스크롤 맨 위로 이동 (useLayoutEffect로 동기적으로 실행)
  useLayoutEffect(() => {
    // 여러 방법으로 스크롤 초기화
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 추가 보험으로 약간의 지연 후 다시 초기화
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);

    return () => clearTimeout(timer);
  }, [id]);

  // 컴포넌트 마운트 시 즐겨찾기 상태 확인 및 최근 본 상품에 추가
  useEffect(() => {
    if (id) {
      setIsBookmarked(isETFBookmarked(id));
      // 최근 본 상품에 추가 (localStorage에 저장)
      addRecentViewedETF(id);
    }
  }, [id]);


  // 최근 본 상품에 추가하는 함수
  const addRecentViewedETF = (etfId) => {
    try {
      const stored = localStorage.getItem('recentViewedETFs');
      let recentETFs = stored ? JSON.parse(stored) : [];

      // 이미 있는 경우 제거 (최신 순으로 정렬하기 위해)
      recentETFs = recentETFs.filter(id => id !== etfId);

      // 맨 앞에 추가
      recentETFs.unshift(etfId);

      // 최대 10개까지만 저장
      recentETFs = recentETFs.slice(0, 10);

      localStorage.setItem('recentViewedETFs', JSON.stringify(recentETFs));
    } catch (error) {
      console.error('최근 본 상품 저장 실패:', error);
    }
  };

  // ETF 데이터가 없으면 404 처리
  if (!etfData) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#1A1C20',
              margin: '0 0 8px 0'
            }}
          >
            ETF를 찾을 수 없습니다
          </p>
          <button
            onClick={() => navigate(-1)}
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#3490FF',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px'
            }}
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 핸들러 함수들
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSearchClick = () => {
    // 검색 히스토리 저장
    addETFSearchHistory(etfData.id, etfData.name);
    console.log('검색 클릭:', etfData.name);
    // TODO: 검색 페이지로 이동 또는 검색 모달 열기
    // navigate('/search');
  };

  const handleToggleBookmark = () => {
    const newState = toggleETFBookmark(id);
    setIsBookmarked(newState);
  };

  // 용어 설명 모달 열기
  const handleOpenTermModal = (imageSrc) => {
    setTermModalImage(imageSrc);
    setIsTermModalOpen(true);
  };

  // 용어 설명 모달 닫기
  const handleCloseTermModal = () => {
    setIsTermModalOpen(false);
  };

  // 포트폴리오 태그 생성
  const getPortfolioTags = () => {
    return [`#${etfData.basicInfo?.manager || '운용사'}`, `#${etfData.strategy?.title?.split(' - ')[0] || '전략'}`];
  };

  // 차트 데이터로부터 수익률 계산
  const calculateReturns = (chartData) => {
    if (!chartData || chartData.length === 0) return null;

    const firstData = chartData[0];
    const lastData = chartData[chartData.length - 1];

    const closeReturn = ((lastData.close - firstData.close) / firstData.close) * 100;
    const navReturn = ((lastData.nav - firstData.nav) / firstData.nav) * 100;
    const indexReturn = ((lastData.index - firstData.index) / firstData.index) * 100;

    return {
      close: parseFloat(closeReturn.toFixed(2)),
      nav: parseFloat(navReturn.toFixed(2)),
      index: parseFloat(indexReturn.toFixed(2))
    };
  };

  // 표 데이터 생성
  const getTableData = () => {
    const periods = ['1M', '3M', '6M', '1Y', '3Y', '5Y'];
    const returns = {
      close: [],
      nav: [],
      index: []
    };

    periods.forEach(period => {
      const chartData = etfData.chartData[period];
      if (chartData && chartData.length > 0) {
        const periodReturns = calculateReturns(chartData);
        returns.close.push(periodReturns.close);
        returns.nav.push(periodReturns.nav);
        returns.index.push(periodReturns.index);
      } else {
        returns.close.push(null);
        returns.nav.push(null);
        returns.index.push(null);
      }
    });

    // MAX (상장이후) 데이터 추가
    const maxData = etfData.chartData['MAX'];
    if (maxData && maxData.length > 0) {
      const maxReturns = calculateReturns(maxData);
      returns.close.push(maxReturns.close);
      returns.nav.push(maxReturns.nav);
      returns.index.push(maxReturns.index);
    } else {
      returns.close.push(null);
      returns.nav.push(null);
      returns.index.push(null);
    }

    return returns;
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        paddingBottom: `${LAYOUT.BOTTOM_NAV_HEIGHT}px`,
        position: 'relative'
      }}
    >
      {/* TopNav */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#FFFFFF',
          boxShadow: hasScrolled ? '0 2px 8px 0 rgba(0, 0, 0, 0.04)' : 'none',
          transition: 'box-shadow 0.2s ease'
        }}
      >
        <TopNav
          title=""
          depth="2"
          state="icon"
          showBackButton={true}
          showIconL={true}
          showIconR={true}
          iconL={iconSearch}
          iconR={isBookmarked ? iconHeartFill : iconHeartOutline}
          onBackClick={handleBackClick}
          onIconLClick={handleSearchClick}
          onIconRClick={handleToggleBookmark}
        />
      </div>

      {/* Main Content */}
      <div
        style={{
          padding: `0px ${LAYOUT.HORIZONTAL_PADDING}px 0`,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px'
        }}
      >
        {/* ETF 기본 정보 섹션 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {/* 코드 + 이름 */}
          <div>
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: 1.35,
                color: '#474C57',
                margin: '0 0 4px 0'
              }}
            >
              {etfData.code}
            </p>
            <p
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1.25,
                color: '#000000',
                margin: 0
              }}
            >
              {etfData.name}
            </p>
          </div>
        </div>

        {/* 가격 정보 카드 그리드 + 전략 설명 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {/* 첫 번째 행: 현재가, 기준가 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px'
            }}
          >
            <ETFInfoCard
              title="현재가"
              value={etfData.currentPrice.toLocaleString('ko-KR')}
              unit="원"
              changePercent={etfData.changePercent.toString()}
              changeDirection={etfData.changeDirection}
              description="현재 상품의 가격"
              variant="emphasis"
            />
            <ETFInfoCard
              title="기준가(iNAV)"
              value={etfData.nav.toLocaleString('ko-KR')}
              unit="원"
              changePercent={Math.abs(etfData.navChangePercent).toString()}
              changeDirection={etfData.navChangeDirection}
              description="현재가보다 클 수록 저렴"
              variant="emphasis"
              chipColor="down2"
              onInfoClick={() => handleOpenTermModal(termNav)}
            />
          </div>

          {/* 두 번째 행: 순자산 규모, 거래량 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px'
            }}
          >
            <ETFInfoCard
              title="순자산 규모"
              value={etfData.basicInfo.totalAssetsFormatted}
              unit="원"
              description="규모가 클 수록 안정+믿음"
              variant="normal"
              onInfoClick={() => handleOpenTermModal(termAssets)}
            />
            <ETFInfoCard
              title="거래량"
              value={etfData.basicInfo.volumeFormatted}
              unit="주"
              description="시장에서 얼마나 활발 거래"
              variant="normal"
              onInfoClick={() => handleOpenTermModal(termVolume)}
            />
          </div>

          {/* 전략 설명 */}
          {etfData.strategy && (
            <div
              style={{
                backgroundColor: '#F7F7F8',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: 'flex-start'
              }}
            >
              <Chip
                title={etfData.strategy.title}
                color="grey"
                state="select"
                size="small"
              />
              <p
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: '#474C57',
                  margin: 0
                }}
              >
                {etfData.strategy.description.split(/\{([^}]+)\}/).map((part, index) =>
                  index % 2 === 1 ? (
                    <span key={index} style={{ color: etfData.strategy.highlightColor || '#3490FF' }}>
                      {part}
                    </span>
                  ) : (
                    part
                  )
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SubNav (Sticky) */}
      <div
        style={{
          position: 'sticky',
          top: '50px',
          zIndex: 99,
          backgroundColor: '#FFFFFF',
          marginTop: '30px',
          paddingBottom: '20px'
        }}
      >
        <SubNav
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId)}
        />
      </div>

      {/* 탭별 컨텐츠 */}
      <div style={{ width: '100%' }}>
        {/* 수익률 탭 */}
        {activeTab === 'returns' && (
          <div
            style={{
              padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {/* 제목 + 차트/표 토글 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <h3
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: '#000000',
                  margin: 0
                }}
              >
                {showChartTable ? '수익률 표' : '수익률 차트'}
              </h3>

              {/* 차트/표 토글 */}
              <div
                style={{
                  backgroundColor: '#FAFCFF',
                  borderRadius: '12px',
                  padding: '12px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  height: '40px'
                }}
              >
                <p
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#30343B',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {showChartTable ? '차트로 보기' : '표로 보기'}
                </p>
                <SmallToggle
                  checked={showChartTable}
                  onChange={() => setShowChartTable(!showChartTable)}
                />
              </div>
            </div>

            {/* 차트 또는 표 */}
            {showChartTable ? (
              /* 표 */
              <ETFReturnsTable
                data={getTableData()}
                periods={['1M', '3M', '6M', '1Y', '3Y', '5Y', '상장이후']}
              />
            ) : (
              /* 차트 */
              <>
                <ETFChart
                  data={etfData.chartData[selectedPeriod]}
                  height={180}
                  period={selectedPeriod}
                />

                {/* 범례 */}
                <ChartLegend />

                {/* 기준일 필터 */}
                <PeriodFilter
                  selectedPeriod={selectedPeriod}
                  onPeriodChange={(period) => setSelectedPeriod(period)}
                />
              </>
            )}

            {/* 정보 섹션 (차트 보기일 때만 표시) */}
            {!showChartTable && (
              <InfoSection
                items={[
                  {
                    chipTitle: '종가 선이 NAV 선 위에 있을 때',
                    chipColor: 'upTrend',
                    description: '시장에서 거래된 가격이 ETF의 {진짜 가치보다 더 높다}는 뜻'
                  },
                  {
                    chipTitle: '종가 선이 NAV 선 아래에 있을 때',
                    chipColor: 'downTrend',
                    description: '시장에서 거래된 가격이 ETF의 {진짜 가치보다 더 낮았다}는 뜻'
                  }
                ]}
                footnote={`기준가격은 분배금 재투자를 가정한 세전 수익률 기준입니다.\n시장가격은 분배금을 제외한 가격 기준으로 작성되었습니다.`}
              />
            )}
          </div>
        )}

        {/* 기본정보 탭 */}
        {activeTab === 'info' && (
          <BasicInfoTab data={etfData} />
        )}

        {/* 구성종목 탭 */}
        {activeTab === 'composition' && (
          <CompositionTab holdings={etfData.holdings} />
        )}

        {/* 배당 탭 */}
        {activeTab === 'dividend' && (
          <DividendTab dividends={etfData.dividends} />
        )}
      </div>

      {/* 용어 설명 모달 */}
      <TermModal
        isOpen={isTermModalOpen}
        onClose={handleCloseTermModal}
        imageSrc={termModalImage}
      />
    </div>
  );
};

export default ETFDetail;
