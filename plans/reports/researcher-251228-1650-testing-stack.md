# Research Report: Testing Stack for React 18 + TypeScript (Lofi App)

## 1. Unit Testing (Jest + React Testing Library)
### Testing Context Hooks (useAudio, useVideo, useUI)
- **Custom Render**: Create a `renderWithProviders` helper wrapping components in all necessary Context Providers.
- **Hook Testing**: Use `renderHook` from `@testing-library/react` to test logic inside hooks independently of UI.
- **State Changes**: Verify context state updates by checking if dependent components re-render with new values.

### Mocking Audio/Video Elements
- **JSDOM Limitation**: JSDOM doesn't implement `HTMLMediaElement` methods (`play`, `pause`, `load`).
- **Solution**: Stub methods in `setupTests.ts`:
  ```ts
  window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.load = jest.fn();
  ```
- **Read-only Properties**: Use `Object.defineProperty` to mock `paused`, `duration`, or `currentTime`.

### Testing Functional Components
- Use `fireEvent` or `userEvent` (preferred) to trigger `useState` updates.
- Mock `useEffect` dependencies if they involve external APIs or timers.

## 2. Integration Testing
- **User Flows**: Test `Volume -> Mood -> Play` sequence in a single `render` call containing the relevant components.
- **Cross-Context Interaction**: Verify `useAudio` updates when `useUI` changes (e.g., switching pages or panels).

## 3. E2E Testing (Playwright)
### Setup
- Install via `npm init playwright@latest`.
- Use `playwright.config.ts` to point to `http://localhost:3000`.

### Testing Media Elements
- **Playback Verification**: Use `locator.evaluate` to check `paused` property:
  ```ts
  const isPaused = await page.locator('audio').evaluate(el => el.paused);
  ```
- **Volume Check**: Assert `volume` attribute or property via `evaluate`.
- **Visual Regression**: Use `expect(page).toHaveScreenshot()` for Day/Night toggle themes.

## 4. Coverage Targets
- **Overall**: 80%+
- **Hooks/Logic**: 90%+ (Critical for audio/video state management)
- **UI Components**: 70% (Focus on interaction, less on snapshot)

## Unresolved Questions
- Should we use a specific library for audio/video (e.g., Howler.js) or stick to native HTML5?
- Is there a need for testing audio output quality or just the control state?
- Do we need to test across multiple browsers in CI (Safari/Firefox audio codecs)?
