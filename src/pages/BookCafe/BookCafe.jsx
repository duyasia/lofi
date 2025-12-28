import { useContext } from "react";
import { StoreContext } from "../../store";
import VideoBackground from "../../components/VideoBackground/VideoBackground";
import ActionPopover from "../../components/ActionPopover/ActionPopover";

import "./BookCafe.scss";

const CAFE_VIDEOS = {
  day: "./assets/video/CafeDay.mp4",
  rainyDay: "./assets/video/CafeRainyDay.mp4",
  night: "./assets/video/CafeNight.mp4",
  rainyNight: "./assets/video/CafeRainyNight.mp4",
};

const BookCafe = () => {
  const valueCT = useContext(StoreContext);
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

  const handleChangeCityRain = (value) => {
    setCityRain(value);
    setVolumeRain(value);
  };

  const handleChangeSoundKey = (value) => {
    setSoundKey(value);
    setVolumeKeyboard(value);
  };

  return (
    <div>
      <div>
        {/* Video Background - Lazy loaded */}
        <VideoBackground
          videos={CAFE_VIDEOS}
          className="background-video-cafe"
        />

        {/* Action Popovers */}
        <div>
          {/* Rain */}
          <ActionPopover
            label="City Rain"
            audioSrc="./assets/audio/rain_city.mp3"
            isActive={rain}
            volume={cityRain}
            onToggle={handleRain}
            onVolumeChange={handleChangeCityRain}
            position="top-[15%] left-[16%]"
          />

          {/* Keyboard */}
          <ActionPopover
            label="Keyboard"
            audioSrc="./assets/audio/key_board.mp3"
            isActive={keyboard}
            volume={soundKey}
            onToggle={handleKeyboard}
            onVolumeChange={handleChangeSoundKey}
            position="top-[76%] left-[84%]"
            zIndex="z-[-1]"
          />

          {/* Go Out */}
          <ActionPopover
            label="Go out"
            isActive={false}
            volume={0}
            onToggle={handleEnter}
            onVolumeChange={() => {}}
            position="top-[70%] left-[0%]"
          />
        </div>
      </div>
    </div>
  );
};

export default BookCafe;
