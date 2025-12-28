import { useAudio, useUI } from "../../store";
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
  const { setEnter } = useUI();
  const {
    rain,
    cityRain,
    toggleRain,
    changeRainVolume,
    keyboard,
    soundKey,
    toggleKeyboard,
    changeKeyboardVolume,
  } = useAudio();

  const handleEnter = () => setEnter((s) => !s);

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
            onToggle={toggleRain}
            onVolumeChange={changeRainVolume}
            position="top-[15%] left-[16%]"
          />

          {/* Keyboard */}
          <ActionPopover
            label="Keyboard"
            audioSrc="./assets/audio/key_board.mp3"
            isActive={keyboard}
            volume={soundKey}
            onToggle={toggleKeyboard}
            onVolumeChange={changeKeyboardVolume}
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
