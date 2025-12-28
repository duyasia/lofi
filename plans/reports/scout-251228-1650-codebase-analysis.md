# Codebase Analysis Report - Lofi Project

## 1. Component Structure & Props Interfaces

### VideoBackground
- **Props**:
    - `videos`: Object containing paths for 4 states (day, rainyDay, night, rainyNight).
    - `className`: Optional string for styling.
- **Context Dependencies**: `useVideo`, `useAudio`.

### ActionPopover
- **Props**:
    - `label`: string
    - `audioSrc`: string (optional)
    - `isActive`: boolean
    - `volume`: number (0-100)
    - `onToggle`: function
    - `onVolumeChange`: function (receives number)
    - `position`: string (Tailwind classes)
    - `zIndex`: string (optional)

### MoodPanel
- **Props**: High prop-drilling detected. Needs interfaces for ~15 props including volumes, toggles, and selection states.

## 2. Context Architecture (Types needed)

### AudioContext
- **Values**:
    - Rain: `rain` (bool), `volumeRain` (num), `cityRain` (num)
    - Traffic: `traffic` (bool), `volumeTraffic` (num), `cityTraffic` (num)
    - Keyboard: `keyboard` (bool), `volumeKeyboard` (num), `soundKey` (num)
    - Music: `volumeSong` (num), `song` (Song[])
- **Handlers**: Various toggle and setter functions.

### VideoContext
- `toggled`: boolean (Day/Night switch)
- `fullscreen`: boolean

### UIContext
- `enter`: boolean (Navigation state between views)

## 3. Data Structure

### Song Object
```typescript
interface Song {
  name: string;
  src: string;
}
```

### VideoSet Object
```typescript
interface VideoSet {
  day: string;
  rainyDay: string;
  night: string;
  rainyNight: string;
}
```

## 4. Unresolved Questions
- `LateralMenu.jsx` logic for passing props to panels needs further investigation to reduce prop drilling.
- Asset paths are hardcoded strings; consider a central asset registry type.
