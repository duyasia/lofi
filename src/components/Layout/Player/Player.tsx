import { useEffect, useRef, useState, useCallback } from "react";
import { useAudio } from "../../../store";
import type { Song } from "../../../types";
import Icon from "../../Icon/Icon";

type RepeatMode = "none" | "one" | "all";

/** Format seconds to mm:ss */
const formatTime = (seconds: number): string => {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const Player: React.FC = () => {
  const { song, volumeSong } = useAudio();
  const [currentSong, setCurrentSong] = useState<Song>(song[0]);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Progress bar state
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Playback mode state
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("all");

  const handlePlay = () => setPlaying((s) => !s);

  // Time update handler
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  // Duration loaded handler
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  // Seek handler
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  // Next song handler (supports shuffle)
  const handleClickNext = useCallback(() => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * song.length);
      setCurrentSong(song[randomIndex]);
    } else {
      const index = song.findIndex((x) => x.name === currentSong.name);
      if (index === song.length - 1) {
        setCurrentSong(song[0]);
      } else {
        setCurrentSong(song[index + 1]);
      }
    }
    // Reset progress when moving to next track
    setCurrentTime(0);
    setDuration(0);
    setPlaying(true);
  }, [song, currentSong.name, isShuffled]);

  // Previous song handler
  const handleClickPrev = useCallback(() => {
    const index = song.findIndex((x) => x.name === currentSong.name);
    if (index === 0) {
      setCurrentSong(song[song.length - 1]);
    } else {
      setCurrentSong(song[index - 1]);
    }
    // Reset progress when moving to previous track
    setCurrentTime(0);
    setDuration(0);
    setPlaying(true);
  }, [song, currentSong.name]);

  // Song ended handler
  const handleEnded = useCallback(() => {
    if (repeatMode === "one") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (repeatMode === "all") {
      // If only one song in the list, just restart it
      if (song.length <= 1) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      } else {
        handleClickNext();
      }
    } else {
      // repeatMode === "none"
      const index = song.findIndex((x) => x.name === currentSong.name);
      if (index < song.length - 1) {
        handleClickNext();
      } else {
        setPlaying(false);
      }
    }
  }, [repeatMode, handleClickNext, song, currentSong.name]);

  // Toggle handlers
  const toggleShuffle = () => setIsShuffled((s) => !s);

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === "none") return "one";
      if (prev === "one") return "all";
      return "none";
    });
  };

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumeSong / 100;
    }
  }, [volumeSong]);

  // When the current song changes, ensure the audio element is reset
  // and, if we are in playing state, start the new track automatically.
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);

    if (playing) {
      const playPromise = audioRef.current.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // In case autoplay is blocked or fails, mark as not playing
          setPlaying(false);
        });
      }
    }
  }, [currentSong, playing]);

  useEffect(() => {
    setCurrentSong(song[0]);
  }, [song]);

  // Calculate progress percentage for custom slider styling
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center">
      <audio
        ref={audioRef}
        src={currentSong.src}
        loop={repeatMode === "one"}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Player controls container - Glassmorphism 2026 */}
      <div className="absolute flex flex-col items-center justify-center bottom-[5%] z-50 w-full px-[24px] pointer-events-none">
        <div className="glass-strong rounded-[24px] px-[32px] py-[24px] backdrop-blur-xl min-w-[480px] max-w-[600px] pointer-events-auto">
          {/* Song name - Minimalism 2.0: Larger typography */}
          <div className="text-white text-[18px] font-[600] mb-[16px] text-center tracking-tight">
            {currentSong.name}
          </div>

          {/* Progress bar - Enhanced with better styling */}
          <div className="flex items-center gap-[16px] w-full mb-[20px]">
            <span className="text-white text-[13px] w-[48px] text-right font-[500] opacity-70">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-[6px] bg-white/20 rounded-full appearance-none cursor-pointer transition-all duration-200 hover:h-[8px]"
              style={{
                background: `linear-gradient(to right, var(--color-accent) ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
              }}
            />
            <span className="text-white text-[13px] w-[48px] font-[500] opacity-70">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls - Enhanced with micro-interactions */}
          <div className="flex items-center justify-center gap-[24px]">
            {/* Shuffle */}
            <button
              onClick={toggleShuffle}
              className={`w-[28px] h-[28px] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center text-white ${
                isShuffled 
                  ? "opacity-100" 
                  : "opacity-50 hover:opacity-70"
              }`}
              aria-label="shuffle"
            >
              <Icon name="shuffle" size={28} />
            </button>

            {/* Prev */}
            <button
              className="w-[40px] h-[40px] transition-all duration-300 hover:scale-110 active:scale-95 hover:opacity-80 flex items-center justify-center text-white"
              onClick={handleClickPrev}
              aria-label="previous"
            >
              <Icon name="skip_previous" size={40} />
            </button>

            {/* Play/Pause - Enhanced with glow effect */}
            <button
              className={`w-[40px] h-[40px] rounded-full transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center text-white ${
                playing ? "shadow-glow" : ""
              }`}
              onClick={handlePlay}
              aria-label={playing ? "pause" : "play"}
            >
              <Icon name={playing ? "pause" : "play_circle"} size={40} />
            </button>

            {/* Next */}
            <button
              className="w-[40px] h-[40px] transition-all duration-300 hover:scale-110 active:scale-95 hover:opacity-80 flex items-center justify-center text-white"
              onClick={handleClickNext}
              aria-label="next"
            >
              <Icon name="skip_next" size={40} />
            </button>

            {/* Repeat */}
            <button
              onClick={toggleRepeat}
              className={`w-[28px] h-[28px] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center text-white ${
                repeatMode !== "none" 
                  ? "opacity-100" 
                  : "opacity-50 hover:opacity-70"
              }`}
              aria-label="repeat"
            >
              <Icon name={repeatMode === "one" ? "repeat_one" : "repeat"} size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
