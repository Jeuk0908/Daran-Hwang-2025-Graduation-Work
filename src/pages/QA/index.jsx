import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { CenterTabNav } from '../../components/common/CenterTabNav';
import { TipCard } from '../../components/common/TipCard';
import { LAYOUT } from '../../constants/layout';
import iconDividen from '../../assets/분배금_24.svg';
import iconNAV from '../../assets/NAV_24.svg';
import iconETF from '../../assets/ETF_24.svg';
import iconUnderlying from '../../assets/기초지수_24.svg';
import iconDividenReinvest from '../../assets/분배금 재투자_24.svg';
import iconFee from '../../assets/총보수_24.svg';

const QA = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Q&A');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === '영상 TIP') {
      navigate('/video-tip');
    }
  };

  const qaData = [
    {
      id: 1,
      icon: iconDividen,
      title: 'TR ETF의 장점이 무엇인가요?',
      tips: [
        {
          title: '복리 효과 극대화',
          content:
            '배당금을 받을 때마다 부과되는 세금을 즉시 내지 않고, 그 금액을 온전히 재투자해 장기적으로 자산이 더 빠르게 불어납니다.'
        },
        {
          title: '번거로움 해소',
          content:
            '배당금이 자동으로 재투자되기 때문에, 투자자가 일일이 재투자할 필요가 없어 관리가 편리합니다.'
        },
        {
          title: '장기 투자에 유리',
          content:
            '꾸준한 현금 흐름보다는 장기적인 자산 성장을 목표로 할 때 가장 효과적인 전략입니다.'
        }
      ],
      linkText: 'TR ETF 상품 검색하기',
      linkIcon: iconDividenReinvest,
      defaultOpen: true,
      initialBookmarked: true
    },
    {
      id: 2,
      icon: iconNAV,
      title: '왜 이 ETF는 시장 가격과 NAV가 다른가요?',
      tips: [
        {
          title: 'NAV란?',
          content:
            'NAV(순자산가치)는 ETF가 보유한 자산의 실제 가치를 나타내며, 시장 가격은 투자자들의 수요와 공급에 의해 결정됩니다.'
        }
      ],
      linkText: 'NAV에 대해 더 알아보기',
      defaultOpen: false,
      initialBookmarked: true
    },
    {
      id: 3,
      icon: iconETF,
      title: '어떤 ETF를 사야 할지 모르겠어요.',
      tips: [
        {
          title: '투자 목표 설정',
          content:
            '자신의 투자 목표와 위험 감수 수준을 먼저 파악하고, 그에 맞는 ETF를 선택하는 것이 중요합니다.'
        }
      ],
      linkText: 'ETF 선택 가이드 보기',
      defaultOpen: false,
      initialBookmarked: true
    },
    {
      id: 4,
      icon: iconUnderlying,
      title: 'ETF의 수익률은 기초지수와 왜 조금씩 다른가요?',
      tips: [
        {
          title: '추적오차',
          content:
            'ETF는 기초지수를 추종하지만, 운용 비용, 배당금 재투자 시기 등의 이유로 약간의 차이가 발생할 수 있습니다.'
        }
      ],
      linkText: '추적오차에 대해 알아보기',
      defaultOpen: false,
      initialBookmarked: true
    },
    {
      id: 5,
      icon: iconDividen,
      title: 'ETF 분배금은 어떻게 받나요?',
      tips: [
        {
          title: '분배금 지급',
          content:
            'ETF 분배금은 정해진 날짜에 투자자의 계좌로 자동 입금되며, 재투자 옵션을 선택할 수도 있습니다.'
        }
      ],
      linkText: '분배금 일정 확인하기',
      defaultOpen: false,
      initialBookmarked: true
    },
    {
      id: 6,
      icon: iconFee,
      title: '총보수가 낮으면 무조건 좋은 ETF인가요?',
      tips: [
        {
          title: '종합적 평가 필요',
          content:
            '총보수도 중요하지만, 추적오차, 거래량, 운용사 신뢰도 등을 종합적으로 고려해야 합니다.'
        }
      ],
      linkText: 'ETF 평가 기준 알아보기',
      defaultOpen: false,
      initialBookmarked: true
    }
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        paddingTop: LAYOUT.SAFE_AREA_TOP,
        paddingBottom: '88px'
      }}
    >
      {/* 상단 네비게이션 */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`
      }}>
        <TopNav
          title="북마크"
          depth="2"
          state="icon"
          showBackButton={true}
          showTitle={true}
          showIconL={false}
          showIconR={false}
          onBackClick={handleBackClick}
        />
      </div>

      {/* 탭 네비게이션 */}
      <div style={{ marginTop: '26px' }}>
        <CenterTabNav
          tabs={['전체', 'Q&A', '영상 TIP', '뉴스']}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Q&A 카드 리스트 */}
      <div
        style={{
          padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px 20px`,
          display: 'flex',
          flexDirection: 'column',
          gap: `${LAYOUT.CARD_GAP}px`,
          marginTop: '31px'
        }}
      >
        {qaData.map((qa) => (
          <TipCard
            key={qa.id}
            icon={qa.icon}
            title={qa.title}
            tips={qa.tips}
            linkText={qa.linkText}
            linkIcon={qa.linkIcon}
            showLink={true}
            defaultOpen={qa.defaultOpen}
            initialBookmarked={qa.initialBookmarked}
            onToggle={(isOpen) => {
              console.log(`${qa.title} ${isOpen ? '열림' : '닫힘'}`);
            }}
            onBookmarkChange={(isBookmarked) => {
              console.log(
                `${qa.title} 북마크 ${isBookmarked ? '추가' : '제거'}`
              );
            }}
            onLinkClick={() => {
              console.log(`${qa.linkText} 클릭`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default QA;
