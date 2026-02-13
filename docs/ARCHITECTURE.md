/**
 * Architecture Documentation
 * 
 * This file documents the new architectural approach
 */

# Architecture Overview

## Layer Separation

### Layer 0: Background (z-0)
- **Starfield**: Pure canvas rendering with RAF
- No React re-renders per frame
- Controlled via props only
- Located: `components/background/`

### Layer 1: Application Flow (z-10)
- **UniverseApp**: Main orchestrator
- **IntroSequence**: Isolated initialization
- Routes between intro and main states
- Located: `components/`

### Layer 2: Constellation (z-20)
- **Constellation**: Visual rendering engine
- Consumes configuration from `engine/constellation-config.ts`
- Handles node interactions
- No business logic
- Located: `components/constellation/`

### Layer 3: Entities (z-30)
- **OwnerShip**: User identity representation
- **AIShip**: AI guide representation
- Pure visual + interaction
- No routing logic
- Located: `components/entities/`

### Layer 4: Content UI (z-40)
- **SectionContent**: Modal content display
- Lazy-loaded components
- Located: `components/ui/`

### Layer 5: AI Panel (z-50)
- **AIPanel**: Highest priority overlay
- Located: `components/ui/`

## State Management

### Zustand Store: `useUniverseStore`
Single source of truth for:
- `stage`: 'intro' | 'main'
- `zodiacSign`: Current zodiac
- `introCompleted`: Boolean flag
- `activeNode`: Currently selected node
- `hoveredNode`: Currently hovered node
- `aiOpen`: AI panel visibility

Located: `store/useUniverseStore.ts`

## Configuration System

### Pure Data
- `engine/constellation-config.ts`: All zodiac layouts
- `engine/zodiac.ts`: Zodiac calculation logic
- No rendering logic in configuration

### Type System
- `types/index.ts`: Single source for all types
- Strict TypeScript mode enabled

## Animation Strategy

### Framer Motion
- UI transitions
- Entry/exit animations
- Node interactions

### Canvas RAF
- Background starfield
- Isolated from React lifecycle
- 60fps performance

## Performance Optimizations

1. **Dynamic Imports**: Lazy load heavy components
2. **Memoization**: All major components memoized
3. **RAF Isolation**: Background rendering separate from React
4. **Zustand**: Minimal re-renders with granular selectors

## Adding New Features

### New Zodiac Layout
1. Add to `CONSTELLATION_CONFIGS` in `engine/constellation-config.ts`
2. Define nodes with positions and routes
3. Define connections
4. Done - rendering engine consumes automatically

### New Section
1. Create component in `components/`
2. Add case to `SectionContent` switch
3. Add node to constellation config
4. Done - no routing changes needed

### New Entity
1. Create in `components/entities/`
2. Use `useUniverseStore` for state
3. Add to `UniverseApp` composition
4. Keep visual logic isolated

## File Structure

```
/app                    # Next.js app router
  page.tsx              # Entry point
  globals.css           # Global styles
/components
  /background           # Layer 0: Starfield
  /intro                # Intro sequence
  /constellation        # Layer 2: Constellation rendering
  /entities             # Layer 3: Ships
  /ui                   # Layer 4-5: UI overlays
  UniverseApp.tsx       # Main orchestrator
/engine
  zodiac.ts             # Business logic
  constellation-config.ts # Pure data
/store
  useUniverseStore.ts   # Global state
/types
  index.ts              # Type definitions
/hooks
  index.ts              # Custom hooks
```

## Principles

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Pure Functions**: Configuration and engine logic are pure
3. **State Centralization**: One store, no duplicated state
4. **Performance First**: Optimize for 60fps
5. **Type Safety**: Strict TypeScript throughout
6. **Composability**: Add features without modifying core
