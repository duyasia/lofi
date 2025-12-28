# Phase 1: Panel Unit Tests

**Effort:** 1.5h | **Status:** pending

## Objective

Create unit tests for 4 panel components: MoodPanel, PlaylistPanel, ChangeSetPanel, ProductivityPanel.

## Context

- Current coverage: 60-75% statements, 7-50% branches
- Target: 90%+ statements per panel
- Mocking: react-audio-player, Slider (MUI)

## Related Files

| File | Action | Lines |
|------|--------|-------|
| `src/components/Layout/LateralMenu/panels/MoodPanel.tsx` | Test | 182 |
| `src/components/Layout/LateralMenu/panels/PlaylistPanel.tsx` | Test | 51 |
| `src/components/Layout/LateralMenu/panels/ChangeSetPanel.tsx` | Test | 58 |
| `src/components/Layout/LateralMenu/panels/ProductivityPanel.tsx` | Test | 57 |

## Create Files

| File | Description |
|------|-------------|
| `src/components/Layout/LateralMenu/panels/__tests__/MoodPanel.test.tsx` | MoodPanel tests |
| `src/components/Layout/LateralMenu/panels/__tests__/PlaylistPanel.test.tsx` | PlaylistPanel tests |
| `src/components/Layout/LateralMenu/panels/__tests__/ChangeSetPanel.test.tsx` | ChangeSetPanel tests |
| `src/components/Layout/LateralMenu/panels/__tests__/ProductivityPanel.test.tsx` | ProductivityPanel tests |

## Implementation Steps

### 1.1 Create __tests__ Directory

```bash
mkdir -p src/components/Layout/LateralMenu/panels/__tests__
```

### 1.2 MoodPanel.test.tsx

Test cases:
1. Returns null when isOpen=false
2. Renders "Mood" header when open
3. Renders 3 mood options (Sleepy, Jazzy, Chill)
4. Renders volume slider
5. Renders background noise controls (City traffic, City rain, Keyboard)
6. Calls onClickSleep when Sleepy clicked
7. Calls onClickJazzy when Jazzy clicked
8. Calls onClickChill when Chill clicked
9. Active mood has opacity-100

```typescript
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
      onChange={(e) => onChange?.(e, Number(e.target.value))}
    />
  ),
}));
```

### 1.3 PlaylistPanel.test.tsx

Test cases:
1. Returns null when isOpen=false
2. Renders "Playlists" header when open
3. Renders 3 playlist images (chill, focus, sleep)
4. Renders "Templates" section
5. Shows "no template" message

### 1.4 ChangeSetPanel.test.tsx

Test cases:
1. Returns null when isOpen=false
2. Renders "Change Set" header when open
3. Renders 6 change set items
4. First item (bookcafe) has no premium badge
5. Premium items show premium badge
6. Premium items have opacity-50

### 1.5 ProductivityPanel.test.tsx

Test cases:
1. Returns null when isOpen=false
2. Renders "Productivity" header when open
3. Renders 4 productivity items
4. All items show lock icon (feature locked)

## Verification

```bash
npm test -- --coverage --collectCoverageFrom='src/components/Layout/LateralMenu/panels/**/*.tsx' --watchAll=false
```

## Todo List

- [ ] Create __tests__ directory
- [ ] Create MoodPanel.test.tsx with 9 test cases
- [ ] Create PlaylistPanel.test.tsx with 5 test cases
- [ ] Create ChangeSetPanel.test.tsx with 6 test cases
- [ ] Create ProductivityPanel.test.tsx with 4 test cases
- [ ] Run tests and verify all pass
- [ ] Check coverage ≥ 90% for panels

## Success Criteria

- All 24 test cases pass
- Panel statement coverage ≥ 90%
- Panel branch coverage ≥ 80%

## Mock References

```typescript
// Standard mock props for MoodPanel
const mockMoodPanelProps: MoodPanelProps = {
  isOpen: true,
  clickSleep: false,
  clickJazzy: false,
  clickChill: true,
  volumeSong: 50,
  volumeTraffic: 0,
  volumeRain: 0,
  volumeKeyboard: 0,
  onClickSleep: jest.fn(),
  onClickJazzy: jest.fn(),
  onClickChill: jest.fn(),
  onChangeVolumeSong: jest.fn(),
  onChangeTraffic: jest.fn(),
  onChangeRain: jest.fn(),
  onChangeKeyboard: jest.fn(),
};
```

## Next Steps

After completing Phase 1, proceed to Phase 2 (LateralMenu Tests).
