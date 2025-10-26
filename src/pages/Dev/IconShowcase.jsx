import { useEffect, useState } from 'react';
import { PhoneNumFild } from '../../components/common/PhoneNumFild.jsx';
import { Button } from '../../components/common/Button.jsx';
import { SubNav } from '../../components/common/SubNav.jsx';
import { TopNav } from '../../components/common/TopNav.jsx';
import { SearchBar } from '../../components/common/SearchBar.jsx';
import { TipCard } from '../../components/common/TipCard.jsx';
import { StockFilterToggle, GeneralToggle, SmallToggle } from '../../components/common/ToggleButton.jsx';
import { CaptionButton, CaptionIconButton } from '../../components/common/CaptionButton.jsx';
import { SelectionCard } from '../../components/common/SelectionCard.jsx';
import { Chip } from '../../components/common/Chip.jsx';
import { StockChangeCard } from '../../components/common/StockChangeCard.jsx';
import { Label } from '../../components/common/Label.jsx';
import { RebalanceButton } from '../../components/common/RebalanceButton.jsx';
import { RebalanceInfoCard } from '../../components/common/RebalanceInfoCard.jsx';
import TextField from '../../components/common/TextField.jsx';
import RebalanceETFCard from '../../components/common/RebalanceETFCard.jsx';

// 아이콘 SVG 파일 imports
import iconSearch from '../../assets/icon_search.svg';
import iconBell from '../../assets/icon_bell_outline_1.svg';
import iconBackL from '../../assets/icon_back_L.svg';
import iconBackR from '../../assets/icon_back_R.svg';
import iconBackSL from '../../assets/icon_back(S)_L.svg';
import iconBackSR from '../../assets/icon_back(S)_R.svg';
import iconBackSU from '../../assets/icon_back(S)_U.svg';
import iconBackSD from '../../assets/icon_back(S)_D.svg';
import iconBackSLT50 from '../../assets/icon_back(S)_L_t50.svg';
import iconBackSRT50 from '../../assets/icon_back(S)_R_t50.svg';
import iconBackSUT50 from '../../assets/icon_back(S)_U_t50.svg';
import iconBackSDT50 from '../../assets/icon_back(S)_D_t50.svg';
import iconCancelL from '../../assets/icon_cancel(L)).svg';
import iconCancelS from '../../assets/icon_cancel(S).svg';
import iconCancelXS from '../../assets/icon_cancel(XS).svg';
import iconCancelXSBlack from '../../assets/icon_cancel(XS)_black.svg';
import iconPlusL from '../../assets/icon_plus(L).svg';
import iconPlusS from '../../assets/icon_plus(S).svg';
import iconPlusST50 from '../../assets/icon_plus(S) t50.svg';
import iconPlus0Plus from '../../assets/icon_plus_0+.svg';

// 화살표 & 방향
import iconUpup from '../../assets/자산 card ui/icon_upup.svg';
import iconUpupS from '../../assets/자산 card ui/icon_upup_s.svg';
import iconDowndown from '../../assets/자산 card ui/icon_downdown.svg';
import iconDowndownS from '../../assets/자산 card ui/icon_downdown_s.svg';

// 뷰 & 표시
import iconList from '../../assets/icon_list.svg';

// 정보 & 상태
import iconWhy2020 from '../../assets/icon_why(20_20).svg';
import iconWhy1212 from '../../assets/icon_why(12_12).svg';
import iconInformation from '../../assets/icon_information.svg';
import iconInformationS from '../../assets/icon_information_s.svg';

// 체크 & 선택
import iconCheckOff from '../../assets/icon_check_off.svg';
import iconCheckOn from '../../assets/icon_check_on.svg';
import iconCheck from '../../assets/icon_ckeck.svg';
import iconCheckXS from '../../assets/icon_ckeck(XS).svg';

// 설정 & 도구
import iconSetting2 from '../../assets/icon_setting2.svg';

// 즐겨찾기 & 북마크
import iconHeartOutline from '../../assets/icon_heart_outline.svg';
import iconHeartFill from '../../assets/icon_heart_fill.svg';
import iconBookmarkLO from '../../assets/icon_bookmark(L)_o.svg';
import iconBookmarkLO2 from '../../assets/icon_bookmark(L)_o2.svg';
import iconBookmarkSO from '../../assets/icon_bookmark(s)_o.svg';
import iconBookmarkSO2 from '../../assets/icon_bookmark(s)_o2.svg';

// 사용자
import iconPerson from '../../assets/icon_person.svg';

// 캐릭터 아이콘
import charBeaver from '../../assets/목표를 향해 비버.svg';
import charCat from '../../assets/얼리어덥터 고양이.svg';
import charSnail from '../../assets/천천히 꾸준 달팽이.svg';
import charAnt from '../../assets/독립자금 개미.svg';

// 네비게이션 바 아이콘
import navHomeActive from '../../assets/홈(활성화).svg';
import navHomeActive2 from '../../assets/홈(활성화)-1.svg';
import navExploreInactive from '../../assets/탐색(비활성화).svg';
import navExploreActive from '../../assets/탐색(활성화).svg';
import navMypageInactive from '../../assets/마이페이지(비활성화).svg';
import navMypageActive from '../../assets/마이페이지(활성화).svg';
import navPortfolio from '../../assets/포트폴리오.svg';
import navPortfolioInactive from '../../assets/포트폴리오_비활성화.svg';

// 투자 전략 아이콘
import strategyGlobal from '../../assets/글로벌 탐험가.svg';
import strategyVocab from '../../assets/단어장.svg';
import strategyPocket from '../../assets/매달 안심 용돈.svg';
import strategyTax from '../../assets/스마트 절세.svg';
import strategyAuto from '../../assets/자동제작.svg';
import strategyManual from '../../assets/수동제작.svg';

// ETF 용어 아이콘 (24px)
import termETF from '../../assets/ETF_24.svg';
import termNAV from '../../assets/NAV_24.svg';
import termTER from '../../assets/TER_24.svg';
import termTradeAmount from '../../assets/거래대금_24.svg';
import termTradeVolume from '../../assets/거래량_24.svg';
import termDeviation from '../../assets/괴리율_24.svg';
import termUnderlying from '../../assets/기초자산_24.svg';
import termIndex from '../../assets/기초지수_24.svg';
import termLeverage from '../../assets/레버리지_24.svg';
import termRebalancing from '../../assets/리밸런싱_24.svg';
import termDistReinvest from '../../assets/분배금 재투자_24.svg';
import termDistribution from '../../assets/분배금_24.svg';
import termNetAsset from '../../assets/순자산_24.svg';
import termSwap from '../../assets/스왑_24.svg';
import termMarketCap from '../../assets/시가총액_24.svg';
import termPhysical from '../../assets/운용방식 - 실물_24.svg';
import termSynthetic from '../../assets/운용방식-합성_24.svg';
import termIndexIcon from '../../assets/인덱스_24.svg';
import termIndexIcon2 from '../../assets/인덱스_24-1.svg';
import termTotalFee from '../../assets/총보수_24.svg';
import termTrackingError from '../../assets/추적오차_24.svg';
import termCashDividend from '../../assets/현금배당_24.svg';

