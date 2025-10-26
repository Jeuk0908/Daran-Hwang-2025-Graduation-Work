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

The app uses React Router with a fixed bottom navigation bar that appears on all main routes except `/dev/*` pages:

- `/home` - Main home page
- `/exhibition` - Portfolio/exhibition listings
- `/artist` - Artist discovery/listings
- `/mypage` - User profile page
- `/dev/icons` - Development showcase page (no bottom nav)

Routes are defined in `src/App.jsx` where the app container has a max-width of `430px` for main pages (responsive mobile design).

### Mobile Web App Optimizations

Critical viewport and mobile settings in `index.html`:
- `viewport-fit=cover` for full-screen mobile web app
- `maximum-scale=1.0, user-scalable=no` to prevent zoom
- `apple-mobile-web-app-capable` for iOS PWA support
- Container uses `min-height: -webkit-fill-available` to handle iOS Safari 100vh bug

### Component Architecture

**Common Components** (`src/components/common/`):
- `BottomNav.jsx` - Fixed bottom navigation with inline SVG icons for 4 routes (home, exhibition, artist, mypage)
- `Button.jsx` - Button with variants: `primary`, `grey`, `skeleton`, `skeleton2`
- `PhoneNumFild.jsx` - Phone number input field with states: `default`, `error`, `pass`
- `SubNav.jsx` - Tab navigation with 4 tabs: `returns`, `info`, `composition`, `dividend`
- `TopNav.jsx` - Top navigation bar with multiple configurations based on `depth` and `state` props
- `SearchBar.jsx` - Search input with states: `검색 전`, `state2`
- `TipCard.jsx` - Expandable card component with bookmark functionality

**Icon System** (`src/components/common/icons/`):
- SVG icons exported as React components
- Icons stored in `src/assets/` and imported directly as image sources
- All icons use inline SVG or SVG file imports (no icon libraries)

**Layout Components** (`src/components/layout/`):
- `MainLayout.jsx` - Main app layout wrapper
- `AuthLayout.jsx` - Authentication layout wrapper

### Bottom Navigation Design

The `BottomNav` component uses:
- Fixed positioning at bottom of screen
- Height: 88px (54px nav + 34px iOS home indicator area)
- Main content has `paddingBottom: '88px'` to account for fixed nav
- Active/inactive states with different SVG icons and gradient fills
- Color scheme: Active uses `#3490FF`, `#005CCC`, `#99C7FF`; Inactive uses `#CACDD4`, `#ADB3BD`, `#E6E7EA`

### Development Pages

`/dev/icons` - Icon and component showcase page that:
- Removes max-width constraint from container
- Displays all icon assets organized by category
- Shows interactive examples of all common components
- Provides copy-paste usage examples

## Design System

### Color Palette
```
Primary 50:      #005CCC  (Active blue)
Primary Main 30: #3490FF  (Main blue)
Blue Light:      #99C7FF  (Light blue)
Gray 20:         #CACDD4  (Inactive gray)
Gray 30:         #ADB2BD  (Medium gray)
Gray 10:         #E6E7EA  (Light gray)
Label Primary:   #000000  (Black)
```

### Typography
- Font family: Pretendard (fallback: sans-serif)
- Mobile-responsive font sizes using `clamp()` for fluid typography

## Important Notes

- **No backend API calls** - This is a demo/exhibition project
- **Mock data only** - All data should be hardcoded or generated locally
- **Mobile-first** - Design is optimized for mobile viewport (max-width: 430px)
- **SVG icons** - All icons are stored in `src/assets/` and imported as SVG files or React components
- **Korean language** - Primary language is Korean (한국어)
- **No state management library** - Uses React's built-in useState/useContext only

## File Organization

- Keep components in appropriate directories (`common/`, `layout/`, `features/`)
- Store all icon assets in `src/assets/`
- Page components go in `src/pages/`
- Mock data services in `src/services/`
- Utilities in `src/utils/`
- Custom hooks in `src/hooks/`

## Development Tips

- The `/dev/icons` page is useful for viewing all available icons and components
- When adding new icons, import SVG files directly from `src/assets/`
- Bottom navigation automatically hides on `/dev/*` routes
- Use inline styles to match existing code style (no CSS modules)
- Viewport meta tags are critical - do not modify without testing on mobile devices
