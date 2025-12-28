# Phase 5: Coverage Gaps Cleanup

**Effort:** 1h | **Status:** pending

## Objective

Close remaining coverage gaps to reach 80%+ statements, 60%+ branches.

## Context

After Phases 1-4, run full coverage report to identify remaining gaps. This phase addresses:
- Uncovered branches in existing tests
- Edge cases not yet tested
- Any new low-coverage files discovered

## Tasks

### 5.1 Run Full Coverage Report

```bash
npm test -- --coverage --watchAll=false
```

### 5.2 Analyze Coverage Gaps

Identify files still below target:
- Statements < 80%
- Branches < 60%

### 5.3 Priority Gap Fixes

**Expected areas needing attention:**

1. **Branch coverage in panels** - Add tests for:
   - Volume slider edge cases (0, 100, array values)
   - Active/inactive state transitions

2. **LateralMenu branches** - Add tests for:
   - Rapid panel switching
   - Volume = 0 boundary conditions

3. **Context hooks** - Verify:
   - All state setters tested
   - Edge cases in useAudio, useVideo

### 5.4 Implementation Pattern

For each uncovered branch:
```typescript
// 1. Identify the condition
if (someCondition) { /* branch A */ } else { /* branch B */ }

// 2. Write test for each branch
it('handles condition true', () => {
  // Setup to make someCondition = true
  // Assert branch A behavior
});

it('handles condition false', () => {
  // Setup to make someCondition = false
  // Assert branch B behavior
});
```

## Verification

```bash
# Full coverage report
npm test -- --coverage --watchAll=false

# Check specific thresholds
# Statements ≥ 80%
# Branches ≥ 60%
# Functions ≥ 80%
# Lines ≥ 80%
```

## Todo List

- [ ] Run full coverage report
- [ ] Identify files below 80% statements
- [ ] Identify files below 60% branches
- [ ] Fix panel branch gaps
- [ ] Fix LateralMenu branch gaps
- [ ] Fix any other gaps
- [ ] Final verification ≥ 80%/60%

## Success Criteria

- Statement coverage ≥ 80%
- Branch coverage ≥ 60%
- Function coverage ≥ 80%
- All tests pass
- No flaky tests
- Build succeeds

## Expected Final Coverage

| Metric | Before | After |
|--------|--------|-------|
| Statements | 59.24% | ≥80% |
| Branches | 31.09% | ≥60% |
| Functions | 50% | ≥80% |
| Lines | 61.22% | ≥80% |

## Common Gap Patterns

1. **Default prop values** - Test with undefined/null
2. **Ternary operators** - Test both outcomes
3. **Array map callbacks** - Test empty/populated arrays
4. **Optional chaining** - Test when value is undefined

## Troubleshooting

If coverage still low after all phases:
1. Check for dead code that can be removed
2. Look for unreachable branches
3. Consider refactoring complex conditionals
4. Add integration tests for user flows

## Post-Completion

After reaching 80%+ coverage:
1. Update plan status to completed
2. Add coverage badge to README (optional)
3. Consider adding coverage threshold to CI
