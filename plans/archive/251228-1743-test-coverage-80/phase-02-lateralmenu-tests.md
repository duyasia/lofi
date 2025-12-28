# Phase 2: LateralMenu Tests

**Effort:** 1.5h | **Status:** pending

## Objective

Create comprehensive tests for LateralMenu.tsx - the largest component (230 lines) with 31% coverage.

## Context

- Current: 31.42% statements, 23.07% branches
- Target: 80%+ statements, 60%+ branches
- Complex component with 4 panel toggles, mood selection, volume handlers

## Related Files

| File | Action | Coverage |
|------|--------|----------|
| `src/components/Layout/LateralMenu/LateralMenu.tsx` | Test | 31.42% |

## Create Files

| File | Description |
|------|-------------|
| `src/components/Layout/LateralMenu/__tests__/LateralMenu.test.tsx` | LateralMenu tests |

## Key Component Behaviors

1. **Panel Toggle Logic:**
   - `handleMood()` - toggles mood panel, closes others
   - `handlePlaylist()` - toggles playlist panel, closes others
   - `handleChange()` - toggles change panel, closes others
   - `handleProduct()` - toggles product panel, closes others

2. **Volume Handlers:**
   - `handleChangeRain(e, value)` - sets rain volume, toggles rain on/off
   - `handleChangeTraffic(e, value)` - sets traffic volume, toggles traffic on/off
   - `handleChangeKeyboard(e, value)` - sets keyboard volume, toggles keyboard on/off
   - `handleChangeVolumeSong(e, value)` - sets song volume

3. **Mood Selection:**
   - `handleClickSleep()` - sets sleep playlist, updates mood state
   - `handleClickJazzy()` - sets jazzy playlist, updates mood state
   - `handleClickChill()` - sets chill playlist, updates mood state

## Implementation Steps

### 2.1 Create __tests__ Directory

```bash
mkdir -p src/components/Layout/LateralMenu/__tests__
```

### 2.2 Test Cases for LateralMenu.test.tsx

**Rendering Tests:**
1. Renders lateral menu bar
2. Renders 4 panel buttons (mood, playlist, change, product)
3. All panels closed by default

**Panel Toggle Tests:**
4. Clicking mood button opens MoodPanel
5. Clicking mood button again closes MoodPanel
6. Opening playlist closes mood panel
7. Opening change closes playlist panel
8. Opening product closes change panel
9. Only one panel open at a time

**Mood Selection Tests (via MoodPanel):**
10. Clicking Sleepy updates mood state
11. Clicking Jazzy updates mood state
12. Clicking Chill updates mood state
13. Only one mood active at a time

**Volume Handler Tests:**
14. Changing rain volume calls setVolumeRain
15. Rain volume > 0 sets rain = true
16. Rain volume = 0 sets rain = false
17. Traffic volume works correctly
18. Keyboard volume works correctly
19. Song volume works correctly

### 2.3 Mock Setup

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Provider from '../../../../store/Provider';
import LateralMenu from '../LateralMenu';

// Mock react-audio-player
jest.mock('react-audio-player', () => ({
  __esModule: true,
  default: () => null,
}));

// Mock MUI Slider
jest.mock('@mui/material/Slider', () => ({
  __esModule: true,
  default: ({ value, onChange, className }: any) => (
    <input
      type="range"
      data-testid={`slider-${className}`}
      value={value}
      onChange={(e) => onChange?.(new Event('change'), Number(e.target.value))}
    />
  ),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};
```

## Verification

```bash
npm test -- --coverage --collectCoverageFrom='src/components/Layout/LateralMenu/LateralMenu.tsx' --watchAll=false
```

## Todo List

- [ ] Create __tests__ directory
- [ ] Create LateralMenu.test.tsx
- [ ] Implement rendering tests (3)
- [ ] Implement panel toggle tests (6)
- [ ] Implement mood selection tests (4)
- [ ] Implement volume handler tests (6)
- [ ] Run tests and verify all pass
- [ ] Check coverage ≥ 80%

## Success Criteria

- All 19 test cases pass
- Statement coverage ≥ 80%
- Branch coverage ≥ 60%
- All panel interactions covered

## Edge Cases to Cover

1. Rapid toggle clicks
2. Volume at 0 vs > 0 boundary
3. Array value handling in slider onChange

## Next Steps

After completing Phase 2, proceed to Phase 3 (VideoBackground & ActionPopover Tests).
