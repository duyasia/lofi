// Combined store exports
export { default as StoreProvider } from "./Provider";

// Domain-specific context exports
export { useAudio, AudioProvider } from "./AudioContext";
export { useVideo, VideoProvider } from "./VideoContext";
export { useUI, UIProvider } from "./UIContext";

// Re-export types
export type { AudioContextType, VideoContextType, UIContextType } from "types/index";
