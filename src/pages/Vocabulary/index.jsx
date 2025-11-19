import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { SearchBar } from '../../components/common/SearchBar';
import { Chip } from '../../components/common/Chip';
import VocabularyCard from '../../components/common/VocabularyCard';
import { LAYOUT } from '../../constants/layout';
import { useScrollShadow } from '../../hooks/useScrollShadow';
import { isActiveMission } from '../../utils/missionStorage';
import { MissionCompleteModal } from '../../components/common/MissionCompleteModal';
import { VocabularyDetailModal } from '../../components/common/VocabularyDetailModal';

// ETF 용어 아이콘 import
import etfIcon from '../../assets/ETF_24.svg';
import etfDisabledIcon from '../../assets/비활성화 아이콘/ETF_비활성화.svg';
import terIcon from '../../assets/TER_24.svg';
import terDisabledIcon from '../../assets/비활성화 아이콘/TER_비활성화.svg';
import navIcon from '../../assets/NAV_24.svg';
import navDisabledIcon from '../../assets/비활성화 아이콘/NAV_비활성화.svg';
import indexIcon from '../../assets/인덱스_24.svg';
import indexDisabledIcon from '../../assets/비활성화 아이콘/인덱스_비활성화.svg';
import marketCapIcon from '../../assets/시가총액_24.svg';
import marketCapDisabledIcon from '../../assets/비활성화 아이콘/시가총액_비활성화.svg';
import feeIcon from '../../assets/총보수_24.svg';
import feeDisabledIcon from '../../assets/비활성화 아이콘/총보수_비활성화.svg';
import deviationIcon from '../../assets/괴리율_24.svg';
import deviationDisabledIcon from '../../assets/비활성화 아이콘/괴리율_비활성화.svg';
import volumeIcon from '../../assets/거래량_24.svg';
import volumeDisabledIcon from '../../assets/비활성화 아이콘/거래량_비활성화.svg';
import dividendIcon from '../../assets/분배금_24.svg';
import dividendDisabledIcon from '../../assets/비활성화 아이콘/분배금_비활성화.svg';
import swapIcon from '../../assets/스왑_24.svg';
import swapDisabledIcon from '../../assets/비활성화 아이콘/스왑_비활성화.svg';
import underlyingAssetIcon from '../../assets/기초자산_24.svg';
import underlyingAssetDisabledIcon from '../../assets/비활성화 아이콘/기초자산_비활성화.svg';
import dividendReinvestIcon from '../../assets/분배금 재투자_24.svg';
import dividendReinvestDisabledIcon from '../../assets/비활성화 아이콘/분배금 재투자_비활성화.svg';
import underlyingIndexIcon from '../../assets/기초지수_24.svg';
import underlyingIndexDisabledIcon from '../../assets/비활성화 아이콘/기초지수_비활성화.svg';
import tradingValueIcon from '../../assets/거래대금_24.svg';
import tradingValueDisabledIcon from '../../assets/비활성화 아이콘/거래대금_비활성화.svg';
import trackingErrorIcon from '../../assets/추적오차_24.svg';
import trackingErrorDisabledIcon from '../../assets/비활성화 아이콘/추적오차_비활성화.svg';
import netAssetIcon from '../../assets/순자산_24.svg';
import netAssetDisabledIcon from '../../assets/비활성화 아이콘/순자산_비활성화.svg';
import cashDividendIcon from '../../assets/현금배당_24.svg';
import cashDividendDisabledIcon from '../../assets/비활성화 아이콘/현금배당_비활성화.svg';
import rebalancingIcon from '../../assets/리밸런싱_24.svg';
import rebalancingDisabledIcon from '../../assets/비활성화 아이콘/리밸런싱_비활성화.svg';
import syntheticIcon from '../../assets/운용방식-합성_24.svg';
import syntheticDisabledIcon from '../../assets/비활성화 아이콘/운용방식-합성_비활성화.svg';
import physicalIcon from '../../assets/운용방식 - 실물_24.svg';
import physicalDisabledIcon from '../../assets/비활성화 아이콘/운용방식 - 실물_비활성화.svg';
import leverageIcon from '../../assets/레버리지_24.svg';
import leverageDisabledIcon from '../../assets/비활성화 아이콘/레버리지_비활성화.svg';

