import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { BottomNav } from './components/common/BottomNav'
import { TrackingProvider } from './contexts/TrackingContext'
import IconShowcase from './pages/Dev/IconShowcase'
import Vocabulary from './pages/Vocabulary'
import MyPage from './pages/MyPage'
import Bookmark from './pages/Bookmark'
import HomePage from './pages/Home'
import Portfolio from './pages/Portfolio'
import PortfolioDelete from './pages/Portfolio/PortfolioDelete'
import PortfolioDetail from './pages/Portfolio/PortfolioDetail'
import ETFDetail from './pages/ETFDetail'
import InterestETF from './pages/InterestETF'
import ThemeDetail from './pages/Theme/ThemeDetail'
import Search from './pages/Search'
import PortfolioCreate from './pages/PortfolioCreate'
import Rebalance from './pages/Rebalance'
import MethodSelection from './pages/PortfolioCreate/MethodSelection'
import AutoCreate from './pages/PortfolioCreate/AutoCreate'
import AutoCreateStep2 from './pages/PortfolioCreate/AutoCreateStep2'
import AutoCreateStep3 from './pages/PortfolioCreate/AutoCreateStep3'
import AutoCreateStep4 from './pages/PortfolioCreate/AutoCreateStep4'
import AutoCreateStep5 from './pages/PortfolioCreate/AutoCreateStep5'
import ManualCreateStep2 from './pages/PortfolioCreate/ManualCreateStep2'
import ManualCreateStep3 from './pages/PortfolioCreate/ManualCreateStep3'
import './App.css'

function AppContent() {
  const location = useLocation();

  // 브라우저의 자동 스크롤 복원 비활성화
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // 페이지 이동 시 스크롤을 맨 위로 초기화
  useEffect(() => {
    // location.state에 skipScrollReset이 있으면 스크롤 초기화 건너뛰기
    if (location.state?.skipScrollReset) {
      return;
    }

    // 즉시 스크롤 초기화
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 브라우저의 스크롤 복원보다 늦게 실행되도록 setTimeout 사용
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname, location.state]);

  const isDevPage = location.pathname.startsWith('/dev');
  const isVocabularyPage = location.pathname === '/vocabulary';
  const isBookmarkPage = location.pathname === '/bookmark';
  const isHomePage = location.pathname === '/home';
  const isPortfolioCreatePage = location.pathname.startsWith('/portfolio/create');
  const isRebalancePage = location.pathname.includes('/rebalance');
  const isPortfolioDeletePage = location.pathname === '/portfolio/delete';
  const isPortfolioDetailPage = location.pathname.includes('/portfolio/') && location.pathname.includes('/detail');
  const isETFDetailPage = location.pathname.includes('/etf/') && location.pathname.includes('/detail');
  const isInterestETFPage = location.pathname === '/interest-etf';
  const isThemeDetailPage = location.pathname.includes('/theme/');
  const hideBottomNav = isDevPage || isVocabularyPage || isBookmarkPage || isPortfolioCreatePage || isRebalancePage || isPortfolioDeletePage || isPortfolioDetailPage || isETFDetailPage || isInterestETFPage || isThemeDetailPage;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '-webkit-fill-available',
      width: '100%',
      maxWidth: isDevPage ? 'none' : '430px',
      margin: '0 auto',
      position: 'relative',
      backgroundColor: '#ffffff'
    }}>
      <main style={{
        flex: 1,
        paddingBottom: (hideBottomNav || isHomePage) ? '0' : '88px', // BottomNav 높이 (54px) + 홈 인디케이터 영역 (34px)
        width: '100%'
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/delete" element={<PortfolioDelete />} />
          <Route path="/portfolio/:id/detail" element={<PortfolioDetail />} />
          <Route path="/etf/:id/detail" element={<ETFDetail />} />
          <Route path="/interest-etf" element={<InterestETF />} />
          <Route path="/theme" element={<ThemeDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/portfolio/create" element={<PortfolioCreate />} />
          <Route path="/portfolio/create/method" element={<MethodSelection />} />
          <Route path="/portfolio/create/auto" element={<AutoCreate />} />
          <Route path="/portfolio/create/auto/step2" element={<AutoCreateStep2 />} />
          <Route path="/portfolio/create/auto/step3" element={<AutoCreateStep3 />} />
          <Route path="/portfolio/create/auto/step4" element={<AutoCreateStep4 />} />
          <Route path="/portfolio/create/auto/step5" element={<AutoCreateStep5 />} />
          <Route path="/portfolio/create/step1" element={<AutoCreateStep4 />} />
          <Route path="/portfolio/create/step2" element={<ManualCreateStep2 />} />
          <Route path="/portfolio/create/step3" element={<ManualCreateStep3 />} />
          <Route path="/portfolio/create/step4" element={<AutoCreateStep5 />} />
          <Route path="/portfolio/:id/rebalance" element={<Rebalance />} />
          <Route path="/portfolio/:id/rebalance/add-etf" element={<ManualCreateStep2 mode="add" />} />
          {/* 개발용 페이지 */}
          <Route path="/dev/icons" element={<IconShowcase />} />
        </Routes>
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <TrackingProvider>
        <AppContent />
      </TrackingProvider>
    </Router>
  )
}

export default App
