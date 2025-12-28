import React, { useState, useMemo } from "react";
import images from "../../../assets/images/images";
import "./LateralMenu.scss";

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

  // Panel toggle handlers
  const handleMood = () => {
    const wasOpen = mood;
    closeAllPanels();
    setMood(!wasOpen);
  };

  const handlePlaylist = () => {
    const wasOpen = playlist;
    closeAllPanels();
    setPlaylist(!wasOpen);
  };

  const handleChange = () => {
    const wasOpen = change;
    closeAllPanels();
    setChange(!wasOpen);
  };

  const handleProduct = () => {
    const wasOpen = product;
    closeAllPanels();
    setProduct(!wasOpen);
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
      {/* Lateral Menu Bar */}
      <div className="absolute right-[20px] top-[30%] flex flex-col items-center justify-center rounded-full bg-[rgba(0,0,0,0.6)] h-[280px] w-[70px]">
        {/* Mood Button */}
        <div className="w-[100px] h-[70px] flex justify-center items-center relative cursor-pointer">
          <button
            className={`w-[70px] h-[70px] bg-transparent outline-none overflow-hidden transition-all duration-150 ease-in-out z-20 ${mood ? "opacity-100" : "opacity-20 brightness-200"}`}
            onClick={handleMood}
          >
            <img className="scale-150" src={images.mood} alt="mood" />
          </button>
          <div
            className={`-scale-y-100 absolute top-[-23px] right-[10px] h-[120px] w-[80px] z-10 ${mood ? "" : "hidden"}`}
          >
            <img src="./assets/img/menu/lateral_bottom.svg" alt="lateraltop" />
          </div>
          <div className="border-b-[2px] border-solid border-[#fff3] absolute bottom-0 h-[100%] left-[24px] top-0 w-[50px] pointer-events-none"></div>
        </div>

        {/* Playlist Button */}
        <div className="w-[100px] h-[70px] flex justify-center items-center relative cursor-pointer">
          <button
            className={`w-[70px] h-[70px] outline-none z-10 overflow-hidden transition-all duration-150 ease-in-out ${playlist ? "opacity-100 bg-[#070707]" : "opacity-20 brightness-200 bg-transparent"}`}
            onClick={handlePlaylist}
          >
            <img
              className="scale-150 ml-[-2px]"
              src={images.playlist}
              alt="playlist"
            />
          </button>
          <div className="border-b-[2px] border-solid border-[#fff3] absolute bottom-0 h-[100%] left-[24px] top-0 w-[50px] pointer-events-none"></div>
        </div>

        {/* Change Set Button */}
        <div className="w-[100px] h-[70px] flex justify-center items-center relative cursor-pointer">
          <button
            className={`w-[70px] h-[70px] z-10 outline-none overflow-hidden transition-all duration-150 ease-in-out ${change ? "opacity-100 bg-[#070707]" : "opacity-20 brightness-200 bg-transparent"}`}
            onClick={handleChange}
          >
            <img className="scale-150" src={images.change} alt="change" />
          </button>
          <div className="border-b-[2px] border-solid border-[#fff3] absolute bottom-0 h-[100%] left-[24px] top-0 w-[50px] pointer-events-none"></div>
        </div>

        {/* Product Button */}
        <div className="w-[100px] h-[70px] flex justify-center items-center relative cursor-pointer">
          <button
            className={`w-[70px] h-[70px] z-20 bg-transparent outline-none overflow-hidden ${product ? "opacity-100" : "opacity-20 brightness-200"}`}
            onClick={handleProduct}
          >
            <img className="scale-[0.4]" src={images.product} alt="product" />
          </button>
          <div
            className={`absolute top-[-26px] right-[10px] h-[120px] w-[80px] z-10 ${product ? "" : "hidden"}`}
          >
            <img src="./assets/img/menu/lateral_bottom.svg" alt="lateraltop" />
          </div>
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
