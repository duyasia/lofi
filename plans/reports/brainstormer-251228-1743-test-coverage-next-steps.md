# Brainstorm Report: Test Coverage Next Steps

**Date:** 2025-12-28
**Session:** 251228-1743
**Goal:** Tăng test coverage từ 59% lên 80%+

---

## Problem Statement

- Current coverage: 59.24% statements, 31.09% branches
- Target: 80%+ overall, 90% hooks/logic
- Plan Phase 5-6 exists but not yet executed

## Current Coverage Analysis

| File/Area | Statements | Branches | Priority |
|-----------|------------|----------|----------|
| LateralMenu.tsx | 31.42% | 23.07% | HIGH |
| BookCafe.tsx | 25% | 100% | HIGH |
| Panel components | 60-75% | 7-50% | MEDIUM |
| Player.tsx | 54.54% | 33.33% | MEDIUM |
| VideoBackground.tsx | 58.82% | 21.05% | MEDIUM |
| Store contexts | 88.88% | 83.33% | LOW |

## Evaluated Approaches

### Option 1: Follow Phase 5-6 Plan (SELECTED)
**Pros:**
- Plan already researched and documented
- Structured approach with clear phases
- Covers unit + integration tests

**Cons:**
- May need adjustments based on current code state

### Option 2: Create New Detailed Plan
**Pros:**
- Fresh analysis of current codebase
- More targeted approach

**Cons:**
- Time overhead for re-planning
- Existing plan already comprehensive

### Option 3: Focus Only Low-Coverage Files
**Pros:**
- Fastest path to metric improvement
- Less effort

**Cons:**
- May miss integration issues
- Branch coverage harder to improve

## Final Recommendation

**Approach:** Execute Phase 5-6 with modifications:

1. **Unit Tests (Phase 5):**
   - Start with Panel components (simplest, quick wins)
   - Then LateralMenu (biggest impact)
   - Then VideoBackground, Pages

2. **Integration Tests (Phase 6):**
   - Audio player flow
   - Mood selection flow
   - Video background flow
   - Sidebar interactions

## Implementation Considerations

### Mocking Requirements
- HTMLMediaElement (video/audio) needs custom mocks
- Context providers must wrap all tests
- react-audio-player needs mock

### Risks
- Video elements may need jsdom workarounds
- Complex interactions in LateralMenu
- Browser APIs (fullscreen, etc)

## Success Metrics

- [ ] Statement coverage ≥ 80%
- [ ] Branch coverage ≥ 60%
- [ ] Function coverage ≥ 80%
- [ ] All 6 test suites passing
- [ ] No flaky tests

## Next Steps

1. Create Panel unit tests (MoodPanel, PlaylistPanel, ChangeSetPanel, ProductivityPanel)
2. Create LateralMenu.test.tsx
3. Create VideoBackground.test.tsx
4. Create Home.test.tsx, BookCafe.test.tsx
5. Execute Phase 6 integration tests
6. Run coverage report and iterate

## Unresolved Questions

1. Need to check if ActionPopover.test.tsx exists
2. May need to add data-testid attributes to components for easier testing
