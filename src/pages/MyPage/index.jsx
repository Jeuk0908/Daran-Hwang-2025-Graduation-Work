import { useNavigate } from 'react-router-dom';
import { TopNav } from '../../components/common/TopNav';
import { AssetCard } from '../../components/common/AssetCard';
import { MenuCard } from '../../components/common/MenuCard';
import { SettingSection } from '../../components/common/SettingSection';
import { SettingItem } from '../../components/common/SettingItem';
import vocabularyIcon from '../../assets/단어장.svg';
import { LAYOUT } from '../../constants/layout';

const MyPage = () => {
  const navigate = useNavigate();

  // 용어 백과 클릭 핸들러
  const handleVocabularyClick = () => {
    navigate('/vocabulary');
  };

  // 북마크 클릭 핸들러
  const handleBookmarkClick = () => {
    navigate('/bookmark');
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        paddingTop: LAYOUT.SAFE_AREA_TOP,
        paddingBottom: '35px'
      }}
    >
      {/* 상단 네비게이션 */}
      <div style={{ padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px` }}>
        <TopNav
          title="투자 일지"
          depth="1"
          state="icon"
          showBackButton={false}
          showTitle={true}
          showIconL={false}
          showIconR={false}
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div
        style={{
          padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: `${LAYOUT.CARD_GAP}px`,
          marginTop: `${LAYOUT.TOP_NAV_MARGIN}px`
        }}
      >
        {/* 순자산 카드 */}
        <AssetCard userName="민수" amount="999,999,999" />

        {/* 용어 백과 카드 */}
        <MenuCard
          icon={vocabularyIcon}
          title="용어 백과"
          count="16/50"
          onClick={handleVocabularyClick}
          variant="large"
        />

        {/* 북마크 & 달성 보관함 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10.5px',
            width: '100%'
          }}
        >
          <div style={{ flex: 1 }}>
            <MenuCard
              title="북마크"
              count="16건"
              variant="small"
              onClick={handleBookmarkClick}
            />
          </div>
          <div style={{ flex: 1 }}>
            <MenuCard title="달성 보관함" count="2건" variant="small" />
          </div>
        </div>
      </div>

      {/* 설정 섹션들 */}
      <div
        style={{
          padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          marginTop: '40px'
        }}
      >
        {/* 개인 맞춤 설정 */}
        <SettingSection title="개인 맞춤 설정">
          <SettingItem title="알림 설정" />
          <SettingItem title="화면 설정" showBorder={false} />
        </SettingSection>

        {/* 계정 및 보안 */}
        <SettingSection title="계정 및 보안">
          <SettingItem title="보안 설정" />
          <SettingItem title="계정 관리" />
          <SettingItem title="데이터 관리" showBorder={false} />
        </SettingSection>

        {/* 정보 및 지원 */}
        <SettingSection title="정보 및 지원">
          <SettingItem title="개인정보 및 약관" />
          <SettingItem title="고객 지원" showBorder={false} />
        </SettingSection>
      </div>
    </div>
  );
};

export default MyPage;
