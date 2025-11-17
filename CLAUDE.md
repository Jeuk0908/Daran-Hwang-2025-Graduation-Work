# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **graduation exhibition web app** built for demonstration purposes **without actual backend integration**. All data is mock/hardcoded. The project is optimized for mobile web app viewing.

## Commands

### Development
```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Tech Stack

- **React 19.1.1** with JSX (no TypeScript)
- **Vite 7.1.7** for build tooling
- **React Router DOM** for SPA routing
- **Inline styles** (no CSS modules or styled-components)
- **No backend** - exhibition/demo project with mock data only

## Architecture

### Routing Structure

The app uses React Router with a fixed bottom navigation bar that appears on main routes. The bottom nav automatically hides on certain detail/flow pages.

**Main Routes (with bottom nav)**:
- `/home` - Main home page
- `/portfolio` - Portfolio listings
- `/search` - ETF search page
- `/mypage` - User profile page

**Detail Pages (no bottom nav)**:
- `/portfolio/:id/detail` - Portfolio detail view
- `/portfolio/:id/rebalance` - Portfolio rebalancing flow
- `/etf/:id/detail` - ETF detail view
- `/vocabulary` - ETF terminology learning
- `/bookmark` - Bookmarked content

**Portfolio Creation Flow** (multi-step, no bottom nav):
- `/portfolio/create` - Entry point
- `/portfolio/create/method` - Method selection (auto/manual)
- `/portfolio/create/auto` - Auto creation steps 1-5
- `/portfolio/create/step1-4` - Manual creation steps

**Development Routes**:
- `/dev/icons` - Icon and component showcase (no max-width constraint)

Routes are defined in `src/App.jsx`. Container max-width is `430px` for main pages (optimized for iPhone 14 Pro Max).

### Mobile Web App Optimizations

Critical viewport and mobile settings in `index.html`:
- `viewport-fit=cover` for full-screen mobile web app
- `maximum-scale=1.0, user-scalable=no` to prevent zoom
- `apple-mobile-web-app-capable` for iOS PWA support
- Container uses `min-height: -webkit-fill-available` to handle iOS Safari 100vh bug

### Component Architecture

**Common Components** (`src/components/common/`):

*Navigation & Layout*:
- `TopNav.jsx` - Top navigation bar with multiple configurations:
  - `depth='2'` + `state='number'`: Back button + title + chip + number indicator
  - `depth='2'` + `state='icon'`: Back button + title + two action icons
  - `depth='1'` + `state='icon'`: Title + two action icons (no back button)
  - `depth='2'` + `state='2 title'`: Back button + title + subtitle + two action icons
- `BottomNav.jsx` - Fixed bottom navigation (height: 88px = 54px nav + 34px home indicator area)
- `SubNav.jsx` - Tab navigation with 4 tabs: `returns`, `info`, `composition`, `dividend`
- `CenterTabNav.jsx` - Centered tab navigation component

*Form Inputs*:
- `Button.jsx` - Button with variants: `primary`, `grey`, `skeleton`, `skeleton2`
- `CaptionButton.jsx`, `RebalanceButton.jsx` - Specialized button components
- `TextField.jsx` - Text input field component
- `PhoneNumFild.jsx` - Phone number input field with states: `default`, `error`, `pass`
- `SearchBar.jsx` - Search input with states: `검색 전`, `state2`
- `ToggleButton.jsx` - Toggle switch component

*Cards & Display Components*:
- `PortfolioCard.jsx`, `PortfolioListCard.jsx`, `PortfolioMainCard.jsx` - Portfolio display cards
- `ETFCard.jsx` - ETF information card
- `RebalanceETFCard.jsx`, `RebalanceInfoCard.jsx` - Rebalancing-related cards
- `ThemeCard.jsx`, `IndexCard.jsx`, `MarketIndexCard.jsx` - Market theme and index cards
- `NewsCard.jsx` - News article card
- `AssetCard.jsx` - Asset allocation card
- `StockChangeCard.jsx` - Stock change display card
- `TipCard.jsx` - Expandable card component with bookmark functionality
- `VocabularyCard.jsx` - ETF terminology learning flashcard (locked/unlocked states)
- `SelectionCard.jsx` - Selection option card
- `MenuCard.jsx` - Menu/navigation card
- `TotalProfitCard.jsx` - Total profit summary card
- `VideoThumbnail.jsx` - Video preview thumbnail

*Charts & Visualizations*:
- `SimpleChartViewer.jsx` - Simple line chart component
- `TreemapChart.jsx` - Treemap visualization for portfolio composition

*Skeleton Loaders*:
- `IndexCardSkeleton.jsx`, `ListItemSkeleton.jsx`, `ContentCardSkeleton.jsx` - Loading states

*Settings & Other*:
- `SettingSection.jsx`, `SettingItem.jsx` - Settings page components
- `Label.jsx`, `Chip.jsx` - Text label and chip components

**Icon System** (`src/components/common/icons/`):
- SVG icons exported as React components
- Icons stored in `src/assets/` and imported directly as image sources
- All icons use inline SVG or SVG file imports (no icon libraries)

**Layout Components** (`src/components/layout/`):
- `MainLayout.jsx` - Main app layout wrapper
- `AuthLayout.jsx` - Authentication layout wrapper

**Page Structure** (`src/Pages/`):
Note: Directory is capitalized as `Pages/`, not `pages/`
- `Home/` - Main landing page with portfolio summary, market indices, and popular themes
- `Portfolio/` - Portfolio listings and management
  - `PortfolioDetail.jsx` - Individual portfolio detail view
  - `PortfolioDelete.jsx` - Portfolio deletion confirmation
- `PortfolioCreate/` - Multi-step portfolio creation flow
  - `MethodSelection.jsx` - Auto vs manual creation selection
  - `AutoCreate.jsx` + `AutoCreateStep2-5.jsx` - Automated creation flow
  - `ManualCreateStep2-3.jsx` - Manual creation flow
- `Rebalance/` - Portfolio rebalancing interface
- `ETFDetail/` - ETF detail page with performance data and composition
- `Search/` - ETF search and discovery
- `MyPage/` - User profile and settings
- `Vocabulary/` - ETF terminology learning cards
- `Bookmark/` - Bookmarked content
- `QA/` - Q&A section (placeholder)
- `VideoTIP/` - Video tips section (placeholder)
- `Dev/` - Development showcase pages (`IconShowcase.jsx`)

### Scroll Behavior

The app implements aggressive scroll restoration prevention to ensure pages always start at the top:
- `window.history.scrollRestoration = 'manual'` to disable browser auto-scroll
- Route changes trigger immediate scroll reset via `useEffect` in `App.jsx`
- Duplicate scroll reset with `setTimeout(0)` to override browser restoration
- This behavior is critical for UX - do not modify without explicit user request

### Bottom Navigation Design

The `BottomNav` component uses:
- Fixed positioning at bottom of screen
- Height: 88px (54px nav + 34px iOS home indicator area)
- Main content has `paddingBottom: '88px'` to account for fixed nav (except on home page)
- Active/inactive states with different SVG icons and gradient fills
- Color scheme: Active uses `#3490FF`, `#005CCC`, `#99C7FF`; Inactive uses `#CACDD4`, `#ADB3BD`, `#E6E7EA`
- Conditionally hidden on detail pages, creation flows, and dev routes

