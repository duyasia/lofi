import React from "react";
import { useAudio, useUI, useVideo } from "../../store";
import VideoBackground from "../../components/VideoBackground/VideoBackground";
import ActionPopover from "../../components/ActionPopover/ActionPopover";

import "./BookCafe.scss";

const BookCafe: React.FC = () => {
  const { setEnter } = useUI();
  const { currentVideos, changeScene } = useVideo();
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

  const handleEnter = () => {
    setEnter((s) => !s);
    changeScene('exterior'); // Switch back to exterior scene when going out
  };

  return (
    <div>
      <div>
        {/* Video Background - Lazy loaded */}
        <VideoBackground
          videos={currentVideos}
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
            zIndex="z-[60]"
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
            zIndex="z-[60]"
          />

          {/* Go Out */}
          <ActionPopover
            label="Go out"
            isActive={false}
            volume={0}
            onToggle={handleEnter}
            onVolumeChange={() => {}}
            position="top-[70%] left-[0%]"
            zIndex="z-[60]"
          />
        </div>
      </div>
    </div>
  );
};

export default BookCafe;
