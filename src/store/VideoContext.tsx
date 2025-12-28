import { createContext, useState, useContext, useMemo } from "react";
import type { VideoContextType } from "types/index";

const VideoContext = createContext<VideoContextType | undefined>(undefined);

/**
 * VideoProvider - Manages video-related state (toggled day/night, fullscreen)
 */
export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [toggled, setToggled] = useState<boolean>(true); // true = day, false = night
  const [fullscreen, setFullscreen] = useState<boolean>(false);

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
export function useVideo(): VideoContextType {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within VideoProvider");
  }
  return context;
}

export default VideoContext;
