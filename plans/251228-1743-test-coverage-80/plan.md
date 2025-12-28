---
title: "Test Coverage 80%+ Implementation"
description: "Increase test coverage from 59% to 80%+ statements, 60%+ branches"
status: in-progress
priority: P1
effort: 6h
branch: main
tags: [testing, jest, rtl, coverage]
created: 2025-12-28
---

# Test Coverage 80%+ Implementation Plan

## Overview

Increase test coverage from 59.24% → 80%+ statements, 31.09% → 60%+ branches.

## Current Coverage Baseline

| Metric | Current | Target |
|--------|---------|--------|
| Statements | 59.24% | 80%+ |
| Branches | 31.09% | 60%+ |
| Functions | 50% | 80%+ |
| Lines | 61.22% | 80%+ |

## Low Coverage Files (Priority Order)

| File | Statements | Branch | Priority |
|------|------------|--------|----------|
| LateralMenu.tsx | 31.42% | 23.07% | HIGH |
| BookCafe.tsx | 25% | 100% | HIGH |
| Panels (avg) | 67% | 20% | MEDIUM |
| Player.tsx | 54.54% | 33.33% | MEDIUM |
| VideoBackground.tsx | 58.82% | 21.05% | MEDIUM |

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | Panel Unit Tests | Done (2025-12-28) | 1.5h | [phase-01](./phase-01-panel-tests.md) |
| 2 | LateralMenu Tests | Done (2025-12-28) | 1.5h | [phase-02](./phase-02-lateralmenu-tests.md) |
| 3 | VideoBackground & ActionPopover Tests | Done (2025-12-28) | 1h | [phase-03](./phase-03-video-action-tests.md) |
| 4 | Page Tests (Home/BookCafe) | Done (2025-12-28) | 1h | [phase-04](./phase-04-page-tests.md) |
| 5 | Coverage Gaps Cleanup | Pending | 1h | [phase-05](./phase-05-coverage-cleanup.md) |

## Testing Stack

- Jest (via CRA)
- @testing-library/react
- @testing-library/jest-dom
- Mocks: setupTests.ts (HTMLMediaElement, Audio, Fullscreen)

## Success Criteria

- [ ] All tests pass
- [ ] Statement coverage ≥ 80%
- [ ] Branch coverage ≥ 60%
- [ ] Function coverage ≥ 80%
- [ ] No flaky tests
- [ ] Build succeeds

## Dependencies

- Existing test utils: `src/test-utils/render.tsx`
- Mocks: `src/setupTests.ts`
- Provider: `src/store/Provider.tsx`

## Unresolved Questions

None - all patterns established in existing tests.
