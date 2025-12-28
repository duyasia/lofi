import { useMemo } from "react";
import { useVideo, useAudio } from "../../store";
import type { VideoBackgroundProps } from "../../types";

/**
 * VideoBackground - Lazy-loaded video background component
 * Only renders the currently active video based on day/night + rain state
 */
const VideoBackground: React.FC<VideoBackgroundProps> = ({ videos, className = "" }) => {
  const { toggled, fullscreen } = useVideo();
  const { rain } = useAudio();

  // Determine which video to show based on current state
  const activeVideo = useMemo(() => {
    const isDay = toggled;
    const isRaining = rain;

    if (isDay && !isRaining) return videos.day;
    if (isDay && isRaining) return videos.rainyDay;
    if (!isDay && !isRaining) return videos.night;
    return videos.rainyNight;
  }, [toggled, rain, videos]);

  const topPosition = fullscreen ? "top-[0%]" : "top-[-11%]";

  return (
    <video
      key={activeVideo}
      className={`w-[100vw] z-[-1] absolute ${topPosition} object-cover ${className}`}
      loop
      autoPlay
      muted
      playsInline
    >
      <source src={activeVideo} type="video/mp4" />
    </video>
  );
};

export default VideoBackground;
