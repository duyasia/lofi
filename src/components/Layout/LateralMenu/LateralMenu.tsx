import React, { useState, useMemo } from "react";
import "./LateralMenu.scss";
import Icon from "../../Icon/Icon";

import { useAudio } from "../../../store";
import { chill, jazzy, sleep } from "../../../data/dataSong";
import {
  MoodPanel,
  PlaylistPanel,
  ChangeSetPanel,
  ProductivityPanel,
} from "./panels";

const LateralMenu: React.FC = () => {
  // Panel visibility states
  const [mood, setMood] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [product, setProduct] = useState<boolean>(false);

  // Audio context values
  const {
    volumeRain,
    setVolumeRain,
    setRain,
    setCityRain,
    setCityTraffic,
    volumeTraffic,
    setVolumeTraffic,
    setTraffic,
    volumeKeyboard,
    setVolumeKeyboard,
    setSoundKey,
    setKeyboard,
    volumeSong,
    setVolumeSong,
    setSong,
    song,
  } = useAudio();

  // Derive active mood from current song array
  const activeMood = useMemo(() => {
    if (!song || song.length === 0) return "chill";
    const firstSrc = song[0]?.src || "";
    if (firstSrc === sleep[0]?.src) return "sleep";
    if (firstSrc === jazzy[0]?.src) return "jazzy";
    return "chill";
  }, [song]);

  // Close all panels except the one being opened
  const closeAllPanels = () => {
    setMood(false);
    setPlaylist(false);
    setChange(false);
    setProduct(false);
  };

  // Panel toggle handlers - Fixed cycle functionality
  const handleMood = () => {
    if (mood) {
      // If already open, close it
      setMood(false);
    } else {
      // Close all other panels first, then open this one
      setPlaylist(false);
      setChange(false);
      setProduct(false);
      setMood(true);
    }
  };

  const handlePlaylist = () => {
    if (playlist) {
      // If already open, close it
      setPlaylist(false);
    } else {
      // Close all other panels first, then open this one
      setMood(false);
      setChange(false);
      setProduct(false);
      setPlaylist(true);
    }
  };

  const handleChange = () => {
    if (change) {
      // If already open, close it
      setChange(false);
    } else {
      // Close all other panels first, then open this one
      setMood(false);
      setPlaylist(false);
      setProduct(false);
      setChange(true);
    }
  };

  const handleProduct = () => {
    if (product) {
      // If already open, close it
      setProduct(false);
    } else {
      // Close all other panels first, then open this one
      setMood(false);
      setPlaylist(false);
      setChange(false);
      setProduct(true);
    }
  };

  // Volume change handlers
  const handleChangeRain = (e: Event, value: number | number[]) => {
    const vol = Array.isArray(value) ? value[0] : value;
    setVolumeRain(vol);
    setCityRain(vol);
    if (vol > 0) {
      setRain(true);
    } else {
      setRain(false);
    }
  };

  const handleChangeTraffic = (e: Event, value: number | number[]) => {
    const vol = Array.isArray(value) ? value[0] : value;
    setVolumeTraffic(vol);
    setCityTraffic(vol);
    if (vol > 0) {
      setTraffic(true);
    } else {
      setTraffic(false);
    }
  };

  const handleChangeKeyboard = (e: Event, value: number | number[]) => {
    const vol = Array.isArray(value) ? value[0] : value;
    setVolumeKeyboard(vol);
    setSoundKey(vol);
    if (vol > 0) {
      setKeyboard(true);
    } else {
      setKeyboard(false);
    }
  };

  const handleChangeVolumeSong = (e: Event, value: number | number[]) => {
    const vol = Array.isArray(value) ? value[0] : value;
    setVolumeSong(vol);
  };

  // Mood click handlers - simplified since we derive state from song
  const handleClickSleep = () => {
    setSong(sleep);
  };

  const handleClickJazzy = () => {
    setSong(jazzy);
  };

  const handleClickChill = () => {
    setSong(chill);
  };

  return (
    <div>
      {/* Lateral Menu Bar - Glassmorphism 2026 - Enhanced */}
      <div className="hidden sm:flex absolute right-[12px] sm:right-[16px] md:right-[24px] top-[30%] flex-col items-center justify-center rounded-[16px] sm:rounded-[20px] md:rounded-[24px] glass-ultra h-[280px] sm:h-[300px] md:h-[340px] w-[60px] sm:w-[70px] md:w-[80px] py-[12px] sm:py-[16px] md:py-[20px] gap-[2px] sm:gap-[3px] md:gap-[4px]">
        {/* Mood Button */}
        <div className="w-full h-[60px] sm:h-[68px] md:h-[76px] flex justify-center items-center relative cursor-pointer group">
          <button
            className={`w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] outline-none overflow-hidden transition-all duration-300 z-20 hover:scale-110 active:scale-95 flex items-center justify-center ${
              mood 
                ? "opacity-100 glass-strong shadow-glow border border-accent/30" 
                : "opacity-50 hover:opacity-80 bg-transparent"
            }`}
            onClick={handleMood}
            aria-label="Mood panel"
          >
            <Icon name="mood" size={32} className="sm:w-9 sm:h-9 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110 text-white" />
          </button>
        </div>

        {/* Playlist Button */}
        <div className="w-full h-[60px] sm:h-[68px] md:h-[76px] flex justify-center items-center relative cursor-pointer group">
          <button
            className={`w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] outline-none z-10 overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
              playlist 
                ? "opacity-100 glass-strong shadow-glow border border-accent/30" 
                : "opacity-50 hover:opacity-80 bg-transparent"
            }`}
            onClick={handlePlaylist}
            aria-label="Playlist panel"
          >
            <Icon name="playlist_play" size={32} className="sm:w-9 sm:h-9 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110 text-white" />
          </button>
        </div>

        {/* Change Set Button */}
        <div className="w-full h-[60px] sm:h-[68px] md:h-[76px] flex justify-center items-center relative cursor-pointer group">
          <button
            className={`w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] z-10 outline-none overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
              change 
                ? "opacity-100 glass-strong shadow-glow border border-accent/30" 
                : "opacity-50 hover:opacity-80 bg-transparent"
            }`}
            onClick={handleChange}
            aria-label="Change set panel"
          >
            <Icon name="swap_horiz" size={32} className="sm:w-9 sm:h-9 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110 text-white" />
          </button>
        </div>

        {/* Product Button */}
        <div className="w-full h-[60px] sm:h-[68px] md:h-[76px] flex justify-center items-center relative cursor-pointer group">
          <button
            className={`w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[64px] md:h-[64px] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] z-20 outline-none overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
              product 
                ? "opacity-100 glass-strong shadow-glow border border-accent/30" 
                : "opacity-50 hover:opacity-80 bg-transparent"
            }`}
            onClick={handleProduct}
            aria-label="Productivity panel"
          >
            <Icon name="work" size={32} className="sm:w-9 sm:h-9 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110 text-white" />
          </button>
        </div>
      </div>

      {/* Panels */}
      <MoodPanel
        isOpen={mood}
        clickSleep={activeMood === "sleep"}
        clickJazzy={activeMood === "jazzy"}
        clickChill={activeMood === "chill"}
        volumeSong={volumeSong}
        volumeTraffic={volumeTraffic}
        volumeRain={volumeRain}
        volumeKeyboard={volumeKeyboard}
        onClickSleep={handleClickSleep}
        onClickJazzy={handleClickJazzy}
        onClickChill={handleClickChill}
        onChangeVolumeSong={handleChangeVolumeSong}
        onChangeTraffic={handleChangeTraffic}
        onChangeRain={handleChangeRain}
        onChangeKeyboard={handleChangeKeyboard}
      />

      <PlaylistPanel isOpen={playlist} />

      <ChangeSetPanel isOpen={change} />

      <ProductivityPanel isOpen={product} />
    </div>
  );
};

export default LateralMenu;
