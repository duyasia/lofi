import { createContext, useState, useContext, useMemo, useCallback } from "react";
import type { VideoContextType, VideoSet } from "types/index";
import { DEFAULT_SCENE_ID, DEFAULT_VIDEOS, findSceneById } from "../data/dataScenes";

const VideoContext = createContext<VideoContextType | undefined>(undefined);

/**
 * VideoProvider - Manages video-related state (toggled day/night, fullscreen, scene)
 */
export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [toggled, setToggled] = useState<boolean>(true); // true = day, false = night
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [currentScene, setCurrentScene] = useState<string>(DEFAULT_SCENE_ID);
  const [currentVideos, setCurrentVideos] = useState<VideoSet>(DEFAULT_VIDEOS);

  // Change scene - only allows switching to scenes with available videos
  const changeScene = useCallback((sceneId: string) => {
    const scene = findSceneById(sceneId);
    if (scene?.videos) {
      setCurrentScene(sceneId);
      setCurrentVideos(scene.videos);
    }
  }, []);

  const value = useMemo(
    () => ({
      toggled,
      setToggled,
      fullscreen,
      setFullscreen,
      currentScene,
      currentVideos,
      changeScene,
    }),
    [toggled, fullscreen, currentScene, currentVideos, changeScene]
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
