import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { BottomNav } from './components/common/BottomNav'
import IconShowcase from './pages/Dev/IconShowcase'
import Vocabulary from './pages/Vocabulary'
import MyPage from './pages/MyPage'
import Bookmark from './pages/Bookmark'
import HomePage from './pages/Home'
import Portfolio from './pages/Portfolio'
import PortfolioCreate from './pages/PortfolioCreate'
import MethodSelection from './pages/PortfolioCreate/MethodSelection'
import AutoCreate from './pages/PortfolioCreate/AutoCreate'
import AutoCreateStep2 from './pages/PortfolioCreate/AutoCreateStep2'
import AutoCreateStep3 from './pages/PortfolioCreate/AutoCreateStep3'
import AutoCreateStep4 from './pages/PortfolioCreate/AutoCreateStep4'
import AutoCreateStep5 from './pages/PortfolioCreate/AutoCreateStep5'
import './App.css'

// 임시 페이지 컴포넌트들
const ArtistPage = () => <div style={{ padding: '20px', paddingTop: 'max(env(safe-area-inset-top), 12px)' }}><h1>작가 페이지</h1></div>

function AppContent() {
  const location = useLocation();
  const isDevPage = location.pathname.startsWith('/dev');
  const isVocabularyPage = location.pathname === '/vocabulary';
  const isBookmarkPage = location.pathname === '/bookmark';
  const isHomePage = location.pathname === '/home';
  const isPortfolioCreatePage = location.pathname.startsWith('/portfolio/create');
  const hideBottomNav = isDevPage || isVocabularyPage || isBookmarkPage || isPortfolioCreatePage;

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
        // overflowX 제거: position: sticky가 동작하지 않는 원인
        // 대신 각 페이지/컴포넌트에서 max-width로 가로 스크롤 방지
        width: '100%'
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/artist" element={<ArtistPage />} />
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
      <AppContent />
    </Router>
  )
}

export default App
