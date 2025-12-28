# Codebase Summary

## Project Overview
This project is a Lofi music player application built with React, TypeScript, and SCSS. It features a customizable user interface with different moods, playlists, and background settings.

## Core Technologies
- **React**: Frontend framework
- **TypeScript**: Static typing
- **SCSS**: Styling
- **Context API**: State management (Audio, UI, Video)
- **Vitest/React Testing Library**: Testing framework

## Project Structure

### Source Code (`src/`)
- `components/`: Reusable UI components
  - `Layout/`: Main layout components (Header, LateralMenu, Player)
    - `LateralMenu/panels/`: Different configuration panels (Mood, Playlist, ChangeSet, Productivity)
- `pages/`: Page-level components (Home, BookCafe)
- `store/`: Context-based state management
- `data/`: Static data (songs, etc.)
- `assets/`: Images and icons
- `types/`: TypeScript type definitions

### Key Components
- **LateralMenu**: Side navigation containing various control panels.
- **Player**: Main audio control interface.
- **VideoBackground**: Handles the dynamic video backgrounds.

### State Management
- **AudioContext**: Manages audio playback, volume, and song selection.
- **UIContext**: Manages interface states, panels, and themes.
- **VideoContext**: Manages video background selection and states.

## Testing Coverage

### Component Tests
- `src/components/Layout/Header/Header.test.tsx`
- `src/components/Layout/Player/Player.test.tsx`
- `src/components/Layout/LateralMenu/panels/__tests__/`:
  - `MoodPanel.test.tsx`: Tests for mood selection and noise controls.
  - `PlaylistPanel.test.tsx`: Tests for playlist switching.
  - `ChangeSetPanel.test.tsx`: Tests for background scene changes.
  - `ProductivityPanel.test.tsx`: Tests for productivity tools (Pomodoro/Timer).

### Context Tests
- `src/store/AudioContext.test.tsx`
- `src/store/UIContext.test.tsx`
- `src/store/VideoContext.test.tsx`

### End-to-End Tests
- `e2e/app.spec.ts`

## Recent Changes
- Completed TypeScript migration for the entire codebase.
- Implemented comprehensive test coverage for lateral menu panels (Phase 01 Panel Tests).
- Refactored Context API for better performance and lazy loading.