### Development Pages

`/dev/icons` - Icon and component showcase page that:
- Removes max-width constraint from container
- Displays all icon assets organized by category
- Shows interactive examples of all common components
- Provides copy-paste usage examples

## Design System

### Layout Constants (`src/constants/layout.js`)

The project uses a centralized layout constant system optimized for **iPhone 14 Pro Max (430pt)**:

```javascript
import { LAYOUT } from '../constants/layout';

LAYOUT.MAX_WIDTH              // 430px - Device width
LAYOUT.HORIZONTAL_PADDING     // 17px - Left/right padding
LAYOUT.GRID_GAP.ROW          // 16px - Vertical grid spacing
LAYOUT.GRID_GAP.COLUMN       // 14px - Horizontal grid spacing
LAYOUT.CARD_GAP              // 16px - Card spacing
LAYOUT.SECTION_GAP           // 32px - Section spacing
LAYOUT.TOP_NAV_MARGIN        // 28px - Top nav margin
LAYOUT.BOTTOM_NAV_HEIGHT     // 88px - Bottom nav height
LAYOUT.getContentWidth()     // 396px - Content area (430 - 34)
LAYOUT.getTwoColumnWidth()   // 191px - Two-column grid width
```

**Usage**: Import and use these constants instead of hardcoding pixel values to maintain consistency across the app.

### Color Palette
```
Primary 50:      #005CCC  (Active blue)
Primary Main 30: #3490FF  (Main blue, theme color)
Blue Light:      #99C7FF  (Light blue)
Gray 20:         #CACDD4  (Inactive gray)
Gray 30:         #ADB2BD  (Medium gray)
Gray 10:         #E6E7EA  (Light gray)
Label Primary:   #000000  (Black)
```

### Typography
- Font family: Pretendard (fallback: sans-serif)
- Mobile-responsive font sizes using `clamp()` for fluid typography
- Pretendard is loaded via web font (check `index.html` or CSS for font loading)

## Important Notes

- **No backend API calls** - This is a demo/exhibition project with no API integration
- **Mock data only** - All data should be hardcoded or generated locally within components
- **Mobile-first** - Design is optimized for mobile viewport (max-width: 430px, iPhone 14 Pro Max)
- **SVG icons** - All icons are stored in `src/assets/` and imported as SVG files or React components
- **Korean language** - Primary language is Korean (한국어)
- **No state management library** - Uses React's built-in useState/useContext only (no Redux, Zustand, etc.)
- **Recharts** - Charts are built with Recharts library (imported in `package.json`)
- **Case sensitivity** - Note `src/Pages/` (capital P), not `src/pages/`

## File Organization

- Keep components in appropriate directories (`common/`, `layout/`, `features/`)
- Store all icon assets in `src/assets/`
- **Page components go in `src/Pages/`** (note the capital P)
- Mock data services in `src/services/`
- Utilities in `src/utils/`
- Custom hooks in `src/hooks/`

## Development Tips

- The `/dev/icons` page is useful for viewing all available icons and components
- When adding new icons, import SVG files directly from `src/assets/`
- Bottom navigation automatically hides on `/dev/*` routes
- Use inline styles to match existing code style (no CSS modules)
- Viewport meta tags are critical - do not modify without testing on mobile devices
- **Check Figma Design First**: When requested to create a new page or component, always review the user-provided Figma URL first to understand the design.
- **Reuse Existing Resources**: After checking the design, verify if usable icons or components already exist in the `src/components/common` and `src/assets` directories and prioritize using them.
- **Confirm Before Creating New Assets**: If appropriate resources are not available, ask the user if a new icon or component should be created and follow their instructions.