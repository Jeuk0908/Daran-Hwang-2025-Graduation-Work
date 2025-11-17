/**
 * 포트폴리오 저장/불러오기 유틸리티
 * localStorage를 사용하여 포트폴리오 데이터 관리
 */

const PORTFOLIO_STORAGE_KEY = 'portfolios';
const DEFAULT_PORTFOLIO_BOOKMARK_KEY = 'defaultPortfolioBookmarked';
const DEFAULT_PORTFOLIO_DATA_KEY = 'defaultPortfolioData';
const PORTFOLIO_ORDER_KEY = 'portfolioOrder';

/**
 * 모든 포트폴리오 가져오기
 * @returns {Array} 포트폴리오 배열
 */
export const getPortfolios = () => {
  try {
    const data = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('포트폴리오 불러오기 실패:', error);
    return [];
  }
};

/**
 * 새 포트폴리오 추가
 * @param {Object} portfolio - 포트폴리오 데이터
 * @returns {Object} 저장된 포트폴리오 (ID 포함)
 */
export const addPortfolio = (portfolio) => {
  try {
    const portfolios = getPortfolios();

    // 랜덤 금액: 1백만원 ~ 1억원
    const randomAmount = Math.floor(Math.random() * (100000000 - 1000000 + 1)) + 1000000;

    // 랜덤 수익률: -15% ~ +15%
    const randomReturnRate = (Math.random() * 30 - 15).toFixed(2);

    // 목표 수익: 현재 금액의 10% ~ 30%
    const currentProfit = Math.floor(randomAmount * (parseFloat(randomReturnRate) / 100));
    const targetProfit = Math.floor(randomAmount * (Math.random() * 0.2 + 0.1)); // 10% ~ 30%

    const newPortfolio = {
      ...portfolio,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      amount: randomAmount,
      returnRate: parseFloat(randomReturnRate),
      targetProfit: targetProfit
    };
    portfolios.push(newPortfolio);
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolios));

    // 포트폴리오 순서에 추가 (맨 뒤에)
    const currentOrder = getPortfolioOrder();
    currentOrder.push(newPortfolio.id);
    setPortfolioOrder(currentOrder);

    return newPortfolio;
  } catch (error) {
    console.error('포트폴리오 저장 실패:', error);
    throw error;
  }
};

/**
 * 포트폴리오 ID로 가져오기
 * @param {string} id - 포트폴리오 ID
 * @returns {Object|null} 포트폴리오 데이터
 */
export const getPortfolioById = (id) => {
  const portfolios = getPortfolios();
  return portfolios.find(p => p.id === id) || null;
};

/**
 * 포트폴리오 업데이트
 * @param {string} id - 포트폴리오 ID
 * @param {Object} updates - 업데이트할 데이터
 * @returns {Object|null} 업데이트된 포트폴리오
 */
export const updatePortfolio = (id, updates) => {
  try {
    const portfolios = getPortfolios();
    const index = portfolios.findIndex(p => p.id === id);
    if (index === -1) return null;

    portfolios[index] = {
      ...portfolios[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolios));
    return portfolios[index];
  } catch (error) {
    console.error('포트폴리오 업데이트 실패:', error);
    throw error;
  }
};

/**
 * 포트폴리오 삭제
 * @param {string} id - 포트폴리오 ID
 * @returns {boolean} 성공 여부
 */
export const deletePortfolio = (id) => {
  try {
    const portfolios = getPortfolios();
    const filtered = portfolios.filter(p => p.id !== id);
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(filtered));

    // 포트폴리오 순서에서도 제거
    const currentOrder = getPortfolioOrder();
    const newOrder = currentOrder.filter(portfolioId => portfolioId !== id);
    setPortfolioOrder(newOrder);

    return true;
  } catch (error) {
    console.error('포트폴리오 삭제 실패:', error);
    return false;
  }
};

/**
 * 대표 포트폴리오로 설정
 * @param {string} id - 포트폴리오 ID
 * @returns {boolean} 성공 여부
 */
export const setMainPortfolio = (id) => {
  try {
    const portfolios = getPortfolios();
    const updated = portfolios.map(p => ({
      ...p,
      isMainPortfolio: p.id === id
    }));
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('대표 포트폴리오 설정 실패:', error);
    return false;
  }
};

/**
 * 기본 포트폴리오 즐겨찾기 상태 가져오기
 * @returns {boolean}
 */
export const getDefaultPortfolioBookmark = () => {
  try {
    const value = localStorage.getItem(DEFAULT_PORTFOLIO_BOOKMARK_KEY);
    if (value === null) {
      // 초기값: 기본 포트폴리오가 즐겨찾기됨
      return true;
    }
    return value === 'true';
  } catch (error) {
    return true;
  }
};