// ETF 용어 아이콘 - 비활성화
import termETFInactive from '../../assets/비활성화 아이콘/ETF_비활성화.svg';
import termNAVInactive from '../../assets/비활성화 아이콘/NAV_비활성화.svg';
import termTERInactive from '../../assets/비활성화 아이콘/TER_비활성화.svg';
import termTradeAmountInactive from '../../assets/비활성화 아이콘/거래대금_비활성화.svg';
import termTradeVolumeInactive from '../../assets/비활성화 아이콘/거래량_비활성화.svg';
import termDeviationInactive from '../../assets/비활성화 아이콘/괴리율_비활성화.svg';
import termUnderlyingInactive from '../../assets/비활성화 아이콘/기초자산_비활성화.svg';
import termIndexInactive from '../../assets/비활성화 아이콘/기초지수_비활성화.svg';
import termLeverageInactive from '../../assets/비활성화 아이콘/레버리지_비활성화.svg';
import termRebalancingInactive from '../../assets/비활성화 아이콘/리밸런싱_비활성화.svg';
import termDistReinvestInactive from '../../assets/비활성화 아이콘/분배금 재투자_비활성화.svg';
import termDistributionInactive from '../../assets/비활성화 아이콘/분배금_비활성화.svg';
import termNetAssetInactive from '../../assets/비활성화 아이콘/순자산_비활성화.svg';
import termSwapInactive from '../../assets/비활성화 아이콘/스왑_비활성화.svg';
import termMarketCapInactive from '../../assets/비활성화 아이콘/시가총액_비활성화.svg';
import termPhysicalInactive from '../../assets/비활성화 아이콘/운용방식 - 실물_비활성화.svg';
import termSyntheticInactive from '../../assets/비활성화 아이콘/운용방식-합성_비활성화.svg';
import termIndexIconInactive from '../../assets/비활성화 아이콘/인덱스_비활성화.svg';
import termIndexIcon2Inactive from '../../assets/비활성화 아이콘/인덱스_비활성화-1.svg';
import termTotalFeeInactive from '../../assets/비활성화 아이콘/총보수_비활성화.svg';
import termTrackingErrorInactive from '../../assets/비활성화 아이콘/추적오차_비활성화.svg';
import termCashDividendInactive from '../../assets/비활성화 아이콘/현금배당_비활성화.svg';

