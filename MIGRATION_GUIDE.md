# Migration Guide - v1.0 to v2.0

This guide helps you understand the changes between v1 and v2 of the portfolio application.

## Overview

Version 2.0 is a **complete architectural rewrite**. While the visual experience remains similar, the internal structure has been rebuilt from the ground up.

---

## Breaking Changes

### 1. File Locations Changed

| v1.0 Location | v2.0 Location |
|---------------|---------------|
| `components/CosmicExperience/` | Various organized folders |
| `lib/constellations.ts` | `engine/constellation-config.ts` |
| Local state in components | `store/useUniverseStore.ts` |

### 2. Component API Changes

#### CosmicExperience → UniverseApp

**v1.0:**
```typescript
import CosmicExperience from '@/components/CosmicExperience/CosmicExperience'

<CosmicExperience />
```

**v2.0:**
```typescript
import UniverseApp from '@/components/UniverseApp'

<UniverseApp />
```

#### State Access

**v1.0:**
```typescript
const [zodiac, setZodiac] = useState<ZodiacSign | null>(null)
```

**v2.0:**
```typescript
import { useUniverseStore } from '@/store/useUniverseStore'

const zodiacSign = useUniverseStore(state => state.zodiacSign)
const setZodiacSign = useUniverseStore(state => state.setZodiacSign)
```

#### Constellation Data

**v1.0:**
```typescript
import { ZODIAC_CONSTELLATIONS } from '@/lib/constellations'

const data = ZODIAC_CONSTELLATIONS[zodiac]
```

**v2.0:**
```typescript
import { getConstellationConfig } from '@/engine/constellation-config'

const config = getConstellationConfig(zodiac)
```

### 3. Type Definitions

**v1.0:** Types scattered across files
**v2.0:** Centralized in `types/index.ts`

```typescript
import type { ZodiacSign, ConstellationNode } from '@/types'
```

### 4. Component Structure

**v1.0:** Monolithic components with mixed concerns
**v2.0:** Separated by layer and responsibility

```
v1.0:
- components/CosmicExperience/
  - CosmicExperience.tsx (everything mixed)
  - Starfield.tsx
  - ConstellationNav.tsx
  - OwnerShip.tsx
  - AIShip.tsx

v2.0:
- components/
  - background/Starfield.tsx (Layer 0)
  - constellation/Constellation.tsx (Layer 2)
  - entities/OwnerShip.tsx (Layer 3)
  - entities/AIShip.tsx (Layer 3)
  - intro/IntroSequence.tsx (Layer 1)
  - ui/SectionContent.tsx (Layer 4)
  - ui/AIPanel.tsx (Layer 5)
  - UniverseApp.tsx (orchestrator)
```

---

## New Features

### 1. Global State Management

```typescript
// Access state anywhere in your app
import { useUniverseStore } from '@/store/useUniverseStore'

function MyComponent() {
  const zodiacSign = useUniverseStore(state => state.zodiacSign)
  const activeNode = useUniverseStore(state => state.activeNode)
  const setActiveNode = useUniverseStore(state => state.setActiveNode)
  
  // Use state...
}
```

### 2. Configuration System

```typescript
// Add new constellation layouts easily
import { CONSTELLATION_CONFIGS } from '@/engine/constellation-config'

// All layouts in one place, consumed by rendering engine
```

### 3. Zodiac Calculation Engine

```typescript
import { getZodiacFromBirthdate } from '@/engine/zodiac'

const zodiac = getZodiacFromBirthdate('1990-01-15')
```

### 4. Type Safety

```typescript
// All types centralized and strict
import type { ZodiacSign, ConstellationConfig, Position3D } from '@/types'
```

---

## Migration Steps

### If You Haven't Modified the Code

1. Pull v2.0
2. Run `npm install` (Zustand will be added)
3. Done! Everything works out of the box.

### If You've Added Custom Sections

**v1.0 Way:**
```typescript
// Modified CosmicExperience.tsx directly
// Modified ConstellationNav.tsx
// Added routes manually
```

**v2.0 Way:**
```typescript
// 1. Create your component
// components/MySection.tsx
export default function MySection() {
  return <div>My content</div>
}

// 2. Add to SectionContent
// components/ui/SectionContent.tsx
case 'mySection':
  return <MySection />

// 3. Add to constellation config
// engine/constellation-config.ts
nodes: [
  { id: 'mySection', label: 'My Section', position: { x: 50, y: 50 }, route: '/my-section' }
]
```

