import { useContext, useState } from "react";
import { StoreContext } from "../../store";

import ReactAudioPlayer from "react-audio-player";

import "./BookCafe.scss";
import Slider from "@mui/material/Slider";

const BookCafe = () => {
  const valueCT = useContext(StoreContext);
  const toggled = valueCT.toggled;
  const setEnter = valueCT.setEnter;
  const rain = valueCT.rain;
  const setRain = valueCT.setRain;
  const cityRain = valueCT.cityRain;
  const setCityRain = valueCT.setCityRain;
  const setVolumeRain = valueCT.setVolumeRain;
  const keyboard = valueCT.keyboard;
  const setKeyboard = valueCT.setKeyboard;
  const soundKey = valueCT.soundKey;
  const setSoundKey = valueCT.setSoundKey;
  const setVolumeKeyboard = valueCT.setVolumeKeyboard;
  const fullscreen = valueCT.fullscreen;

  const handleRain = () => {
    setRain((s) => !s);
    if (rain === true) {
      setVolumeRain(0);
    } else {
      setVolumeRain(50);
      setCityRain(50);
    }
  };
  const handleKeyboard = () => {
    setKeyboard((s) => !s);
    if (keyboard === true) {
      setVolumeKeyboard(0);
    } else {
      setVolumeKeyboard(50);
      setSoundKey(50);
    }
  };
  const handleEnter = () => {
    setEnter((s) => !s);
  };
  const handleChangeCityRain = (e) => {
    setCityRain(e.target.value);
    setVolumeRain(e.target.value);
  };
  const handleChangeSoundKey = (e) => {
    setSoundKey(e.target.value);
    setVolumeKeyboard(e.target.value);
  };

  const comboMode = `${toggled}-${rain}`;

  return (
    <div>
      <div>
        {/* Video */}
        <div>
          {/* Day */}
          <video
            className={`background-video-cafe w-[100vw] z-[-1] absolute ${
              fullscreen ? "top-[0%]" : "top-[-11%]"
            } object-cover transition-all ease-in duration-300 ${
              comboMode === "true-false" ? "opacity-100" : "opacity-0"
            }`}
            loop
            autoPlay
            muted
          >
            <source src="./assets/video/CafeDay.mp4" type="video/mp4" />
          </video>
          {/* Rain Day */}
          <video
            className={`background-video-cafe w-[100vw] z-[-1] absolute ${
              fullscreen ? "top-[0%]" : "top-[-11%]"
            } object-cover transition-all ease-in duration-300 ${
              comboMode === "true-true" ? "opacity-100" : "opacity-0"
            }`}
            loop
            autoPlay
            muted
          >
            <source src="./assets/video/CafeRainyDay.mp4" type="video/mp4" />
          </video>
          {/* Night */}
          <video
            className={`background-video-cafe w-[100vw] z-[-1] absolute ${
              fullscreen ? "top-[0%]" : "top-[-11%]"
            } object-cover transition-all ease-in duration-300 ${
              comboMode === "false-false" ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            loop
            muted
          >
            <source src="./assets/video/CafeNight.mp4" type="video/mp4" />
          </video>
          {/* Rain Night */}
          <video
            className={`background-video-cafe w-[100vw] z-[-1] absolute ${
              fullscreen ? "top-[0%]" : "top-[-11%]"
            } object-cover transition-all ease-in duration-300 ${
              comboMode === "false-true" ? "opacity-100" : "opacity-0"
            }`}
            loop
            autoPlay
            muted
          >
            <source src="./assets/video/CafeRainyNight.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Action */}
        <div>
          {/* Rain */}
          <div className="popover-action flex flex-col justify-start items-center absolute top-[15%] left-[16%] w-[200px] h-auto cursor-pointer">
            <div
              className="border-white circle-hover flex justify-center items-center w-[32px] h-[32px] border-[3px] rounded-full cursor-pointer transition-all duration-[20] ease-in"
              onClick={handleRain}
            >
              <div className="opacity-0 bg-white w-[18px] h-[18px] rounded-full transition-all duration-[20] ease-in"></div>
            </div>
            <div className="title flex flex-col items-center justify-center min-w-[120px] min-h-[1px] p-[8px] mt-[8px] bg-[#00000080] rounded-[8px] transition-all ease-in-out duration-[20]">
              <h6
                className="mx-[16px] text-[16px] font-[500] leading-[16px] text-white hover:opacity-60"
                onClick={handleRain}
              >
                City Rain
              </h6>
              {rain && (
                <div className="px-[16px] mt-[5px]">
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/audio/rain_city.mp3"
                    loop
                    volume={cityRain / 100}
                  />
                  <Slider
                    style={{ padding: 0 }}
                    className="volume-slider"
                    value={cityRain}
                    onChange={handleChangeCityRain}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Keyboard */}
          <div className="popover-action flex flex-col justify-start items-center absolute top-[76%] left-[84%] w-[200px] z-[-1] h-auto cursor-pointer">
            <div
              className="border-white circle-hover flex justify-center items-center w-[32px] h-[32px] border-[3px] rounded-full cursor-pointer transition-all duration-[20] ease-in"
              onClick={handleKeyboard}
            >
              <div className="opacity-0 bg-white w-[18px] h-[18px] rounded-full transition-all duration-[20] ease-in"></div>
            </div>
            <div className="title flex flex-col items-center justify-center min-w-[120px] min-h-[1px] p-[8px] mt-[8px] bg-[#00000080] rounded-[8px] transition-all ease-in-out duration-[20]">
              <h6
                className="mx-[16px] text-[16px] font-[500] leading-[16px] text-white hover:opacity-60"
                onClick={handleKeyboard}
              >
                Keyboard
              </h6>
              {keyboard && (
                <div className="px-[16px] mt-[5px]">
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/audio/key_board.mp3"
                    loop
                    volume={soundKey / 100}
                  />
                  <Slider
                    style={{ padding: 0 }}
                    className="volume-slider"
                    value={soundKey}
                    onChange={handleChangeSoundKey}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Go Out */}
          <div className="popover-action flex flex-col justify-start items-center absolute top-[70%] left-[0%] w-[200px] h-auto cursor-pointer">
            <div
              className="border-white circle-hover flex justify-center items-center w-[32px] h-[32px] border-[3px] rounded-full cursor-pointer transition-all duration-[20] ease-in"
              onClick={handleEnter}
            >
              <div className="opacity-0 bg-white w-[18px] h-[18px] rounded-full transition-all duration-[20] ease-in"></div>
            </div>
            <div className="title flex flex-col items-center justify-center min-w-[120px] min-h-[1px] p-[8px] mt-[8px] bg-[#00000080] rounded-[8px] transition-all ease-in-out duration-[20]">
              <h6
                className="mx-[16px] text-[16px] font-[500] leading-[16px] text-white hover:opacity-60"
                onClick={handleEnter}
              >
                Go out
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCafe;
