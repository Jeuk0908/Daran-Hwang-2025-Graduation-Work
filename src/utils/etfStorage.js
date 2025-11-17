/**
 * ETF 즐겨찾기 및 검색 히스토리 관리 유틸리티
 * localStorage를 사용하여 ETF 데이터 관리
 */

const ETF_BOOKMARK_KEY = 'etf_bookmarks';
const ETF_SEARCH_HISTORY_KEY = 'etf_search_history';

/**
 * ETF 즐겨찾기 목록 가져오기
 * @returns {Array<string>} ETF ID 배열
 */
export const getETFBookmarks = () => {
  try {
    const data = localStorage.getItem(ETF_BOOKMARK_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('ETF 즐겨찾기 목록 불러오기 실패:', error);
    return [];
  }
};

/**
 * ETF 즐겨찾기 여부 확인
 * @param {string} etfId - ETF ID
 * @returns {boolean} 즐겨찾기 여부
 */
export const isETFBookmarked = (etfId) => {
  const bookmarks = getETFBookmarks();
  return bookmarks.includes(etfId);
};

/**
 * ETF 즐겨찾기 토글
 * @param {string} etfId - ETF ID
 * @returns {boolean} 토글 후 즐겨찾기 상태 (true: 추가됨, false: 제거됨)
 */
export const toggleETFBookmark = (etfId) => {
  try {
    const bookmarks = getETFBookmarks();
    const index = bookmarks.indexOf(etfId);

    if (index > -1) {
      // 즐겨찾기 제거
      bookmarks.splice(index, 1);
      localStorage.setItem(ETF_BOOKMARK_KEY, JSON.stringify(bookmarks));
      return false;
    } else {
      // 즐겨찾기 추가
      bookmarks.push(etfId);
      localStorage.setItem(ETF_BOOKMARK_KEY, JSON.stringify(bookmarks));
      return true;
    }
  } catch (error) {
    console.error('ETF 즐겨찾기 토글 실패:', error);
    return false;
  }
};

/**
 * ETF 검색 히스토리 가져오기
 * @returns {Array<Object>} 검색 히스토리 배열 [{id, name, timestamp}]
 */
export const getETFSearchHistory = () => {
  try {
    const data = localStorage.getItem(ETF_SEARCH_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('ETF 검색 히스토리 불러오기 실패:', error);
    return [];
  }
};

/**
 * ETF 검색 히스토리에 추가
 * @param {string} etfId - ETF ID
 * @param {string} etfName - ETF 이름
 * @returns {boolean} 성공 여부
 */
export const addETFSearchHistory = (etfId, etfName) => {
  try {
    const history = getETFSearchHistory();

    // 이미 존재하는 항목 제거 (중복 방지)
    const filtered = history.filter(item => item.id !== etfId);

    // 새 항목을 맨 앞에 추가
    const newItem = {
      id: etfId,
      name: etfName,
      timestamp: new Date().toISOString()
    };

    filtered.unshift(newItem);

    // 최대 20개까지만 저장
    const limited = filtered.slice(0, 20);

    localStorage.setItem(ETF_SEARCH_HISTORY_KEY, JSON.stringify(limited));
    return true;
  } catch (error) {
    console.error('ETF 검색 히스토리 추가 실패:', error);
    return false;
  }
};

/**
 * ETF 검색 히스토리 삭제
 * @param {string} etfId - 삭제할 ETF ID
 * @returns {boolean} 성공 여부
 */
export const removeETFSearchHistory = (etfId) => {
  try {
    const history = getETFSearchHistory();
    const filtered = history.filter(item => item.id !== etfId);
    localStorage.setItem(ETF_SEARCH_HISTORY_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('ETF 검색 히스토리 삭제 실패:', error);
    return false;
  }
};

/**
 * ETF 검색 히스토리 전체 삭제
 * @returns {boolean} 성공 여부
 */
export const clearETFSearchHistory = () => {
  try {
    localStorage.removeItem(ETF_SEARCH_HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('ETF 검색 히스토리 전체 삭제 실패:', error);
    return false;
  }
};