const Vocabulary = () => {
  const navigate = useNavigate();
  const hasScrolled = useScrollShadow(0);
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('전체');
  const [sortOrder, setSortOrder] = useState('recent'); // 'recent' | 'oldest'
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [missionTimer, setMissionTimer] = useState(null);
  const [countdown, setCountdown] = useState(null);

  // 용어 데이터 (각 열에 활성화/비활성화 카드가 섞여 있음)
  // 짝수 인덱스(0,2,4...) = 1열, 홀수 인덱스(1,3,5...) = 2열
  const allVocabularyData = [
    // 1행
    {
      id: 1,
      icon: etfIcon,
      disabledIcon: etfDisabledIcon,
      isLocked: false,
      title: 'ETF',
      description: 'ETF는 Exchange Traded Fund의 약자로 주식처럼 거래되는 펀드입니다.'
    },
    {
      id: 2,
      icon: terIcon,
      disabledIcon: terDisabledIcon,
      isLocked: true,
      title: 'TER',
      description: ''
    },
    // 2행
    {
      id: 4,
      icon: indexIcon,
      disabledIcon: indexDisabledIcon,
      isLocked: true,
      title: '인덱스',
      description: ''
    },
    {
      id: 3,
      icon: navIcon,
      disabledIcon: navDisabledIcon,
      isLocked: false,
      title: 'NAV',
      description: 'NAV는 펀드의 순자산 가치를 의미합니다.'
    },
    // 3행
    {
      id: 5,
      icon: marketCapIcon,
      disabledIcon: marketCapDisabledIcon,
      isLocked: true,
      title: '시가총액',
      description: '시가총액은 기업의 총 가치를 나타내는 지표입니다.'
    },
    {
      id: 6,
      icon: feeIcon,
      disabledIcon: feeDisabledIcon,
      isLocked: true,
      title: '총보수',
      description: ''
    },
    // 4행
    {
      id: 8,
      icon: volumeIcon,
      disabledIcon: volumeDisabledIcon,
      isLocked: false,
      title: '거래량',
      description: '일정 기간 동안 사고팔린 ETF의 수량'
    },
    {
      id: 7,
      icon: deviationIcon,
      disabledIcon: deviationDisabledIcon,
      isLocked: true,
      title: '괴리율',
      description: 'ETF 가격과 순자산가치의 차이를 나타냅니다.'
    },
    // 5행
    {
      id: 9,
      icon: dividendIcon,
      disabledIcon: dividendDisabledIcon,
      isLocked: false,
      title: '분배금',
      description: '펀드가 투자자에게 지급하는 배당금입니다.'
    },
    {
      id: 10,
      icon: swapIcon,
      disabledIcon: swapDisabledIcon,
      isLocked: true,
      title: '스왑',
      description: ''
    },
    // 6행
    {
      id: 12,
      icon: dividendReinvestIcon,
      disabledIcon: dividendReinvestDisabledIcon,
      isLocked: true,
      title: '분배금 재투자',
      description: ''
    },
    {
      id: 11,
      icon: underlyingAssetIcon,
      disabledIcon: underlyingAssetDisabledIcon,
      isLocked: false,
      title: '기초자산',
      description: 'ETF가 추종하는 자산을 의미합니다.'
    },
    // 7행
    {
      id: 13,
      icon: underlyingIndexIcon,
      disabledIcon: underlyingIndexDisabledIcon,
      isLocked: true,
      title: '기초지수',
      description: 'ETF가 추종하는 지수를 의미합니다.'
    },
    {
      id: 14,
      icon: tradingValueIcon,
      disabledIcon: tradingValueDisabledIcon,
      isLocked: false,
      title: '거래대금',
      description: '일정 기간 동안 거래된 ETF의 총 금액'
    },
    // 8행
    {
      id: 16,
      icon: netAssetIcon,
      disabledIcon: netAssetDisabledIcon,
      isLocked: false,
      title: '순자산',
      description: 'ETF가 보유한 모든 자산에서 부채를 뺀 가치'
    },
    {
      id: 15,
      icon: trackingErrorIcon,
      disabledIcon: trackingErrorDisabledIcon,
      isLocked: true,
      title: '추적오차',
      description: 'ETF가 지수를 얼마나 정확하게 추종하는지 나타냅니다.'
    },
    // 9행
    {
      id: 17,
      icon: cashDividendIcon,
      disabledIcon: cashDividendDisabledIcon,
      isLocked: false,
      title: '현금배당',
      description: '현금으로 지급되는 배당금입니다.'
    },
    {
      id: 18,
      icon: rebalancingIcon,
      disabledIcon: rebalancingDisabledIcon,
      isLocked: false,
      title: '리밸런싱',
      description: '기초지수의 구성 종목 비중을 맞추기 위해 ETF 구성 종목을 주기적으로 조정하는 작업'
    },
    // 10행
    {
      id: 20,
      icon: physicalIcon,
      disabledIcon: physicalDisabledIcon,
      isLocked: true,
      title: '운용방식 - 실물',
      description: ''
    },
    {
      id: 19,
      icon: syntheticIcon,
      disabledIcon: syntheticDisabledIcon,
      isLocked: false,
      title: '운용방식 - 합성',
      description: '합성 복제 방식으로 운용되는 ETF입니다.'
    },
    // 11행
    {
      id: 21,
      icon: leverageIcon,
      disabledIcon: leverageDisabledIcon,
      isLocked: true,
      title: '레버리지',
      description: '레버리지는 투자 효과를 증폭시키는 기법입니다.'
    }
  ];

  // 필터링 및 정렬 로직
  const getFilteredData = () => {
    let filtered = [...allVocabularyData];

    // 탭에 따른 필터링
    if (activeTab === '최근 얻은 순') {
      // 활성화된 카드만 필터링
      filtered = filtered.filter(item => !item.isLocked);

      // 정렬 순서에 따라 정렬
      if (sortOrder === 'oldest') {
        filtered = filtered.reverse();
      }
    } else if (activeTab === '미획득만') {
      // 비활성화된 카드만 필터링
      filtered = filtered.filter(item => item.isLocked);
    }

    return filtered;
  };

  const vocabularyData = getFilteredData();

  // 획득한 카드 수 계산
  const obtainedCount = allVocabularyData.filter(item => !item.isLocked).length;

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // "최근 얻은 순" 버튼 클릭 핸들러
  const handleRecentClick = () => {
    if (activeTab === '최근 얻은 순') {
      // 이미 선택된 상태면 정렬 순서 토글
      setSortOrder(prev => prev === 'recent' ? 'oldest' : 'recent');
    } else {
      // 새로 선택하면 최근 얻은 순으로 설정
      setActiveTab('최근 얻은 순');
      setSortOrder('recent');
    }
  };

  // "미획득만" 버튼 클릭 핸들러
  const handleUnacquiredClick = () => {
    if (activeTab === '미획득만') {
      // 이미 선택된 상태면 전체로 돌아감
      setActiveTab('전체');
    } else {
      setActiveTab('미획득만');
    }
  };

  // 뒤로가기 핸들러
  const handleBackClick = () => {
    navigate(-1);
  };

  // 미션 완료 모달 핸들러
  const handleMissionModalClose = () => {
    setShowMissionModal(false);
  };

  const handleMissionModalNext = () => {
    setShowMissionModal(false);
    navigate('/mission-rating', { replace: true });
  };

  // 단어카드 클릭 핸들러
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowDetailModal(true);

    // vocabulary 미션이 활성화되어 있으면 카운트다운 시작
    if (isActiveMission('vocabulary')) {
      setCountdown(3);

      let count = 3;
      const intervalId = setInterval(() => {
        count -= 1;
        setCountdown(count);

        if (count === 0) {
          clearInterval(intervalId);
          setShowMissionModal(true);
        }
      }, 1000);

      setMissionTimer(intervalId);
    }
  };

  // 상세 모달 닫기 핸들러
  const handleDetailModalClose = () => {
    setShowDetailModal(false);
    setSelectedCard(null);
    setCountdown(null);

    // 타이머가 진행 중이면 중지
    if (missionTimer) {
      clearInterval(missionTimer);
      setMissionTimer(null);
    }
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (missionTimer) {
        clearInterval(missionTimer);
      }
    };
  }, [missionTimer]);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      paddingBottom: '88px'
    }}>
      {/* TopNav with Safe Area */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        boxShadow: hasScrolled ? '0 2px 8px 0 rgba(0, 0, 0, 0.04)' : 'none',
        transition: 'box-shadow 0.2s ease'
      }}>
        <TopNav
          title="용어 백과"
          number={obtainedCount.toString()}
          totalNumber="21"
          depth="2"
          state="number"
          showBackButton={true}
          showChip={false}
          showNumber={true}
          onBackClick={handleBackClick}
        />
      </div>

      {/* 필터 칩들 */}
      <div style={{
        padding: `16px ${LAYOUT.HORIZONTAL_PADDING}px 24px`,
        display: 'flex',
        gap: '8px',
        overflowX: 'auto'
      }}>
        <Chip
          title={activeTab === '최근 얻은 순' && sortOrder === 'oldest' ? '나중에 얻은 순' : '최근 얻은 순'}
          showIcon={true}
          state={activeTab === '최근 얻은 순' ? 'select' : 'nonSelect'}
          color="primary"
          iconRotation={activeTab === '최근 얻은 순' && sortOrder === 'oldest' ? 180 : 0}
          onClick={handleRecentClick}
        />
        <Chip
          title="미획득만"
          state={activeTab === '미획득만' ? 'select' : 'nonSelect'}
          color="primary"
          onClick={handleUnacquiredClick}
        />
      </div>

      {/* 용어 카드 그리드 */}
      <div style={{
        padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 20px`,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: `${LAYOUT.GRID_GAP.ROW}px`,
        justifyItems: 'center'
      }}>
        {vocabularyData.map((item) => (
          <VocabularyCard
            key={item.id}
            icon={item.isLocked ? item.disabledIcon : item.icon}
            isLocked={item.isLocked}
            title={item.title}
            description={item.description}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </div>

      {/* 미션 완료 모달 */}
      <MissionCompleteModal
        isOpen={showMissionModal}
        onClose={handleMissionModalClose}
        onNext={handleMissionModalNext}
      />

      {/* 단어카드 상세 모달 */}
      {selectedCard && (
        <VocabularyDetailModal
          isOpen={showDetailModal}
          onClose={handleDetailModalClose}
          icon={selectedCard.icon}
          title={selectedCard.title}
          description={selectedCard.description}
          countdown={countdown}
        />
      )}
    </div>
  );
};

export default Vocabulary;
