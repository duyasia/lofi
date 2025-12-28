import { useEffect, useRef, useState, useCallback } from "react";
import { useAudio } from "../../../store";
import type { Song } from "../../../types";

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
      handleClickNext();
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

      {/* Player controls container */}
      <div className="absolute flex flex-col items-center justify-center bottom-[4%] z-50 w-full">
        {/* Song name */}
        <div className="text-white text-[16px] font-[500] mb-2">
          {currentSong.name}
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 w-[400px] mb-2">
          <span className="text-white text-[12px] w-[40px] text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-[4px] bg-white/30 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, white ${progressPercent}%, rgba(255,255,255,0.3) ${progressPercent}%)`,
            }}
          />
          <span className="text-white text-[12px] w-[40px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-[20px]">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            className={`w-[24px] h-[24px] transition-opacity ${isShuffled ? "opacity-100" : "opacity-50"}`}
            aria-label="shuffle"
          >
            <img src="./assets/icon/shuffle.svg" alt="shuffle" />
          </button>

          {/* Prev */}
          <button
            className="w-[36px] h-[36px]"
            onClick={handleClickPrev}
            aria-label="previous"
          >
            <img src="./assets/icon/prev-song.svg" alt="prev" />
          </button>

          {/* Play/Pause */}
          <button
            className="w-[54px] h-[54px]"
            onClick={handlePlay}
            aria-label={playing ? "pause" : "play"}
          >
            {playing ? (
              <img src="./assets/icon/pause-icon.svg" alt="pause" />
            ) : (
              <img src="./assets/icon/play-icon.svg" alt="play" />
            )}
          </button>

          {/* Next */}
          <button
            className="w-[36px] h-[36px]"
            onClick={handleClickNext}
            aria-label="next"
          >
            <img src="./assets/icon/next-song.svg" alt="next" />
          </button>

          {/* Repeat */}
          <button
            onClick={toggleRepeat}
            className={`w-[24px] h-[24px] transition-opacity ${repeatMode !== "none" ? "opacity-100" : "opacity-50"}`}
            aria-label="repeat"
          >
            <img
              src={
                repeatMode === "one"
                  ? "./assets/icon/repeat-one.svg"
                  : "./assets/icon/repeat.svg"
              }
              alt="repeat"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
