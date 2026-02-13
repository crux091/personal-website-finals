# Portfolio v2.0 - Complete Architectural Refactor

## 🎯 Overview

This is a production-ready Next.js portfolio application with a cosmic constellation navigation system. The codebase has been completely refactored with professional-level architecture, strict separation of concerns, and 60fps performance.

## ✨ Key Features

- **Personalized Constellation Navigation**: Zodiac-based navigation with 12 unique layouts
- **Interactive Cosmic Experience**: Starfield background with parallax effects
- **Identity & AI Entities**: Visual representation of user and AI guide
- **Smooth Animations**: Framer Motion for UI, RAF for background rendering
- **State Management**: Zustand for predictable, centralized state
- **TypeScript Strict Mode**: Full type safety throughout
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🏗️ Architecture

### Clean Layer Separation

```
Layer 0 (z-0):   Background Starfield - Canvas/RAF rendering
Layer 1 (z-10):  Application Flow - Intro → Main transition
Layer 2 (z-20):  Constellation - Configuration-driven node system
Layer 3 (z-30):  Entities - OwnerShip & AIShip
Layer 4 (z-40):  Content UI - Modal sections
Layer 5 (z-50):  AI Panel - Highest priority overlay
```

### Folder Structure

```
/app
  page.tsx              # Entry point
  layout.tsx            # Root layout
  globals.css           # Global styles

/components
  /background           # Starfield rendering engine
  /constellation        # Constellation visual engine
  /entities             # OwnerShip & AIShip
  /intro                # IntroSequence component
  /ui                   # SectionContent & AIPanel
  UniverseApp.tsx       # Main orchestrator

/engine
  zodiac.ts             # Zodiac calculation logic
  constellation-config.ts # All constellation layouts

/store
  useUniverseStore.ts   # Zustand global store

/types
  index.ts              # Centralized type definitions

/hooks
  index.ts              # Custom React hooks

/docs
  ARCHITECTURE.md       # Detailed architecture docs
```

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## 📖 Core Concepts

### 1. State Management

Single Zustand store (`useUniverseStore`) manages:
- Application stage (intro/main)
- Zodiac sign
- Active/hovered nodes
- AI panel state

```typescript
import { useUniverseStore } from '@/store/useUniverseStore'

// Use in components
const zodiacSign = useUniverseStore(state => state.zodiacSign)
const setActiveNode = useUniverseStore(state => state.setActiveNode)
```

### 2. Constellation System

Configuration-driven approach:

```typescript
// engine/constellation-config.ts
export const CONSTELLATION_CONFIGS: Record<ZodiacSign, ConstellationConfig> = {
  Aries: {
    nodes: [
      { id: 'about', label: 'About', position: { x: 40, y: 30 }, route: '/about' }
    ],
    connections: [
      { from: 'about', to: 'skills' }
    ]
  }
}
```

Rendering engine consumes configuration - no hardcoded layouts in components.

### 3. Performance Optimization

- **RAF Isolation**: Background animation runs independently from React
- **Dynamic Imports**: Heavy components lazy-loaded
- **Memoization**: All major components wrapped in `memo()`
- **Zustand Selectors**: Fine-grained subscriptions prevent unnecessary re-renders

## 🎨 Customization

### Adding a New Section

1. Create component: `components/MySection.tsx`
2. Add to `SectionContent.tsx` switch statement
3. Add node to constellation config
4. Done!

### Modifying Constellation Layouts

Edit `engine/constellation-config.ts`:
- Adjust node positions (percentage-based)
- Add/remove connections
- Add new zodiac layouts

### Styling

Global styles: `app/globals.css`
- CSS custom properties for colors
- Animation keyframes
- Utility classes

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State**: Zustand
- **UI Components**: Custom React components

## 📦 Dependencies

### Core
- `next`: ^13.4.19
- `react`: 18.2.0
- `typescript`: ^5.5.2

### State & Animation
- `zustand`: ^5.0.11
- `framer-motion`: ^10.12.16

### AI Integration
- `@google/generative-ai`: ^0.24.1
- `openai`: ^6.15.0

### Utilities
- `react-icons`: ^4.12.0
- `react-markdown`: ^10.1.0
- `@emailjs/browser`: ^4.4.1

## 📝 Project Principles

1. **Separation of Concerns**: Each layer has one responsibility
2. **Pure Functions**: Business logic is pure and testable
3. **Type Safety**: Strict TypeScript throughout
4. **Performance First**: Optimized for 60fps
5. **Composability**: Add features without modifying core
6. **Maintainability**: Clear structure, well-documented

## 🔧 Development Guidelines

### Adding Features
- Keep layers separate
- Use centralized state when needed
- Follow existing patterns
- Add types to `types/index.ts`

### Performance
- Memoize expensive components
- Use dynamic imports for heavy modules
- Avoid state in render loops
- Keep RAF isolated from React

### Code Style
- Functional components only
- Hooks over classes
- Composition over inheritance
- Clear, descriptive names

## 📚 Documentation

- [Architecture Documentation](./docs/ARCHITECTURE.md) - Detailed architectural guide
- [Project Structure](./PROJECT_STRUCTURE.md) - File organization
- [Changelog](./CHANGELOG.md) - Version history

## 🎯 Next Steps

- [ ] Add route-based navigation for constellation nodes
- [ ] Implement keyboard navigation
- [ ] Add analytics integration
- [ ] Create unit tests
- [ ] Add E2E tests with Playwright
- [ ] Performance monitoring

## 📄 License

See [LICENSE](./LICENSE)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Version 2.0.0** - Complete architectural refactor with production-ready patterns
