# Phase 4: Page Tests (Home & BookCafe)

**Effort:** 1h | **Status:** pending

## Objective

Create integration tests for Home.tsx and BookCafe.tsx page components.

## Context

- Home.tsx: Entry page with exterior videos, rain/traffic controls
- BookCafe.tsx: 25% statements (lowest coverage), cafe videos, rain/keyboard controls
- Both pages use VideoBackground and ActionPopover components

## Related Files

| File | Action | Lines | Coverage |
|------|--------|-------|----------|
| `src/pages/Home/Home.tsx` | Test | 80 | ~60% |
| `src/pages/BookCafe/BookCafe.tsx` | Test | 81 | 25% |

## Create Files

| File | Description |
|------|-------------|
| `src/pages/Home/__tests__/Home.test.tsx` | Home page tests |
| `src/pages/BookCafe/__tests__/BookCafe.test.tsx` | BookCafe page tests |

## Implementation Steps

### 4.1 Home.test.tsx

**Test Cases (8):**
1. Renders VideoBackground component
2. Renders City Rain ActionPopover
3. Renders City Traffic ActionPopover
4. Renders Enter ActionPopover
5. Clicking City Rain toggles rain state
6. Clicking City Traffic toggles traffic state
7. Clicking Enter toggles enter state
8. Volume change calls changeRainVolume

**Mock Setup:**
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Provider from '../../../store/Provider';
import Home from '../Home';

// Mock react-audio-player
jest.mock('react-audio-player', () => ({
  __esModule: true,
  default: () => null,
}));

// Mock MUI Slider
jest.mock('@mui/material/Slider', () => ({
  __esModule: true,
  default: ({ value, onChange }: any) => (
    <input
      type="range"
      data-testid="slider"
      value={value}
      onChange={(e) => onChange?.(new Event('change'), Number(e.target.value))}
    />
  ),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};
```

### 4.2 BookCafe.test.tsx

**Test Cases (8):**
1. Renders VideoBackground component
2. Renders City Rain ActionPopover
3. Renders Keyboard ActionPopover
4. Renders Go out ActionPopover
5. Clicking City Rain toggles rain state
6. Clicking Keyboard toggles keyboard state
7. Clicking Go out toggles enter state
8. Volume change calls changeKeyboardVolume

**Mock Setup:**
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Provider from '../../../store/Provider';
import BookCafe from '../BookCafe';

// Same mocks as Home.test.tsx
jest.mock('react-audio-player', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('@mui/material/Slider', () => ({
  __esModule: true,
  default: ({ value, onChange }: any) => (
    <input
      type="range"
      data-testid="slider"
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
npm test -- --coverage --collectCoverageFrom='src/pages/Home/Home.tsx' --collectCoverageFrom='src/pages/BookCafe/BookCafe.tsx' --watchAll=false
```

## Todo List

- [ ] Create Home/__tests__ directory
- [ ] Create Home.test.tsx with 8 test cases
- [ ] Create BookCafe/__tests__ directory
- [ ] Create BookCafe.test.tsx with 8 test cases
- [ ] Run tests and verify all pass
- [ ] Check coverage ≥ 80%

## Success Criteria

- All 16 test cases pass
- Home.tsx coverage ≥ 80%
- BookCafe.tsx coverage ≥ 80%
- All user interactions covered

## Edge Cases to Cover

1. State updates propagate correctly
2. ActionPopover callbacks work
3. VideoBackground receives correct props

## Next Steps

After completing Phase 4, proceed to Phase 5 (Coverage Cleanup).
