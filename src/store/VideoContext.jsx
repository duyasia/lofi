import { createContext, useState, useContext, useMemo } from "react";

const VideoContext = createContext();

/**
 * VideoProvider - Manages video-related state (toggled day/night, fullscreen)
 */
export function VideoProvider({ children }) {
  const [toggled, setToggled] = useState(true); // true = day, false = night
  const [fullscreen, setFullscreen] = useState(false);

  const value = useMemo(
    () => ({
      toggled,
      setToggled,
      fullscreen,
      setFullscreen,
    }),
    [toggled, fullscreen]
  );

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
}

/**
 * useVideo - Custom hook for consuming video context
 */
export function useVideo() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within VideoProvider");
  }
  return context;
}

export default VideoContext;
