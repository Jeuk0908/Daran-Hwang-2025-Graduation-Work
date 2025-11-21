import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { BottomNav } from './components/common/BottomNav'
import { QuitButton } from './components/common/QuitButton'
import { TrackingProvider } from './contexts/TrackingContext'
import { AutoTracker } from './components/common/AutoTracker'
import { useTracking } from './hooks/useTracking'
import { useInactivityTimer } from './hooks/useInactivityTimer'
import { InactivityWarning } from './components/common/InactivityWarning'
import { clearActiveMission } from './utils/missionStorage'
import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import MissionSelection from './pages/MissionSelection'
import MissionStart from './pages/MissionStart'
import MissionQuit from './pages/MissionQuit'
import MissionComplete from './pages/MissionComplete'
import MissionRating from './pages/MissionRating'
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
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(location.pathname === '/');
  const tracking = useTracking();
  const [showWarning, setShowWarning] = useState(false);

  // 페이지 경로 체크 (비활동 타이머 제외 페이지 판단에 사용)
  const isSplashPage = location.pathname === '/';
  const isOnboardingPage = location.pathname === '/onboarding';
  const isMissionSelectionPage = location.pathname === '/mission-selection';
  const isMissionStartPage = location.pathname === '/mission-start';
  const isMissionQuitPage = location.pathname === '/mission-quit';
  const isMissionCompletePage = location.pathname === '/mission-complete';
  const isMissionRatingPage = location.pathname === '/mission-rating';

  // 디버깅: tracking 상태 로그
  useEffect(() => {
    console.log('[App] Tracking state changed:', {
      activeMission: tracking.activeMission,
      sessionId: tracking.sessionId,
      attemptId: tracking.attemptId,
      isConnected: tracking.isConnected,
      timerActive: !!tracking.activeMission
    })
  }, [tracking.activeMission, tracking.sessionId, tracking.attemptId, tracking.isConnected])

  // 자동 포기 처리 함수
  const handleAutoQuit = useCallback(async () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('[App] 🔴 AUTO-QUIT TRIGGERED (2 minutes inactivity)')
    console.log('[App] Mission:', tracking.activeMission)
    console.log('[App] Session ID:', tracking.sessionId)
    console.log('[App] Attempt ID:', tracking.attemptId)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    try {
      // 경고 화면 닫기
      console.log('[App] Step 0/5: Closing warning screen...')
      setShowWarning(false)
      console.log('[App] ✓ Step 0/5: Warning screen closed')

      // 미션 포기 이벤트 전송
      console.log('[App] Step 1/5: Sending mission_quitted event...')
      await tracking.trackMissionQuitted('자동 포기 (2분 비활동)', null)
      console.log('[App] ✓ Step 1/5: Event sent successfully')

      // WebSocket 연결 종료
      console.log('[App] Step 2/5: Stopping WebSocket tracking...')
      tracking.stopTracking()
      console.log('[App] ✓ Step 2/5: WebSocket disconnected')

      // 미션 상태 초기화
      console.log('[App] Step 3/5: Clearing mission state from localStorage...')
      clearActiveMission()
      console.log('[App] ✓ Step 3/5: Mission state cleared')

      // 스플래시 페이지로 이동
      console.log('[App] Step 4/5: Navigating to splash screen...')
      navigate('/', { replace: true, state: { resetSplash: true } })
      console.log('[App] ✓ Step 4/5: Navigation triggered')
      console.log('[App] ✅ AUTO-QUIT COMPLETED SUCCESSFULLY')

    } catch (error) {
      console.error('[App] ❌ AUTO-QUIT ERROR:', error)
      console.error('[App] Error details:', error.message, error.stack)

      // 에러가 발생해도 미션 종료 프로세스 진행
      console.log('[App] Proceeding with fallback cleanup...')
      setShowWarning(false)
      clearActiveMission()
      navigate('/', { replace: true, state: { resetSplash: true } })
      console.log('[App] ⚠️ AUTO-QUIT COMPLETED WITH ERRORS')
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  }, [tracking, navigate])

  // 경고 표시 콜백 (useCallback으로 메모이제이션)
  const handleWarning = useCallback(() => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('[App] ⚠️ INACTIVITY WARNING TRIGGERED')
    console.log('[App] 90 seconds of inactivity detected')
    console.log('[App] 30 seconds remaining before auto-quit')
    console.log('[App] Mission:', tracking.activeMission)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    setShowWarning(true)
  }, [tracking.activeMission])

  // 비활동 타이머 제외 페이지들
  const isInactivityTimerExcludedPage = isSplashPage || isOnboardingPage ||
    isMissionSelectionPage || isMissionStartPage || isMissionQuitPage ||
    isMissionCompletePage || isMissionRatingPage

  // 비활동 타이머 (2분 비활동 시 자동 포기)
  useInactivityTimer({
    isActive: !!tracking.activeMission && !isInactivityTimerExcludedPage,
    onWarning: handleWarning,
    onTimeout: handleAutoQuit,
    warningTime: 90000, // 1분 30초
    timeoutDuration: 120000 // 2분
  })

  // showWarning 상태 변화 추적
  useEffect(() => {
    console.log('[App] 📊 showWarning state changed:', showWarning)
    if (!showWarning) {
      console.log('[App] ✅ Inactivity warning is now hidden')
    } else {
      console.log('[App] ⚠️ Inactivity warning is now visible')
    }
  }, [showWarning])

  // onDismiss 콜백 (경고 닫기)
  const handleDismissWarning = useCallback(() => {
    console.log('[App] 🔔 handleDismissWarning called, setting showWarning to false')
    setShowWarning(false)
  }, [])

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

  // 추가 페이지 체크 (네비게이션 표시 여부 등에 사용)
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
  const hideBottomNav = isDevPage || isVocabularyPage || isBookmarkPage || isSplashPage || isOnboardingPage || isMissionSelectionPage || isMissionStartPage || isMissionQuitPage || isMissionCompletePage || isMissionRatingPage || isPortfolioCreatePage || isRebalancePage || isPortfolioDeletePage || isPortfolioDetailPage || isETFDetailPage || isInterestETFPage || isThemeDetailPage;

  // 포기하기 버튼을 숨길 페이지들 (스플래시, 온보딩, 미션 선택, 미션 시작, 미션 포기, 미션 완료, 미션 평가)
  const hideQuitButton = isSplashPage || isOnboardingPage || isMissionSelectionPage || isMissionStartPage || isMissionQuitPage || isMissionCompletePage || isMissionRatingPage;

  // resetSplash 플래그 확인하여 스플래시 다시 표시
  useEffect(() => {
    if (location.state?.resetSplash && location.pathname === '/') {
      setShowSplash(true)
    }
  }, [location.state, location.pathname])

  // 스플래시 완료 처리
  useEffect(() => {
    if (location.pathname === '/' && !showSplash) {
      navigate('/onboarding', { replace: true })
    }
  }, [location.pathname, showSplash, navigate])

  const handleSplashComplete = () => {
    // 즉시 네비게이션하여 온보딩 페이지 렌더링
    navigate('/onboarding', { replace: true })

    // 애니메이션 완료 후 스플래시 제거
    setTimeout(() => {
      setShowSplash(false)
    }, 600)
  }

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
      {/* 자동 추적 */}
      <AutoTracker />

      {/* 비활동 경고 */}
      {showWarning && <InactivityWarning onDismiss={handleDismissWarning} />}

      {/* 스플래시 오버레이 */}
      {showSplash && <Splash onComplete={handleSplashComplete} />}

      <main style={{
        flex: 1,
        paddingBottom: (hideBottomNav || isHomePage) ? '0' : '88px', // BottomNav 높이 (54px) + 홈 인디케이터 영역 (34px)
        width: '100%'
      }}>
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/mission-selection" element={<MissionSelection />} />
          <Route path="/mission-start" element={<MissionStart />} />
          <Route path="/mission-quit" element={<MissionQuit />} />
          <Route path="/mission-complete" element={<MissionComplete />} />
          <Route path="/mission-rating" element={<MissionRating />} />
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
          <Route path="/portfolio/:id/rebalance/step3" element={<ManualCreateStep3 />} />
          {/* 개발용 페이지 */}
          <Route path="/dev/icons" element={<IconShowcase />} />
        </Routes>
      </main>
      {!hideBottomNav && <BottomNav />}
      {!hideQuitButton && <QuitButton />}
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
