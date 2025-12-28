import { useContext, useState } from "react";
import images from "../../../assets/images/images";
import "./LateralMenu.scss";

import { StoreContext } from "../../../store";
import { chill, jazzy, sleep } from "../../../data/dataSong";
import {
  MoodPanel,
  PlaylistPanel,
  ChangeSetPanel,
  ProductivityPanel,
} from "./panels";

const LateralMenu = () => {
  // Panel visibility states
  const [mood, setMood] = useState(false);
  const [playlist, setPlaylist] = useState(false);
  const [change, setChange] = useState(false);
  const [product, setProduct] = useState(false);

  // Mood selection states
  const [clickSleep, setClickSleep] = useState(false);
  const [clickJazzy, setClickJazzy] = useState(false);
  const [clickChill, setClickChill] = useState(true);

  // Context values
  const valueCT = useContext(StoreContext);
  const volumeRain = valueCT.volumeRain;
  const setVolumeRain = valueCT.setVolumeRain;
  const setRain = valueCT.setRain;
  const setCityRain = valueCT.setCityRain;
  const setCityTraffic = valueCT.setCityTraffic;
  const volumeTraffic = valueCT.volumeTraffic;
  const setVolumeTraffic = valueCT.setVolumeTraffic;
  const setTraffic = valueCT.setTraffic;
  const volumeKeyboard = valueCT.volumeKeyboard;
  const setVolumeKeyboard = valueCT.setVolumeKeyboard;
  const setSoundKey = valueCT.setSoundKey;
  const setKeyboard = valueCT.setKeyboard;
  const volumeSong = valueCT.volumeSong;
  const setVolumeSong = valueCT.setVolumeSong;
  const setSong = valueCT.setSong;

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
  const handleChangeRain = (e) => {
    setVolumeRain(e.target.value);
    setCityRain(e.target.value);
    if (e.target.value > 0) {
      setRain(true);
    } else {
      setRain(false);
    }
  };

  const handleChangeTraffic = (e) => {
    setVolumeTraffic(e.target.value);
    setCityTraffic(e.target.value);
    if (e.target.value > 0) {
      setTraffic(true);
    } else {
      setTraffic(false);
    }
  };

  const handleChangeKeyboard = (e) => {
    setVolumeKeyboard(e.target.value);
    setSoundKey(e.target.value);
    if (e.target.value > 0) {
      setKeyboard(true);
    } else {
      setKeyboard(false);
    }
  };

  const handleChangeVolumeSong = (e) => {
    setVolumeSong(e.target.value);
  };

  // Mood click handlers
  const handleClickSleep = () => {
    setSong(sleep);
    setClickSleep(true);
    setClickJazzy(false);
    setClickChill(false);
  };

  const handleClickJazzy = () => {
    setSong(jazzy);
    setClickJazzy(true);
    setClickSleep(false);
    setClickChill(false);
  };

  const handleClickChill = () => {
    setSong(chill);
    setClickChill(true);
    setClickJazzy(false);
    setClickSleep(false);
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
        clickSleep={clickSleep}
        clickJazzy={clickJazzy}
        clickChill={clickChill}
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
