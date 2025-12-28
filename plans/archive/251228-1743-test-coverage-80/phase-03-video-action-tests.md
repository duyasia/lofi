# Phase 3: VideoBackground & ActionPopover Tests

**Effort:** 1h | **Status:** pending

## Objective

Create tests for VideoBackground.tsx and ActionPopover.tsx components.

## Context

- VideoBackground: 58.82% statements, 21.05% branches
- ActionPopover: Reusable popover with audio control
- Both use context hooks (useVideo, useAudio)

## Related Files

| File | Action | Lines |
|------|--------|-------|
| `src/components/VideoBackground/VideoBackground.tsx` | Test | 43 |
| `src/components/ActionPopover/ActionPopover.tsx` | Test | 68 |

## Create Files

| File | Description |
|------|-------------|
| `src/components/VideoBackground/__tests__/VideoBackground.test.tsx` | VideoBackground tests |
| `src/components/ActionPopover/__tests__/ActionPopover.test.tsx` | ActionPopover tests |

## Implementation Steps

### 3.1 VideoBackground.test.tsx

**Test Cases (8):**
1. Renders video element
2. Shows day video when toggled=true, rain=false
3. Shows rainyDay video when toggled=true, rain=true
4. Shows night video when toggled=false, rain=false
5. Shows rainyNight video when toggled=false, rain=true
6. Has correct class when fullscreen=true
7. Has correct class when fullscreen=false
8. Updates video when state changes

**Mock Setup:**
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import Provider from '../../../store/Provider';
import VideoBackground from '../VideoBackground';

const mockVideos = {
  day: '/test-day.mp4',
  rainyDay: '/test-rainy-day.mp4',
  night: '/test-night.mp4',
  rainyNight: '/test-rainy-night.mp4',
};

// Mock context hooks
jest.mock('../../../store', () => ({
  useVideo: jest.fn(() => ({ toggled: true, fullscreen: false })),
  useAudio: jest.fn(() => ({ rain: false })),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};
```

### 3.2 ActionPopover.test.tsx

**Test Cases (10):**
1. Renders label text
2. Renders toggle circle
3. Does NOT render slider when isActive=false
4. Renders slider when isActive=true
5. Renders audio player when isActive=true
6. Calls onToggle when circle clicked
7. Calls onToggle when label clicked
8. Calls onVolumeChange when slider changed
9. Applies position class correctly
10. Applies zIndex class correctly

**Mock Setup:**
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionPopover from '../ActionPopover';

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
      data-testid="volume-slider"
      value={value}
      onChange={(e) => onChange?.(new Event('change'), Number(e.target.value))}
    />
  ),
}));

const mockProps = {
  label: 'Test Label',
  audioSrc: '/test-audio.mp3',
  isActive: false,
  volume: 50,
  onToggle: jest.fn(),
  onVolumeChange: jest.fn(),
  position: 'top-[10%] left-[20%]',
  zIndex: 'z-10',
};
```

## Verification

```bash
npm test -- --coverage --collectCoverageFrom='src/components/VideoBackground/VideoBackground.tsx' --collectCoverageFrom='src/components/ActionPopover/ActionPopover.tsx' --watchAll=false
```

## Todo List

- [ ] Create VideoBackground/__tests__ directory
- [ ] Create VideoBackground.test.tsx with 8 test cases
- [ ] Create ActionPopover/__tests__ directory
- [ ] Create ActionPopover.test.tsx with 10 test cases
- [ ] Run tests and verify all pass
- [ ] Check coverage ≥ 80%

## Success Criteria

- All 18 test cases pass
- VideoBackground coverage ≥ 80%
- ActionPopover coverage ≥ 80%
- All video selection logic tested

## Edge Cases to Cover

1. Default video fallback
2. Array value handling in slider onChange
3. Missing audioSrc prop

## Next Steps

After completing Phase 3, proceed to Phase 4 (Page Tests).