/**
 * 기본 포트폴리오 즐겨찾기 상태 설정
 * @param {boolean} isBookmarked
 */
export const setDefaultPortfolioBookmark = (isBookmarked) => {
  try {
    localStorage.setItem(DEFAULT_PORTFOLIO_BOOKMARK_KEY, isBookmarked.toString());
  } catch (error) {
    console.error('기본 포트폴리오 즐겨찾기 설정 실패:', error);
  }
};

/**
 * 기본 포트폴리오 데이터 가져오기 (금액, 수익률, 목표 수익)
 * @returns {Object} { amount, returnRate, targetProfit }
 */
export const getDefaultPortfolioData = () => {
  try {
    const data = localStorage.getItem(DEFAULT_PORTFOLIO_DATA_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      // 기존 데이터에 targetProfit이 없으면 추가
      if (!parsedData.targetProfit) {
        parsedData.targetProfit = Math.floor(parsedData.amount * (Math.random() * 0.2 + 0.1));
        localStorage.setItem(DEFAULT_PORTFOLIO_DATA_KEY, JSON.stringify(parsedData));
      }
      return parsedData;
    }
    // 저장된 데이터가 없으면 랜덤 생성
    const randomAmount = Math.floor(Math.random() * (100000000 - 1000000 + 1)) + 1000000;
    const randomReturnRate = parseFloat((Math.random() * 30 - 15).toFixed(2));
    const targetProfit = Math.floor(randomAmount * (Math.random() * 0.2 + 0.1)); // 10% ~ 30%
    const newData = { amount: randomAmount, returnRate: randomReturnRate, targetProfit: targetProfit };
    localStorage.setItem(DEFAULT_PORTFOLIO_DATA_KEY, JSON.stringify(newData));
    return newData;
  } catch (error) {
    console.error('기본 포트폴리오 데이터 불러오기 실패:', error);
    return { amount: 10000000, returnRate: 5.0, targetProfit: 2000000 };
  }
};

/**
 * 포트폴리오 순서 가져오기
 * @returns {Array} 포트폴리오 ID 배열
 */
export const getPortfolioOrder = () => {
  try {
    const order = localStorage.getItem(PORTFOLIO_ORDER_KEY);
    return order ? JSON.parse(order) : ['default-1'];
  } catch (error) {
    console.error('포트폴리오 순서 불러오기 실패:', error);
    return ['default-1'];
  }
};

/**
 * 포트폴리오 순서 저장
 * @param {Array} order - 포트폴리오 ID 배열
 */
export const setPortfolioOrder = (order) => {
  try {
    localStorage.setItem(PORTFOLIO_ORDER_KEY, JSON.stringify(order));
  } catch (error) {
    console.error('포트폴리오 순서 저장 실패:', error);
  }
};

/**
 * 즐겨찾기 토글 (전체 포트폴리오 중 1개만 즐겨찾기 가능)
 * @param {string} id - 포트폴리오 ID ('default-1'이면 기본 포트폴리오)
 * @param {Array} currentOrder - 현재 포트폴리오 순서 배열
 * @returns {boolean} 성공 여부
 */
export const toggleBookmark = (id, currentOrder) => {
  try {
    // 현재 순서에서 클릭된 포트폴리오를 맨 앞으로 이동
    const newOrder = [id, ...currentOrder.filter(portfolioId => portfolioId !== id)];
    setPortfolioOrder(newOrder);

    // 기본 포트폴리오 즐겨찾기 상태 업데이트
    setDefaultPortfolioBookmark(id === 'default-1');

    // 사용자 생성 포트폴리오의 즐겨찾기 상태 업데이트
    const portfolios = getPortfolios();
    const updated = portfolios.map(p => ({
      ...p,
      isBookmarked: p.id === id
    }));
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(updated));

    return true;
  } catch (error) {
    console.error('즐겨찾기 토글 실패:', error);
    return false;
  }
};

/**
 * 포트폴리오의 ETF 목록 가져오기
 * @param {string} portfolioId - 포트폴리오 ID
 * @returns {Array} ETF 목록
 */
export const getPortfolioETFs = (portfolioId) => {
  try {
    const key = `portfolio_etfs_${portfolioId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('포트폴리오 ETF 목록 불러오기 실패:', error);
    return null;
  }
};

/**
 * 포트폴리오의 ETF 목록 저장하기
 * @param {string} portfolioId - 포트폴리오 ID
 * @param {Array} etfs - ETF 목록
 * @returns {boolean} 성공 여부
 */
export const setPortfolioETFs = (portfolioId, etfs) => {
  try {
    const key = `portfolio_etfs_${portfolioId}`;
    localStorage.setItem(key, JSON.stringify(etfs));
    return true;
  } catch (error) {
    console.error('포트폴리오 ETF 목록 저장 실패:', error);
    return false;
  }
};
