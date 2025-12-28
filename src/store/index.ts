// Combined store exports
export { default as StoreProvider } from "./Provider";

// Domain-specific context exports
export { useAudio, AudioProvider } from "./AudioContext";
export { useVideo, VideoProvider } from "./VideoContext";
export { useUI, UIProvider } from "./UIContext";
export { usePomodoro, PomodoroProvider } from "./PomodoroContext";

// Re-export types
export type { AudioContextType, VideoContextType, UIContextType, PomodoroContextType } from "types/index";
