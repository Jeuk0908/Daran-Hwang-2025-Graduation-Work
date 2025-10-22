import { useEffect } from 'react';

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

      <div style={{
        marginTop: 'clamp(40px, 5vw, 60px)',
        padding: 'clamp(16px, 2vw, 24px)',
        backgroundColor: '#E0EEFF',
        borderRadius: '12px',
        maxWidth: '800px',
        margin: 'clamp(40px, 5vw, 60px) auto 0'
      }}>
        <h3 style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: 'clamp(14px, 1.8vw, 18px)',
          fontWeight: 600,
          color: '#005CCC',
          marginBottom: 'clamp(8px, 1.5vw, 12px)'
        }}>
          사용 방법
        </h3>
        <pre style={{
          fontFamily: 'monospace',
          fontSize: 'clamp(11px, 1.4vw, 13px)',
          color: '#1A1C20',
          backgroundColor: '#ffffff',
          padding: 'clamp(12px, 2vw, 16px)',
          borderRadius: '8px',
          overflow: 'auto',
          margin: 0,
          lineHeight: '1.6'
        }}>
{`// SVG 파일 직접 import
import iconSearch from '@/assets/icon_search.svg';

// 이미지로 사용
<img src={iconSearch} alt="검색" width={24} height={24} />

// 캐릭터 아이콘 사용
import charBeaver from '@/assets/목표를 향해 비버.svg';
<img src={charBeaver} alt="비버" width={48} height={48} />`}
        </pre>
      </div>
    </div>
  );
};

export default IconShowcase;
