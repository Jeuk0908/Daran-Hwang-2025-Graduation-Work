import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { RebalanceInfoCard } from '../../components/common/RebalanceInfoCard';
import RebalanceETFCard from '../../components/common/RebalanceETFCard';
import { Button } from '../../components/common/Button';
import { LAYOUT } from '../../constants/layout';
import { getPortfolioETFs } from '../../utils/portfolioStorage';

// Mock 데이터
const REBALANCE_DATA = {
  1: {
    portfolioName: '미국 빅테크 배당금',
    totalValue: '123,345,677',
    netProfit: '123,345,677',
    targetProfit: '150,000,000', // 목표 수익
    changeRate: '5',
    needsRebalance: true,
    etfs: [
      {
        id: 1,
        title: '2차 전지 TIGER x2',
        targetWeight: '10',
        currentWeight: '15',
        adjustedWeight: '10',
        shares: '2',
        actionType: 'buy',
        actionShares: '3',
        actionText: '3주를 매수 할께요',
        pricePerShare: '123,456,789',
        totalAmount: '123,456,789'
      },
      {
        id: 2,
        title: '테슬라 ETF',
        targetWeight: '15',
        currentWeight: '20',
        adjustedWeight: '15',
        shares: '5',
        actionType: 'sell',
        actionShares: '6',
        actionText: '6주를 매도할께요',
        pricePerShare: '98,765,432',
        totalAmount: '98,765,432'
      },
      {
        id: 3,
        title: 'NASDAQ 100',
        targetWeight: '25',
        currentWeight: '25',
        adjustedWeight: '25',
        shares: '10',
        actionType: 'none',
        actionShares: '0',
        actionText: '조정하지 않아도 괜찮아요!',
        pricePerShare: '87,654,321',
        totalAmount: '87,654,321'
      },
      {
        id: 4,
        title: 'S&P 500',
        targetWeight: '50',
        currentWeight: '40',
        adjustedWeight: '50',
        shares: '20',
        actionType: 'sell',
        actionShares: '8',
        actionText: '8주를 매도할께요',
        pricePerShare: '76,543,210',
        totalAmount: '76,543,210'
      }
    ]
  }
};

const Rebalance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProfitMode, setIsProfitMode] = useState(true); // 순 수익 모드 (true) vs 목표까지 모드 (false)
  const [rebalanceData, setRebalanceData] = useState(REBALANCE_DATA[id] || REBALANCE_DATA[1]);

  // localStorage에서 ETF 목록 불러오기
  useEffect(() => {
    const savedETFs = getPortfolioETFs(id);
    if (savedETFs) {
      // 저장된 ETF 목록이 있으면 rebalanceData 업데이트
      setRebalanceData(prev => ({
        ...prev,
        etfs: savedETFs
      }));
    }
  }, [id]);

  // ETF 최대 개수 체크 (최대 5개)
  const isMaxETFs = rebalanceData.etfs.length >= 5;

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddProduct = () => {
    // 이미 5개 이상이면 추가 불가
    if (isMaxETFs) return;

    // ETF 추가 페이지로 이동 (현재 ETF 개수 및 목록 전달)
    navigate(`/portfolio/${id}/rebalance/add-etf`, {
      state: {
        currentETFCount: rebalanceData.etfs.length,
        portfolioId: id,
        existingETFs: rebalanceData.etfs.map(etf => ({
          id: etf.id,
          name: etf.title,
          code: etf.id.toString(),
          price: etf.pricePerShare,
          change: '0',
          direction: 'up',
          targetWeight: parseInt(etf.targetWeight) // 기존 비중 정보 전달
        }))
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF'
      }}
    >
      {/* Top Navigation */}
      <TopNav
        title="리밸런싱"
        depth="2"
        state="icon"
        showBackButton={true}
        showIconL={false}
        showIconR={false}
        onBackClick={handleBack}
      />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingTop: '12px',
          paddingBottom: '140px' // 하단 고정 영역 전체 높이 (캡션 + 버튼 + Home Indicator)
        }}
      >
        {/* 포트폴리오 정보 섹션 */}
        <div
          style={{
            padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
            paddingBottom: '12px'
          }}
        >
          <RebalanceInfoCard
            title={rebalanceData.portfolioName}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
            totalValue={rebalanceData.totalValue}
            netProfit={rebalanceData.netProfit}
            targetProfit={rebalanceData.targetProfit}
            isProfitMode={isProfitMode}
            onProfitModeToggle={() => setIsProfitMode(!isProfitMode)}
            changeRate={rebalanceData.changeRate}
            needsRebalance={rebalanceData.needsRebalance}
            rebalanceReason="리밸런싱을 통해 하락에 대비할 수 있어요."
          />
        </div>

        {/* ETF 리밸런싱 카드 리스트 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '11px',
            padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`
          }}
        >
          {rebalanceData.etfs.map((etf) => (
            <RebalanceETFCard
              key={etf.id}
              title={etf.title}
              targetWeight={etf.targetWeight}
              currentWeight={etf.currentWeight}
              adjustedWeight={etf.adjustedWeight}
              shares={etf.shares}
              actionType={etf.actionType}
              actionShares={etf.actionShares}
              actionText={etf.actionText}
              pricePerShare={etf.pricePerShare}
              totalAmount={etf.totalAmount}
              variant="default"
            />
          ))}
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '430px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* 캡션 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `4px ${LAYOUT.HORIZONTAL_PADDING}px 0`
          }}
        >
          <p
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#5E6573',
              textAlign: 'center',
              margin: 0
            }}
          >
            {isMaxETFs
              ? '포트폴리오에 최대 5개의 상품까지 담을 수 있어요.'
              : '목표 비중의 합계는 100%가 되어야 해요.'}
          </p>
        </div>

        {/* 버튼 */}
        <div
          style={{
            padding: `12px ${LAYOUT.HORIZONTAL_PADDING}px`,
            paddingBottom: '12px'
          }}
        >
          <Button
            variant={isMaxETFs ? 'grey' : 'primary'}
            fullWidth={true}
            onClick={handleAddProduct}
            disabled={isMaxETFs}
          >
            상품 추가하기
          </Button>
        </div>

        {/* Home Indicator */}
        <div
          style={{
            height: '34px',
            background: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '8px'
          }}
        >
          <div
            style={{
              width: '134px',
              height: '5px',
              backgroundColor: '#000000',
              borderRadius: '100px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Rebalance;