### If You've Modified Constellation Layouts

**v1.0:**
```typescript
// lib/constellations.ts
export const ZODIAC_CONSTELLATIONS = {
  Aries: {
    nodes: [...]
  }
}
```

**v2.0:**
```typescript
// engine/constellation-config.ts
export const CONSTELLATION_CONFIGS: Record<ZodiacSign, ConstellationConfig> = {
  Aries: {
    id: 'Aries',
    nodes: [
      { id: 'about', label: 'About', position: { x: 40, y: 30 }, route: '/about' }
    ],
    connections: [
      { from: 'about', to: 'skills' }
    ]
  }
}
```

Changes needed:
1. Add `id` field to constellation
2. Change `x, y` to `position: { x, y }`
3. Add `route` to each node

### If You've Modified State Management

**v1.0:**
```typescript
const [activeSection, setActiveSection] = useState<string | null>(null)
```

**v2.0:**
```typescript
// Move to Zustand or use local state for component-specific state only
const activeNode = useUniverseStore(state => state.activeNode)
const setActiveNode = useUniverseStore(state => state.setActiveNode)
```

---

## Common Issues & Solutions

### Issue: Components not found

**Error:** `Cannot find module '@/components/CosmicExperience/...'`

**Solution:** Update imports to new locations:
```typescript
// Old
import IntroSequence from '@/components/CosmicExperience/IntroSequence'

// New
import IntroSequence from '@/components/intro/IntroSequence'
```

### Issue: Type errors after enabling strict mode

**Error:** `Type 'undefined' is not assignable to type 'string'`

**Solution:** Add type guards or non-null assertions:
```typescript
// Before
const color = colors[index]

// After
const color = colors[index]!  // Non-null assertion
// or
const color = colors[index] ?? '#ffffff'  // Fallback
```

### Issue: State not persisting

**Problem:** State resets unexpectedly

**Solution:** Check if you're using the correct Zustand selector:
```typescript
// Incorrect - creates new reference each time
const state = useUniverseStore()

// Correct - subscribe to specific values
const zodiacSign = useUniverseStore(state => state.zodiacSign)
```

### Issue: Starfield not rendering

**Problem:** Black screen instead of starfield

**Solution:** Check that Starfield is rendered first:
```typescript
// Correct order in UniverseApp
<Starfield />  // z-0 must be first
<Constellation />  // z-20
<OwnerShip />  // z-30
```

---

## Performance Improvements

### v1.0 → v2.0

| Feature | v1.0 | v2.0 |
|---------|------|------|
| Starfield | React state re-renders | RAF isolated |
| Components | Not memoized | Memoized |
| Code splitting | Manual | Dynamic imports |
| State updates | Prop drilling | Zustand selectors |
| Bundle size | Larger (tsparticles) | Smaller (custom) |

---

## Testing Your Migration

### Checklist

- [ ] `npm install` completes successfully
- [ ] `npm run dev` starts without errors
- [ ] Intro sequence appears
- [ ] Can enter birthdate
- [ ] Constellation renders
- [ ] Can click nodes
- [ ] Sections open in modals
- [ ] AI ship clickable
- [ ] AI panel opens
- [ ] Starfield renders with parallax
- [ ] No TypeScript errors
- [ ] `npm run build` succeeds

---

## Rollback Plan

If you need to rollback to v1.0:

```bash
git checkout v1.0
npm install
npm run dev
```

---

## Support

If you encounter issues:

1. Check [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
2. Review [REFACTOR_SUMMARY.md](./REFACTOR_SUMMARY.md)
3. Check TypeScript errors: Look at file paths and imports
4. Verify Zustand is installed: `npm list zustand`

---

## What Stays the Same

✅ Visual appearance
✅ User experience
✅ Constellation concept
✅ Zodiac system
✅ AI integration
✅ Section content
✅ Styling approach

## What Changes

🔄 Internal architecture
🔄 File organization
🔄 State management approach
🔄 Component boundaries
🔄 Import paths
🔄 Type definitions location

---

**The user experience is preserved. The code quality is elevated.**