const IconShowcase = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('returns');
  const [isUsageOpen, setIsUsageOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [stockFilter, setStockFilter] = useState('down');
  const [generalToggle, setGeneralToggle] = useState(false);
  const [smallToggle, setSmallToggle] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isRebalanceExpanded, setIsRebalanceExpanded] = useState(false);
  const [isProfitMode, setIsProfitMode] = useState(true);
  const [textFieldValue, setTextFieldValue] = useState('');

  useEffect(() => {
    // 컴포넌트 마운트 시 body와 #root의 maxWidth 제거
    const body = document.body;
    const root = document.getElementById('root');

    const originalBodyMaxWidth = body.style.maxWidth;
    const originalRootMaxWidth = root?.style.maxWidth;

    body.style.maxWidth = 'none';
    if (root) {
      root.style.maxWidth = 'none';
    }

    // 컴포넌트 언마운트 시 원래 값으로 복원
    return () => {
      body.style.maxWidth = originalBodyMaxWidth;
      if (root) {
        root.style.maxWidth = originalRootMaxWidth;
      }
    };
  }, []);

  const iconGroups = [
    {
      category: '네비게이션 & 액션',
      icons: [
        { name: 'icon_bell', src: iconBell, size: 24 },
        { name: 'icon_search', src: iconSearch, size: 24 },
        { name: 'icon_back_L', src: iconBackL, size: 24 },
        { name: 'icon_back_R', src: iconBackR, size: 24 },
        { name: 'icon_back(S)_L', src: iconBackSL, size: 24 },
        { name: 'icon_back(S)_R', src: iconBackSR, size: 24 },
        { name: 'icon_back(S)_U', src: iconBackSU, size: 24 },
        { name: 'icon_back(S)_D', src: iconBackSD, size: 24 },
        { name: 'icon_back(S)_L_t50', src: iconBackSLT50, size: 24, color: '50% opacity' },
        { name: 'icon_back(S)_R_t50', src: iconBackSRT50, size: 24, color: '50% opacity' },
        { name: 'icon_back(S)_U_t50', src: iconBackSUT50, size: 24, color: '50% opacity' },
        { name: 'icon_back(S)_D_t50', src: iconBackSDT50, size: 24, color: '50% opacity' },
        { name: 'icon_cancel(L)', src: iconCancelL, size: 24 },
        { name: 'icon_cancel(S)', src: iconCancelS, size: 24 },
        { name: 'icon_cancel(XS)', src: iconCancelXS, size: 12, color: '#DA6816' },
        { name: 'icon_cancel(XS)_black', src: iconCancelXSBlack, size: 12 },
      ]
    },
    {
      category: '화살표 & 방향',
      icons: [
        { name: 'icon_upup_s', src: iconUpupS, size: 10, color: '#43A329' },
        { name: 'icon_upup', src: iconUpup, size: 18, color: '#43A329' },
        { name: 'icon_downdown_s', src: iconDowndownS, size: 10, color: '#DA6816' },
        { name: 'icon_downdown', src: iconDowndown, size: 18, color: '#DA6816' },
      ]
    },
    {
      category: '뷰 & 표시',
      icons: [
        { name: 'icon_list', src: iconList, size: 24 },
      ]
    },
    {
      category: '정보 & 상태',
      icons: [
        { name: 'icon_why(20_20)', src: iconWhy2020, size: 20, color: '#3490FF' },
        { name: 'icon_why(12_12)', src: iconWhy1212, size: 12, color: '#3490FF' },
        { name: 'icon_information', src: iconInformation, size: 20, color: '#474C57' },
        { name: 'icon_information_s', src: iconInformationS, size: 12, color: '#757E8F' },
      ]
    },
    {
      category: '체크 & 선택',
      icons: [
        { name: 'icon_check_off', src: iconCheckOff, size: 24, color: '#9198A6' },
        { name: 'icon_check_on', src: iconCheckOn, size: 24, color: '#3490FF' },
        { name: 'icon_check', src: iconCheck, size: 24 },
        { name: 'icon_check(XS)', src: iconCheckXS, size: 12, color: '#43A329' },
      ]
    },
    {
      category: '설정 & 도구',
      icons: [
        { name: 'icon_setting2', src: iconSetting2, size: 24 },
        { name: 'icon_plus(L)', src: iconPlusL, size: 24 },
        { name: 'icon_plus(S)', src: iconPlusS, size: 24 },
        { name: 'icon_plus(S)_t50', src: iconPlusST50, size: 24, color: '#757E8F' },
        { name: 'icon_plus_0+', src: iconPlus0Plus, size: 24 },
      ]
    },
    {
      category: '즐겨찾기 & 북마크',
      icons: [
        { name: 'icon_heart_outline', src: iconHeartOutline, size: 24 },
        { name: 'icon_heart_fill', src: iconHeartFill, size: 24, color: '#3490FF' },
        { name: 'icon_bookmark(L)_o', src: iconBookmarkLO, size: 24, color: '#3490FF' },
        { name: 'icon_bookmark(L)_o2', src: iconBookmarkLO2, size: 24, color: '#ADB3BD' },
        { name: 'icon_bookmark(s)_o', src: iconBookmarkSO, size: 16, color: '#3490FF' },
        { name: 'icon_bookmark(s)_o2', src: iconBookmarkSO2, size: 16, color: '#ADB3BD' },
      ]
    },
    {
      category: '위치 & 사용자',
      icons: [
        { name: 'icon_person', src: iconPerson, size: 24 },
      ]
    },
    {
      category: '캐릭터 아이콘',
      icons: [
        { name: '목표를 향해 비버', src: charBeaver, size: 48, desc: '목표를 향해 비버' },
        { name: '얼리어덥터 고양이', src: charCat, size: 48, desc: '얼리어덥터 고양이' },
        { name: '천천히 꾸준 달팽이', src: charSnail, size: 48, desc: '천천히 꾸준 달팽이' },
        { name: '독립자금 개미', src: charAnt, size: 48, desc: '독립자금 개미' },
      ]
    },
    {
      category: '네비게이션 바 아이콘',
      icons: [
        { name: '홈(활성화)', src: navHomeActive, size: 24, color: 'Active' },
        { name: '홈(활성화)-2', src: navHomeActive2, size: 24, color: 'Active' },
        { name: '탐색(비활성화)', src: navExploreInactive, size: 24, color: 'Inactive' },
        { name: '탐색(활성화)', src: navExploreActive, size: 24, color: 'Active' },
        { name: '마이페이지(비활성화)', src: navMypageInactive, size: 24, color: 'Inactive' },
        { name: '마이페이지(활성화)', src: navMypageActive, size: 24, color: 'Active' },
        { name: '포트폴리오', src: navPortfolio, size: 24, color: 'Active' },
        { name: '포트폴리오(비활성화)', src: navPortfolioInactive, size: 24, color: 'Inactive' },
      ]
    },
    {
      category: '투자 전략 아이콘',
      icons: [
        { name: '글로벌 탐험가', src: strategyGlobal, size: 48 },
        { name: '단어장', src: strategyVocab, size: 48 },
        { name: '매달 안심 용돈', src: strategyPocket, size: 48 },
        { name: '스마트 절세', src: strategyTax, size: 48 },
        { name: '자동제작', src: strategyAuto, size: 48 },
        { name: '수동제작', src: strategyManual, size: 48 },
      ]
    },
    {
      category: 'ETF 용어 아이콘 (24px)',
      icons: [
        { name: 'ETF', src: termETF, size: 24 },
        { name: 'NAV', src: termNAV, size: 24 },
        { name: 'TER', src: termTER, size: 24 },
        { name: '거래대금', src: termTradeAmount, size: 24 },
        { name: '거래량', src: termTradeVolume, size: 24 },
        { name: '괴리율', src: termDeviation, size: 24 },
        { name: '기초자산', src: termUnderlying, size: 24 },
        { name: '기초지수', src: termIndex, size: 24 },
        { name: '레버리지', src: termLeverage, size: 24 },
        { name: '리밸런싱', src: termRebalancing, size: 24 },
        { name: '분배금 재투자', src: termDistReinvest, size: 24 },
        { name: '분배금', src: termDistribution, size: 24 },
        { name: '순자산', src: termNetAsset, size: 24 },
        { name: '스왑', src: termSwap, size: 24 },
        { name: '시가총액', src: termMarketCap, size: 24 },
        { name: '운용방식-실물', src: termPhysical, size: 24 },
        { name: '운용방식-합성', src: termSynthetic, size: 24 },
        { name: '인덱스', src: termIndexIcon, size: 24 },
        { name: '인덱스-2', src: termIndexIcon2, size: 24 },
        { name: '총보수', src: termTotalFee, size: 24 },
        { name: '추적오차', src: termTrackingError, size: 24 },
        { name: '현금배당', src: termCashDividend, size: 24 },
      ]
    },
    {
      category: 'ETF 용어 아이콘 - 비활성화',
      icons: [
        { name: 'ETF(비활성화)', src: termETFInactive, size: 24, color: 'Inactive' },
        { name: 'NAV(비활성화)', src: termNAVInactive, size: 24, color: 'Inactive' },
        { name: 'TER(비활성화)', src: termTERInactive, size: 24, color: 'Inactive' },
        { name: '거래대금(비활성화)', src: termTradeAmountInactive, size: 24, color: 'Inactive' },
        { name: '거래량(비활성화)', src: termTradeVolumeInactive, size: 24, color: 'Inactive' },
        { name: '괴리율(비활성화)', src: termDeviationInactive, size: 24, color: 'Inactive' },
        { name: '기초자산(비활성화)', src: termUnderlyingInactive, size: 24, color: 'Inactive' },
        { name: '기초지수(비활성화)', src: termIndexInactive, size: 24, color: 'Inactive' },
        { name: '레버리지(비활성화)', src: termLeverageInactive, size: 24, color: 'Inactive' },
        { name: '리밸런싱(비활성화)', src: termRebalancingInactive, size: 24, color: 'Inactive' },
        { name: '분배금 재투자(비활성화)', src: termDistReinvestInactive, size: 24, color: 'Inactive' },
        { name: '분배금(비활성화)', src: termDistributionInactive, size: 24, color: 'Inactive' },
        { name: '순자산(비활성화)', src: termNetAssetInactive, size: 24, color: 'Inactive' },
        { name: '스왑(비활성화)', src: termSwapInactive, size: 24, color: 'Inactive' },
        { name: '시가총액(비활성화)', src: termMarketCapInactive, size: 24, color: 'Inactive' },
        { name: '운용방식-실물(비활성화)', src: termPhysicalInactive, size: 24, color: 'Inactive' },
        { name: '운용방식-합성(비활성화)', src: termSyntheticInactive, size: 24, color: 'Inactive' },
        { name: '인덱스(비활성화)', src: termIndexIconInactive, size: 24, color: 'Inactive' },
        { name: '인덱스-2(비활성화)', src: termIndexIcon2Inactive, size: 24, color: 'Inactive' },
        { name: '총보수(비활성화)', src: termTotalFeeInactive, size: 24, color: 'Inactive' },
        { name: '추적오차(비활성화)', src: termTrackingErrorInactive, size: 24, color: 'Inactive' },
        { name: '현금배당(비활성화)', src: termCashDividendInactive, size: 24, color: 'Inactive' },
      ]
    }
  ];

  return (
    <div style={{
      padding: 'clamp(20px, 3vw, 60px)',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        fontFamily: 'Pretendard, sans-serif',
        fontSize: 'clamp(24px, 4vw, 40px)',
        fontWeight: 600,
        color: '#1A1C20',
        marginBottom: 'clamp(24px, 3vw, 48px)',
        textAlign: 'center'
      }}>
        아이콘 세트 (Icon Showcase)
      </h1>

      {/* 아이콘 그리드 */}
      {iconGroups.map((group, groupIndex) => (
        <div key={groupIndex} style={{ marginBottom: 'clamp(32px, 4vw, 60px)' }}>
          <h2 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            color: '#5E6573',
            marginBottom: 'clamp(16px, 2vw, 24px)'
          }}>
            {group.category}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(140px, 100%), 1fr))',
            gap: 'clamp(12px, 2vw, 20px)',
            maxWidth: '100%'
          }}>
            {group.icons.map((icon, iconIndex) => (
              <div
                key={iconIndex}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  padding: 'clamp(12px, 2vw, 20px)',
                  backgroundColor: '#F7F7F8',
                  borderRadius: '12px',
                  border: '1px solid #E6E7EA',
                  minHeight: 'clamp(140px, 15vw, 160px)',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'clamp(48px, 8vw, 72px)',
                  height: 'clamp(48px, 8vw, 72px)',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px'
                }}>
                  <img
                    src={icon.src}
                    alt={icon.name}
                    style={{
                      width: icon.size === 48 ? 'clamp(36px, 6vw, 48px)' : icon.size === 24 ? 'clamp(20px, 3vw, 24px)' : `${icon.size}px`,
                      height: icon.size === 48 ? 'clamp(36px, 6vw, 48px)' : icon.size === 24 ? 'clamp(20px, 3vw, 24px)' : `${icon.size}px`,
                      objectFit: 'contain'
                    }}
                  />
                </div>
                <div style={{ textAlign: 'center', width: '100%', padding: '0 4px' }}>
                  <p style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: 'clamp(11px, 1.5vw, 13px)',
                    fontWeight: 500,
                    color: '#1A1C20',
                    marginBottom: '4px',
                    wordBreak: 'break-word',
                    lineHeight: '1.4'
                  }}>
                    {icon.name}
                  </p>
                  {icon.desc && (
                    <p style={{
                      fontFamily: 'Pretendard, sans-serif',
                      fontSize: 'clamp(10px, 1.3vw, 12px)',
                      fontWeight: 400,
                      color: '#3490FF',
                      marginBottom: '4px',
                      lineHeight: '1.3'
                    }}>
                      {icon.desc}
                    </p>
                  )}
                  <p style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: 'clamp(9px, 1.2vw, 11px)',
                    fontWeight: 400,
                    color: '#757E8F',
                    margin: 0
                  }}>
                    {icon.size}px {icon.color && `• ${icon.color}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 컴포넌트 쇼케이스 그리드 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(430px, 100%), 1fr))',
        gap: 'clamp(40px, 5vw, 60px)',
        marginTop: 'clamp(60px, 6vw, 80px)'
      }}>
        {/* PhoneNumFild 컴포넌트 섹션 */}
        <div style={{
          backgroundColor: '#F7F7F8',
          padding: 'clamp(20px, 3vw, 32px)',
          borderRadius: '16px',
          border: '2px solid #E6E7EA'
        }}>
          <h2 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(16px, 2vw, 24px)',
            marginTop: 0
          }}>
            PhoneNumFild 컴포넌트
          </h2>

          <div style={{
            display: 'grid',
            gap: 'clamp(20px, 3vw, 40px)'
          }}>
          {/* Default 상태 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              1. Default 상태
            </h3>
            <PhoneNumFild
              title="휴대폰 번호 (- 없이 숫자만 입력)"
              placeholder="휴대폰 번호를 입력해주세요"
              value=""
              maxLength={5}
              state="default"
              message="휴대폰 번호를 입력해주세요"
              showMessage={true}
              showCounter={true}
            />
          </div>

          {/* Error 상태 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              2. Error 상태
            </h3>
            <PhoneNumFild
              title="휴대폰 번호 (- 없이 숫자만 입력)"
              placeholder="휴대폰 번호를 입력해주세요"
              value="12345"
              maxLength={5}
              state="error"
              message="휴대폰 번호를 입력해주세요"
              showMessage={true}
              showCounter={true}
            />
          </div>

          {/* Pass 상태 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              3. Pass 상태
            </h3>
            <PhoneNumFild
              title="휴대폰 번호 (- 없이 숫자만 입력)"
              placeholder="휴대폰 번호를 입력해주세요"
              value="12345"
              maxLength={5}
              state="pass"
              message="휴대폰 번호를 입력해주세요"
              showMessage={true}
              showCounter={true}
            />
          </div>

          {/* 인터랙티브 예제 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              4. 인터랙티브 예제
            </h3>
            <p style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '13px',
              color: '#5E6573',
              marginBottom: '10px'
            }}>
              현재 입력값: "{inputValue}" (길이: {inputValue.length})
            </p>
            <PhoneNumFild
              title="휴대폰 번호 (- 없이 숫자만 입력)"
              placeholder="휴대폰 번호를 입력해주세요"
              value={inputValue}
              maxLength={11}
              state={
                inputValue.length === 0
                  ? 'default'
                  : inputValue.length < 11
                  ? 'error'
                  : 'pass'
              }
              message={
                inputValue.length === 0
                  ? '휴대폰 번호를 입력해주세요'
                  : inputValue.length < 11
                  ? '휴대폰 번호는 11자리입니다'
                  : '올바른 휴대폰 번호입니다'
              }
              showMessage={true}
              showCounter={true}
            />
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setInputValue('010')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#E6E7EA',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '13px'
                }}
              >
                010 입력
              </button>
              <button
                onClick={() => setInputValue('01012345678')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#E6E7EA',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '13px'
                }}
              >
                완성된 번호
              </button>
              <button
                onClick={() => setInputValue('')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#E6E7EA',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '13px'
                }}
              >
                초기화
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Button 컴포넌트 섹션 */}
        <div style={{
          backgroundColor: '#F7F7F8',
          padding: 'clamp(20px, 3vw, 32px)',
          borderRadius: '16px',
          border: '2px solid #E6E7EA'
        }}>
          <h2 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(16px, 2vw, 24px)',
            marginTop: 0
          }}>
            Button 컴포넌트
          </h2>

          <div style={{
            display: 'grid',
            gap: 'clamp(20px, 3vw, 24px)'
          }}>
          {/* Primary */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              1. Primary (파란색 fill)
            </h3>
            <Button variant="primary" onClick={() => alert('Primary 버튼 클릭!')}>
              전체 보기
            </Button>
          </div>

          {/* Grey */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              2. Grey (회색)
            </h3>
            <Button variant="grey" onClick={() => alert('Grey 버튼 클릭!')}>
              전체 보기
            </Button>
          </div>

          {/* Skeleton */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              3. Skeleton (연한 파란색)
            </h3>
            <Button variant="skeleton" onClick={() => alert('Skeleton 버튼 클릭!')}>
              전체 보기
            </Button>
          </div>

          {/* Skeleton2 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              4. Skeleton2 (연한 회색)
            </h3>
            <Button variant="skeleton2" onClick={() => alert('Skeleton2 버튼 클릭!')}>
              전체 보기
            </Button>
          </div>
        </div>
      </div>

        {/* SubNav 컴포넌트 섹션 */}
        <div style={{
          backgroundColor: '#F7F7F8',
          padding: 'clamp(20px, 3vw, 32px)',
          borderRadius: '16px',
          border: '2px solid #E6E7EA'
        }}>
          <h2 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(16px, 2vw, 24px)',
            marginTop: 0
          }}>
            SubNav 컴포넌트
          </h2>

          <div style={{
            display: 'grid',
            gap: 'clamp(20px, 3vw, 24px)'
          }}>
          {/* 인터랙티브 예제 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              인터랙티브 예제 (현재 탭: {activeTab})
            </h3>
            <SubNav
              activeTab={activeTab}
              onTabChange={(tabId) => setActiveTab(tabId)}
            />
            <div style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#F7F7F8',
              borderRadius: '8px'
            }}>
              <p style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                color: '#1A1C20',
                margin: 0
              }}>
                {activeTab === 'returns' && '수익률 탭이 선택되었습니다.'}
                {activeTab === 'info' && '기본정보 탭이 선택되었습니다.'}
                {activeTab === 'composition' && '구성종목 탭이 선택되었습니다.'}
                {activeTab === 'dividend' && '배당 탭이 선택되었습니다.'}
              </p>
            </div>
          </div>

          {/* 각 탭별 고정 예제 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              1. 수익률 탭 활성화
            </h3>
            <SubNav activeTab="returns" />
          </div>

          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              2. 기본정보 탭 활성화
            </h3>
            <SubNav activeTab="info" />
          </div>

          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              3. 구성종목 탭 활성화
            </h3>
            <SubNav activeTab="composition" />
          </div>

          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              4. 배당 탭 활성화
            </h3>
            <SubNav activeTab="dividend" />
          </div>
        </div>
        </div>

        {/* TopNav 컴포넌트 섹션 */}
        <div style={{
          backgroundColor: '#F7F7F8',
          padding: 'clamp(20px, 3vw, 32px)',
          borderRadius: '16px',
          border: '2px solid #E6E7EA'
        }}>
          <h2 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(16px, 2vw, 24px)',
            marginTop: 0
          }}>
            TopNav 컴포넌트
          </h2>

          <div style={{
            display: 'grid',
            gap: 'clamp(20px, 3vw, 24px)'
          }}>
          {/* depth=2, state=number */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              1. depth=2, state=number (뒤로가기 + 제목 + 칩 + 숫자)
            </h3>
            <TopNav
              depth="2"
              state="number"
              title="제목제목"
              chipText="선택 ETF"
              number="1"
              totalNumber="4"
              onBackClick={() => alert('뒤로가기 클릭!')}
            />
          </div>

          {/* depth=2, state=icon */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              2. depth=2, state=icon (뒤로가기 + 제목 + 아이콘 2개)
            </h3>
            <TopNav
              depth="2"
              state="icon"
              title="제목제목"
              iconL={iconSearch}
              iconR={iconSearch}
              onBackClick={() => alert('뒤로가기 클릭!')}
              onIconLClick={() => alert('왼쪽 아이콘 클릭!')}
              onIconRClick={() => alert('오른쪽 아이콘 클릭!')}
            />
          </div>

          {/* depth=1, state=icon */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              3. depth=1, state=icon (제목 + 아이콘 2개, 뒤로가기 없음)
            </h3>
            <TopNav
              depth="1"
              state="icon"
              title="제목제목"
              iconL={iconSearch}
              iconR={iconSearch}
              onIconLClick={() => alert('왼쪽 아이콘 클릭!')}
              onIconRClick={() => alert('오른쪽 아이콘 클릭!')}
            />
          </div>

          {/* depth=2, state=2 title */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              4. depth=2, state=2 title (뒤로가기 + 제목/부제목 + 아이콘 2개)
            </h3>
            <TopNav
              depth="2"
              state="2 title"
              title="제목제목"
              subtitle="/제목"
              iconL={iconSearch}
              iconR={iconSearch}
              onBackClick={() => alert('뒤로가기 클릭!')}
              onIconLClick={() => alert('왼쪽 아이콘 클릭!')}
              onIconRClick={() => alert('오른쪽 아이콘 클릭!')}
            />
          </div>

          {/* 아이콘 교체 예제 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              5. 아이콘 교체 예제 (벨 + 검색 아이콘)
            </h3>
            <TopNav
              depth="2"
              state="icon"
              title="내 포트폴리오"
              iconL={iconBell}
              iconR={iconSearch}
              onBackClick={() => alert('뒤로가기 클릭!')}
              onIconLClick={() => alert('알림 클릭!')}
              onIconRClick={() => alert('검색 클릭!')}
            />
          </div>

          {/* 조건부 표시 예제 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              6. 조건부 표시 (왼쪽 아이콘만 표시)
            </h3>
            <TopNav
              depth="2"
              state="icon"
              title="설정"
              iconL={iconBell}
              showIconR={false}
              onBackClick={() => alert('뒤로가기 클릭!')}
              onIconLClick={() => alert('알림 클릭!')}
            />
          </div>
        </div>
        </div>

        {/* SearchBar 컴포넌트 섹션 */}
        <div style={{
          backgroundColor: '#F7F7F8',
          padding: 'clamp(20px, 3vw, 32px)',
          borderRadius: '16px',
          border: '2px solid #E6E7EA'
        }}>
          <h2 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(16px, 2vw, 24px)',
            marginTop: 0
          }}>
            SearchBar 컴포넌트
          </h2>

          <div style={{
            display: 'grid',
            gap: 'clamp(20px, 3vw, 24px)'
          }}>
          {/* 검색 전 상태 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              1. 검색 전 상태 (읽기 전용)
            </h3>
            <SearchBar
              placeholder="상품 / 투자TIP / 용어를 검색해 보세요"
              state="검색 전"
              readOnly={true}
              onClick={() => alert('검색 바 클릭!')}
            />
          </div>

          {/* 검색어 입력 상태 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              2. 검색어 입력 상태 (읽기 전용)
            </h3>
            <SearchBar
              value="검색검색검색검색검색검색검색검색검색검색검색검색검색검색"
              state="state2"
              readOnly={true}
              onClick={() => alert('검색 바 클릭!')}
            />
          </div>

          {/* 인터랙티브 검색 바 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              3. 인터랙티브 검색 바
            </h3>
            <p style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '13px',
              color: '#5E6573',
              marginBottom: '10px'
            }}>
              현재 검색어: "{searchValue}"
            </p>
            <SearchBar
              placeholder="상품 / 투자TIP / 용어를 검색해 보세요"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              readOnly={false}
            />
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSearchValue('삼성전자')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#E6E7EA',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '13px'
                }}
              >
                삼성전자
              </button>
              <button
                onClick={() => setSearchValue('ETF')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#E6E7EA',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '13px'
                }}
              >
                ETF
              </button>
              <button
                onClick={() => setSearchValue('')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#E6E7EA',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '13px'
                }}
              >
                초기화
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* TextField 컴포넌트 섹션 */}
        <div style={{
          backgroundColor: '#F7F7F8',
          padding: 'clamp(20px, 3vw, 32px)',
          borderRadius: '16px',
          border: '2px solid #E6E7EA'
        }}>
          <h2 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(16px, 2vw, 24px)',
            marginTop: 0
          }}>
            TextField 컴포넌트
          </h2>

          <div style={{
            display: 'grid',
            gap: 'clamp(20px, 3vw, 24px)'
          }}>
          {/* 기본 상태 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              1. 기본 상태
            </h3>
            <TextField
              placeholder="텍스트를 입력하세요"
              value=""
              onChange={(value) => console.log(value)}
            />
          </div>

          {/* 에러 상태 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              2. 에러 상태
            </h3>
            <TextField
              placeholder="텍스트를 입력하세요"
              value="잘못된 입력"
              error={true}
              helperText="올바르지 않은 형식입니다"
              onChange={(value) => console.log(value)}
            />
          </div>

          {/* 최대 길이 제한 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              3. 최대 길이 제한 (100자)
            </h3>
            <TextField
              placeholder="최대 100자까지 입력 가능합니다"
              value="예시 텍스트"
              maxLength={100}
              onChange={(value) => console.log(value)}
            />
          </div>

          {/* 비활성화 상태 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              4. 비활성화 상태
            </h3>
            <TextField
              placeholder="비활성화된 입력 칸"
              value="수정 불가"
              disabled={true}
              helperText="이 필드는 수정할 수 없습니다"
            />
          </div>

          {/* 인터랙티브 예제 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              5. 인터랙티브 예제
            </h3>
            <p style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '13px',
              color: '#5E6573',
              marginBottom: '10px'
            }}>
              현재 입력값: "{textFieldValue}" (길이: {textFieldValue.length}/50)
            </p>
            <TextField
              placeholder="자유롭게 입력해보세요 (최대 50자)"
              value={textFieldValue}
              onChange={(value) => setTextFieldValue(value)}
              maxLength={50}
              helperText={textFieldValue.length >= 45 ? '거의 다 찼습니다!' : '50자까지 입력 가능합니다'}
              error={textFieldValue.length >= 50}
            />
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setTextFieldValue('안녕하세요')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#E6E7EA',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '13px'
                }}
              >
                예시 1
              </button>
              <button
                onClick={() => setTextFieldValue('텍스트 입력 테스트')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#E6E7EA',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '13px'
                }}
              >
                예시 2
              </button>
              <button
                onClick={() => setTextFieldValue('')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#E6E7EA',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '13px'
                }}
              >
                초기화
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* TipCard 컴포넌트 섹션 */}
        <div style={{
          backgroundColor: '#F7F7F8',
          padding: 'clamp(20px, 3vw, 32px)',
          borderRadius: '16px',
          border: '2px solid #E6E7EA'
        }}>
          <h2 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(16px, 2vw, 24px)',
            marginTop: 0
          }}>
            TipCard 컴포넌트
          </h2>

          <div style={{
            display: 'grid',
            gap: 'clamp(20px, 3vw, 24px)'
          }}>
          {/* 닫힌 상태 (아이콘 없음) */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              1. 닫힌 상태 (아이콘 없음)
            </h3>
            <TipCard
              title="TR ETF의 장점이 무엇인가요?"
              defaultOpen={false}
            />
          </div>

          {/* 닫힌 상태 (검색 아이콘 + 북마크) */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              2. 닫힌 상태 (검색 아이콘 + 북마크됨)
            </h3>
            <TipCard
              icon={iconSearch}
              title="TR ETF의 장점이 무엇인가요?"
              initialBookmarked={true}
              defaultOpen={false}
            />
          </div>

          {/* 열린 상태 (북마크 안됨) */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              3. 열린 상태 (북마크 안됨)
            </h3>
            <TipCard
              icon={iconSearch}
              title="TR ETF의 장점이 무엇인가요?"
              initialBookmarked={false}
              defaultOpen={true}
              tips={[
                {
                  title: '복리 효과 극대화',
                  content: '배당금을 받을 때마다 부과되는 세금을 즉시 내지 않고, 그 금액을 온전히 재투자해 장기적으로 자산이 더 빠르게 불어납니다.'
                },
                {
                  title: '번거로움 해소',
                  content: '배당금이 자동으로 재투자되기 때문에, 투자자가 일일이 재투자할 필요가 없어 관리가 편리합니다.'
                },
                {
                  title: '장기 투자에 유리',
                  content: '꾸준한 현금 흐름보다는 장기적인 자산 성장을 목표로 할 때 가장 효과적인 전략입니다.'
                }
              ]}
              linkText="TR ETF 상품 검색하기"
              onBookmarkChange={(bookmarked) => console.log('북마크 상태:', bookmarked)}
              onLinkClick={() => alert('링크 클릭!')}
            />
          </div>

          {/* 열린 상태 (북마크됨) */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              4. 열린 상태 (북마크됨)
            </h3>
            <TipCard
              icon={iconSearch}
              title="TR ETF의 장점이 무엇인가요?"
              initialBookmarked={true}
              defaultOpen={true}
              tips={[
                {
                  title: '복리 효과 극대화',
                  content: '배당금을 받을 때마다 부과되는 세금을 즉시 내지 않고, 그 금액을 온전히 재투자해 장기적으로 자산이 더 빠르게 불어납니다.'
                },
                {
                  title: '번거로움 해소',
                  content: '배당금이 자동으로 재투자되기 때문에, 투자자가 일일이 재투자할 필요가 없어 관리가 편리합니다.'
                }
              ]}
              linkText="TR ETF 상품 검색하기"
              onBookmarkChange={(bookmarked) => console.log('북마크 상태:', bookmarked)}
              onLinkClick={() => alert('링크 클릭!')}
            />
          </div>

          {/* 인터랙티브 예제 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              5. 인터랙티브 예제 (북마크 토글 가능)
            </h3>
            <TipCard
              icon={iconBell}
              title="배당 ETF 투자 시 주의사항"
              initialBookmarked={false}
              tips={[
                {
                  title: '세금 고려',
                  content: '배당소득세가 부과되므로 장기 투자 시 복리 효과가 감소할 수 있습니다.'
                },
                {
                  title: '배당 재투자',
                  content: 'TR ETF를 선택하면 배당금이 자동 재투자되어 복리 효과를 극대화할 수 있습니다.'
                }
              ]}
              linkText="배당 ETF 상품 보기"
              onToggle={(isOpen) => console.log('토글 상태:', isOpen)}
              onBookmarkChange={(bookmarked) => console.log('북마크 상태:', bookmarked)}
              onLinkClick={() => console.log('링크 클릭')}
            />
          </div>
        </div>
        </div>

        {/* ToggleButton 컴포넌트 섹션 */}
        <div style={{
          backgroundColor: '#F7F7F8',
          padding: 'clamp(20px, 3vw, 32px)',
          borderRadius: '16px',
          border: '2px solid #E6E7EA'
        }}>
          <h2 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(16px, 2vw, 24px)',
            marginTop: 0
          }}>
            ToggleButton 컴포넌트
          </h2>

          <div style={{
            display: 'grid',
            gap: 'clamp(20px, 3vw, 24px)'
          }}>
          {/* StockFilterToggle - 하락 선택 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              1. 주가 필터 토글 - 하락 선택
            </h3>
            <StockFilterToggle value="down" />
          </div>

          {/* StockFilterToggle - 상승 선택 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              2. 주가 필터 토글 - 상승 선택
            </h3>
            <StockFilterToggle value="up" />
          </div>

          {/* StockFilterToggle - 인터랙티브 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              3. 주가 필터 토글 - 인터랙티브 (현재: {stockFilter === 'down' ? '하락' : '상승'})
            </h3>
            <StockFilterToggle
              value={stockFilter}
              onChange={(newValue) => {
                setStockFilter(newValue);
                console.log('주가 필터 변경:', newValue);
              }}
            />
          </div>

          {/* GeneralToggle - OFF */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              4. 일반 토글 - OFF (Medium)
            </h3>
            <GeneralToggle checked={false} size="medium" />
          </div>

          {/* GeneralToggle - ON */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              5. 일반 토글 - ON (Medium)
            </h3>
            <GeneralToggle checked={true} size="medium" />
          </div>

          {/* GeneralToggle - 인터랙티브 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              6. 일반 토글 - 인터랙티브 (현재: {generalToggle ? 'ON' : 'OFF'})
            </h3>
            <GeneralToggle
              checked={generalToggle}
              onChange={(newValue) => {
                setGeneralToggle(newValue);
                console.log('토글 상태 변경:', newValue);
              }}
            />
          </div>

          {/* GeneralToggle - Small Size */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              7. 일반 토글 - Small 사이즈
            </h3>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <GeneralToggle checked={false} size="small" />
              <GeneralToggle checked={true} size="small" />
            </div>
          </div>

          {/* SmallToggle - OFF */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              8. SmallToggle - OFF (45x24px)
            </h3>
            <SmallToggle checked={false} />
          </div>

          {/* SmallToggle - ON */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              9. SmallToggle - ON (45x24px)
            </h3>
            <SmallToggle checked={true} />
          </div>

          {/* SmallToggle - 인터랙티브 */}
          <div>
            <h3 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 500,
              color: '#1A1C20',
              marginBottom: '12px'
            }}>
              10. SmallToggle - 인터랙티브 (현재: {smallToggle ? 'ON' : 'OFF'})
            </h3>
            <SmallToggle
              checked={smallToggle}
              onChange={(newValue) => {
                setSmallToggle(newValue);
                console.log('Small 토글 상태 변경:', newValue);
              }}
            />
          </div>
        </div>
        </div>
      </div>

      {/* CaptionButton Components */}
      <div style={{
        marginTop: 'clamp(40px, 5vw, 60px)',
        padding: 'clamp(20px, 3vw, 40px)',
        backgroundColor: '#F8F9FA',
        borderRadius: '16px'
      }}>
        <h2 style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 700,
          marginBottom: 'clamp(20px, 3vw, 30px)',
          color: '#000000'
        }}>
          CaptionButton 컴포넌트
        </h2>

        {/* CaptionButton (아이콘 없음) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            marginBottom: '20px',
            color: '#000000'
          }}>
            CaptionButton (아이콘 없음)
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* Default */}
            <div style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E6E7EA'
            }}>
              <h4 style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                color: '#757E8F'
              }}>
                colorState="default"
              </h4>
              <CaptionButton
                colorState="default"
                onClick={() => console.log('Default 버튼 클릭')}
              />
            </div>

            {/* Primary */}
            <div style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E6E7EA'
            }}>
              <h4 style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                color: '#757E8F'
              }}>
                colorState="primary"
              </h4>
              <CaptionButton
                colorState="primary"
                onClick={() => console.log('Primary 버튼 클릭')}
              />
            </div>

            {/* Primary2 */}
            <div style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E6E7EA'
            }}>
              <h4 style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                color: '#757E8F'
              }}>
                colorState="primary2"
              </h4>
              <CaptionButton
                colorState="primary2"
                onClick={() => console.log('Primary2 버튼 클릭')}
              />
            </div>

            {/* Primary3 */}
            <div style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E6E7EA'
            }}>
              <h4 style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                color: '#757E8F'
              }}>
                colorState="primary3"
              </h4>
              <CaptionButton
                colorState="primary3"
                onClick={() => console.log('Primary3 버튼 클릭')}
              />
            </div>
          </div>
        </div>

        {/* CaptionIconButton (아이콘 포함) */}
        <div>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            marginBottom: '20px',
            color: '#000000'
          }}>
            CaptionIconButton (물음표 아이콘 포함)
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {/* Default */}
            <div style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E6E7EA'
            }}>
              <h4 style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                color: '#757E8F'
              }}>
                colorState="default"
              </h4>
              <CaptionIconButton
                colorState="default"
                onClick={() => console.log('Default 아이콘 버튼 클릭')}
              />
            </div>

            {/* Primary */}
            <div style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E6E7EA'
            }}>
              <h4 style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                color: '#757E8F'
              }}>
                colorState="primary"
              </h4>
              <CaptionIconButton
                colorState="primary"
                onClick={() => console.log('Primary 아이콘 버튼 클릭')}
              />
            </div>

            {/* Primary2 */}
            <div style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E6E7EA'
            }}>
              <h4 style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                color: '#757E8F'
              }}>
                colorState="primary2"
              </h4>
              <CaptionIconButton
                colorState="primary2"
                onClick={() => console.log('Primary2 아이콘 버튼 클릭')}
              />
            </div>

            {/* Primary3 */}
            <div style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E6E7EA'
            }}>
              <h4 style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                color: '#757E8F'
              }}>
                colorState="primary3"
              </h4>
              <CaptionIconButton
                colorState="primary3"
                onClick={() => console.log('Primary3 아이콘 버튼 클릭')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SelectionCard Component */}
      <div style={{
        marginTop: 'clamp(40px, 5vw, 60px)',
        padding: 'clamp(20px, 3vw, 40px)',
        backgroundColor: '#F8F9FA',
        borderRadius: '16px'
      }}>
        <h2 style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 700,
          marginBottom: 'clamp(20px, 3vw, 30px)',
          color: '#000000'
        }}>
          SelectionCard 컴포넌트
        </h2>

        <p style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '14px',
          color: '#757E8F',
          marginBottom: '20px'
        }}>
          투자성향 테스트 등에서 사용되는 선택 가능한 카드 버튼 (3가지 상태)
        </p>

        {/* Default 상태 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#000000'
          }}>
            state="default" (미선택)
          </h3>
          <SelectionCard
            title="독립 자금 개미"
            description="소극적 투자로 안전이 무조건 1순위예요."
            state="default"
            onClick={() => console.log('Default 카드 클릭')}
          />
        </div>

        {/* Non Select 상태 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#000000'
          }}>
            state="nonSelect" (비활성)
          </h3>
          <SelectionCard
            title="독립 자금 개미"
            description="소극적 투자로 안전이 무조건 1순위예요."
            state="nonSelect"
          />
        </div>

        {/* Select 상태 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#000000'
          }}>
            state="select" (선택됨)
          </h3>
          <SelectionCard
            title="독립 자금 개미"
            description="소극적 투자로 안전이 무조건 1순위예요."
            state="select"
            onClick={() => console.log('Select 카드 클릭')}
          />
        </div>

        {/* 인터랙티브 예시 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#000000'
          }}>
            인터랙티브 예시 (클릭해보세요)
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <SelectionCard
              title="소극적 투자 성향"
              description="안정적인 수익을 추구하는 보수적 투자자"
              state={selectedCard === 1 ? 'select' : selectedCard ? 'nonSelect' : 'default'}
              onClick={() => setSelectedCard(selectedCard === 1 ? null : 1)}
            />
            <SelectionCard
              title="중도적 투자 성향"
              description="리스크와 수익의 균형을 맞추는 투자자"
              state={selectedCard === 2 ? 'select' : selectedCard ? 'nonSelect' : 'default'}
              onClick={() => setSelectedCard(selectedCard === 2 ? null : 2)}
            />
            <SelectionCard
              title="적극적 투자 성향"
              description="높은 수익을 위해 리스크를 감수하는 투자자"
              state={selectedCard === 3 ? 'select' : selectedCard ? 'nonSelect' : 'default'}
              onClick={() => setSelectedCard(selectedCard === 3 ? null : 3)}
            />
          </div>
        </div>

        {/* 커스텀 아이콘 예시 */}
        <div>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#000000'
          }}>
            커스텀 아이콘 사용 예시
          </h3>
          <SelectionCard
            title="캐릭터 아이콘 사용"
            description="체크 아이콘 대신 커스텀 아이콘 사용 가능"
            state="select"
            icon={charAnt}
            onClick={() => console.log('커스텀 아이콘 카드 클릭')}
          />
        </div>
      </div>

      {/* Chip (태그) Components */}
      <div style={{
        marginTop: 'clamp(40px, 5vw, 60px)',
        padding: 'clamp(16px, 2vw, 24px)',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}>
        <h2 style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 700,
          color: '#1A1C20',
          marginBottom: 'clamp(16px, 2vw, 24px)'
        }}>
          Chip (태그) 컴포넌트
        </h2>

        {/* Primary 색상 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            Primary 색상
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip title="꾸준 인기" color="primary" state="select" showIcon={true} />
            <Chip title="꾸준 인기" color="primary" state="select" showIcon={false} />
          </div>
        </div>

        {/* Primary2 색상 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            Primary2 색상 (선택/비선택)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip title="꾸준 인기" color="primary2" state="select" />
            <Chip title="꾸준 인기" color="primary2" state="nonSelect" />
          </div>
        </div>

        {/* Grey 색상 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            Grey 색상 (선택/비선택)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip title="꾸준 인기" color="grey" state="select" />
            <Chip title="꾸준 인기" color="grey" state="nonSelect" />
          </div>
        </div>

        {/* Tab 색상 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            Tab 색상 (탭 구분용)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip title="꾸준 인기" color="tab" state="select" />
          </div>
        </div>

        {/* Default 색상 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            Default 색상
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip title="꾸준 인기" color="default" state="nonSelect" />
          </div>
        </div>

        {/* 트렌드 칩 (상승/하락) */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            트렌드 칩 (상승/하락)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip title="꾸준 인기" color="upTrend" showIcon={true} />
            <Chip title="꾸준 인기" color="downTrend" showIcon={true} />
          </div>
        </div>

        {/* 인터랙티브 예제 */}
        <div style={{ marginTop: 'clamp(32px, 4vw, 40px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            인터랙티브 예제 (클릭 가능)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip
              title="클릭하세요"
              color="primary"
              state="select"
              onClick={() => alert('칩을 클릭했습니다!')}
            />
            <Chip
              title="비활성화됨"
              color="grey"
              state="nonSelect"
              disabled={true}
            />
          </div>
        </div>
      </div>

      {/* StockChangeCard (주식 등락율 카드) Components */}
      <div style={{
        marginTop: 'clamp(40px, 5vw, 60px)',
        padding: 'clamp(16px, 2vw, 24px)',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}>
        <h2 style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 700,
          color: '#1A1C20',
          marginBottom: 'clamp(16px, 2vw, 24px)'
        }}>
          StockChangeCard (주식 등락율 카드)
        </h2>

        {/* 상승 예제 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            상승 (Up)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <StockChangeCard
              rank="1"
              name="양자 컴퓨터"
              changeRate="2.59"
              direction="up"
            />
            <StockChangeCard
              rank="2"
              name="삼성전자"
              changeRate="1.25"
              direction="up"
            />
          </div>
        </div>

        {/* 하락 예제 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            하락 (Down)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <StockChangeCard
              rank="1"
              name="양자 컴퓨터"
              changeRate="2.59"
              direction="down"
            />
            <StockChangeCard
              rank="3"
              name="SK하이닉스"
              changeRate="0.85"
              direction="down"
            />
          </div>
        </div>

        {/* 인터랙티브 예제 */}
        <div style={{ marginTop: 'clamp(32px, 4vw, 40px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            인터랙티브 예제 (클릭 가능)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <StockChangeCard
              rank="5"
              name="현대차"
              changeRate="3.42"
              direction="up"
              onClick={() => alert('현대차 카드를 클릭했습니다!')}
            />
          </div>
        </div>
      </div>

      {/* Label (라벨/뱃지) Components */}
      <div style={{
        marginTop: 'clamp(40px, 5vw, 60px)',
        padding: 'clamp(16px, 2vw, 24px)',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}>
        <h2 style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 700,
          color: '#1A1C20',
          marginBottom: 'clamp(16px, 2vw, 24px)'
        }}>
          Label (라벨/뱃지) 컴포넌트
        </h2>

        {/* Primary 색상 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            Primary 색상
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Label title="리벨런싱 필요" color="primary" />
            <Label title="리벨런싱 필요" color="primary2" />
          </div>
        </div>

        {/* Grey & Black 색상 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            Grey & Black 색상
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Label title="리벨런싱 필요" color="grey" />
            <Label title="리벨런싱 필요" color="black" />
          </div>
        </div>

        {/* 상승/하락 색상 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            상승/하락 색상
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Label title="리벨런싱 필요" color="down" />
            <Label title="리벨런싱 필요" color="down2" />
            <Label title="리벨런싱 필요" color="up" />
            <Label title="리벨런싱 필요" color="up2" />
          </div>
        </div>

        {/* 인터랙티브 예제 */}
        <div style={{ marginTop: 'clamp(32px, 4vw, 40px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            인터랙티브 예제 (클릭 가능)
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Label
              title="클릭하세요"
              color="primary"
              onClick={() => alert('라벨을 클릭했습니다!')}
            />
            <Label
              title="비활성화됨"
              color="grey"
              disabled={true}
            />
          </div>
        </div>
      </div>

      {/* RebalanceButton (리벨런싱 버튼) Components */}
      <div style={{
        marginTop: 'clamp(40px, 5vw, 60px)',
        padding: 'clamp(16px, 2vw, 24px)',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}>
        <h2 style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 700,
          color: '#1A1C20',
          marginBottom: 'clamp(16px, 2vw, 24px)'
        }}>
          RebalanceButton (리벨런싱 버튼)
        </h2>

        {/* Default 상태 - Primary 색상 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            Primary 색상
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <RebalanceButton title="리벨런싱" color="primary" state="default" />
            <RebalanceButton title="리벨런싱" color="primary2" state="default" />
          </div>
        </div>

        {/* Default 상태 - 상승/하락 색상 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            상승/하락 색상
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <RebalanceButton title="리벨런싱" color="down" state="default" />
            <RebalanceButton title="리벨런싱" color="down2" state="default" />
            <RebalanceButton title="리벨런싱" color="up" state="default" />
            <RebalanceButton title="리벨런싱" color="up2" state="default" />
          </div>
        </div>

        {/* Default 상태 - Grey 색상 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            Grey 색상
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <RebalanceButton title="리벨런싱" color="grey" state="default" />
            <RebalanceButton title="리벨런싱" color="grey2" state="default" />
            <RebalanceButton title="리벨런싱" color="grey3" state="default" />
          </div>
        </div>

        {/* Skeleton 상태 */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            Skeleton 상태 (로딩/비활성)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <RebalanceButton title="리벨런싱 필요" color="primary" state="skeleton" />
            <RebalanceButton title="리벨런싱 필요" color="down" state="skeleton" />
            <RebalanceButton title="리벨런싱 필요" color="grey" state="skeleton" />
          </div>
        </div>

        {/* 인터랙티브 예제 */}
        <div style={{ marginTop: 'clamp(32px, 4vw, 40px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            인터랙티브 예제 (클릭 가능)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <RebalanceButton
              title="리벨런싱"
              color="down"
              state="default"
              onClick={() => alert('리벨런싱 버튼을 클릭했습니다!')}
            />
            <RebalanceButton
              title="비활성화됨"
              color="grey2"
              state="default"
              disabled={true}
            />
          </div>
        </div>
      </div>

      {/* RebalanceInfoCard (리벨런싱 정보 카드) Components */}
      <div style={{
        marginTop: 'clamp(40px, 5vw, 60px)',
        padding: 'clamp(16px, 2vw, 24px)',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}>
        <h2 style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 700,
          color: '#1A1C20',
          marginBottom: 'clamp(16px, 2vw, 24px)'
        }}>
          RebalanceInfoCard (리벨런싱 정보 카드)
        </h2>

        {/* 기본 상태 (간략히) */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            기본 상태 (간략히)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <RebalanceInfoCard
              title="리밸런싱 정보"
              isExpanded={false}
              totalValue="123,345,677"
              netProfit="123,345,677"
              isProfitMode={true}
              changeRate="n"
              needsRebalance={true}
              rebalanceReason="리밸런싱을 통해 하락에 대비할 수 있어요."
            />
          </div>
        </div>

        {/* 펼친 상태 (자세히) */}
        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            펼친 상태 (자세히)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <RebalanceInfoCard
              title="리밸런싱 정보"
              isExpanded={true}
              totalValue="123,345,677"
              netProfit="123,345,677"
              isProfitMode={true}
              changeRate="n"
              needsRebalance={true}
              rebalanceReason="리밸런싱을 통해 하락에 대비할 수 있어요."
            />
          </div>
        </div>

        {/* 인터랙티브 예제 */}
        <div style={{ marginTop: 'clamp(32px, 4vw, 40px)' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 600,
            color: '#1A1C20',
            marginBottom: 'clamp(12px, 1.5vw, 16px)'
          }}>
            인터랙티브 예제 (토글 가능)
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <RebalanceInfoCard
              title="리밸런싱 정보"
              isExpanded={isRebalanceExpanded}
              onToggleExpand={() => setIsRebalanceExpanded(!isRebalanceExpanded)}
              totalValue="123,345,677"
              netProfit="123,345,677"
              isProfitMode={isProfitMode}
              onProfitModeToggle={() => setIsProfitMode(!isProfitMode)}
              changeRate="5"
              onChangeRateClick={() => alert('설정 변화율 클릭!')}
              needsRebalance={true}
              rebalanceReason="리밸런싱을 통해 하락에 대비할 수 있어요."
            />
          </div>
        </div>
      </div>

      {/* RebalanceETFCard 컴포넌트 섹션 */}
      <div style={{
        marginTop: 'clamp(40px, 5vw, 60px)',
        padding: 'clamp(20px, 3vw, 40px)',
        backgroundColor: '#F8F9FA',
        borderRadius: '16px'
      }}>
        <h2 style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 700,
          marginBottom: 'clamp(20px, 3vw, 30px)',
          color: '#000000'
        }}>
          RebalanceETFCard 컴포넌트
        </h2>

        <p style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '14px',
          color: '#757E8F',
          marginBottom: '20px'
        }}>
          리밸런싱 계획을 보여주는 ETF 카드 컴포넌트 (2가지 변형)
        </p>

        {/* Default 변형 */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            marginBottom: '20px',
            color: '#000000'
          }}>
            variant="default" (기본형 - 현재 비중 표시)
          </h3>

          <div style={{ marginBottom: '30px' }}>
            <h4 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '12px',
              color: '#474C57'
            }}>
              매수 액션
            </h4>
            <RebalanceETFCard
              title="2차 전지 TIGER x2"
              targetWeight="10"
              currentWeight="100"
              adjustedWeight="100"
              shares="2"
              actionType="buy"
              actionShares="3"
              actionText="3주를 매수할께요"
              pricePerShare="123,456,789"
              totalAmount="123,456,789"
              variant="default"
              onClick={() => console.log('Default 카드 클릭')}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h4 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '12px',
              color: '#474C57'
            }}>
              매도 액션
            </h4>
            <RebalanceETFCard
              title="S&P 500 ETF"
              targetWeight="15"
              currentWeight="120"
              adjustedWeight="95"
              shares="5"
              actionType="sell"
              actionShares="2"
              actionText="2주를 매도할께요"
              pricePerShare="85,000"
              totalAmount="170,000"
              variant="default"
            />
          </div>
        </div>

        {/* Variant2 변형 */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 600,
            marginBottom: '20px',
            color: '#000000'
          }}>
            variant="variant2" (간단한 형태)
          </h3>

          <div style={{ marginBottom: '30px' }}>
            <h4 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '12px',
              color: '#474C57'
            }}>
              매수 액션
            </h4>
            <RebalanceETFCard
              title="2차 전지 TIGER x2"
              targetWeight="10"
              adjustedWeight="100"
              actionShares="2"
              actionType="buy"
              pricePerShare="123,456,789"
              totalAmount="123,456,789"
              variant="variant2"
              onClick={() => console.log('Variant2 카드 클릭')}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h4 style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '12px',
              color: '#474C57'
            }}>
              매도 액션
            </h4>
            <RebalanceETFCard
              title="나스닥 100 ETF"
              targetWeight="20"
              adjustedWeight="80"
              actionShares="3"
              actionType="sell"
              pricePerShare="95,000"
              totalAmount="285,000"
              variant="variant2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconShowcase;
