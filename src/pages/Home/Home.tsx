import React from "react";
import { useAudio, useUI, useVideo } from "../../store";
import VideoBackground from "../../components/VideoBackground/VideoBackground";
import ActionPopover from "../../components/ActionPopover/ActionPopover";

import "./Home.scss";

const Home: React.FC = () => {
  const { setEnter } = useUI();
  const { currentVideos } = useVideo();
  const {
    rain,
    cityRain,
    toggleRain,
    changeRainVolume,
    traffic,
    cityTraffic,
    toggleTraffic,
    changeTrafficVolume,
  } = useAudio();

  const handleEnter = () => setEnter((s) => !s);

  return (
    <div>
      <div>
        {/* Video Background - Lazy loaded */}
        <VideoBackground
          videos={currentVideos}
          className="background-video-home"
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
            position="top-[40%] left-[6%]"
          />

          {/* Traffic */}
          <ActionPopover
            label="City Traffic"
            audioSrc="./assets/audio/city_traffic.mp3"
            isActive={traffic}
            volume={cityTraffic}
            onToggle={toggleTraffic}
            onVolumeChange={changeTrafficVolume}
            position="top-[68%] left-[30%]"
          />

          {/* Enter */}
          <ActionPopover
            label="Enter"
            isActive={false}
            volume={0}
            onToggle={handleEnter}
            onVolumeChange={() => {}}
            position="top-[60%] left-[60%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
