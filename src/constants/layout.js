/**
 * Layout Constants for iPhone 14 Pro Max (430pt)
 *
 * iPhone 14 Pro: 393pt x 852pt
 * iPhone 14 Pro Max: 430pt x 932pt
 *
 * 이 프로젝트는 iPhone 14 Pro Max를 기준으로 최적화되었습니다.
 */

export const LAYOUT = {
  // 디바이스 너비
  MAX_WIDTH: 430,

  // 기본 패딩 (좌우)
  HORIZONTAL_PADDING: 17, // iPhone 14 Pro: 16px → iPhone 14 Pro Max: 17px (16 * 1.094)

  // 그리드 간격
  GRID_GAP: {
    ROW: 16, // 세로 간격 (기존 12px → 16px)
    COLUMN: 14 // 가로 간격 (기존 11px → 14px)
  },

  // 카드 간격
  CARD_GAP: 16, // 기존 12px → 16px

  // 섹션 간격
  SECTION_GAP: 32, // 섹션 사이 간격 (기존 31px → 32px)

  // 상단 네비게이션 여백
  TOP_NAV_MARGIN: 28, // 기존 26px → 28px

  // 하단 네비게이션 높이
  BOTTOM_NAV_HEIGHT: 88,

  // Safe Area - 제거됨
  SAFE_AREA_TOP: '0px',

  // 컨텐츠 영역 계산
  getContentWidth() {
    return this.MAX_WIDTH - (this.HORIZONTAL_PADDING * 2); // 396px (430 - 34)
  },

  // 2열 그리드 각 컬럼 너비 계산
  getTwoColumnWidth() {
    return (this.getContentWidth() - this.GRID_GAP.COLUMN) / 2; // 191px
  }
};

/**
 * 사용 예시:
 *
 * import { LAYOUT } from '../constants/layout';
 *
 * <div style={{
 *   padding: `0 ${LAYOUT.HORIZONTAL_PADDING}px`,
 *   gap: `${LAYOUT.GRID_GAP.ROW}px`
 * }}>
 */
