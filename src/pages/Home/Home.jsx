import { useContext } from "react";
import { StoreContext } from "../../store";
import VideoBackground from "../../components/VideoBackground/VideoBackground";
import ActionPopover from "../../components/ActionPopover/ActionPopover";

import "./Home.scss";

const EXTERIOR_VIDEOS = {
  day: "./assets/video/ExteriorDay.mp4",
  rainyDay: "./assets/video/ExteriorRainyDay.mp4",
  night: "./assets/video/ExteriorNight.mp4",
  rainyNight: "./assets/video/ExteriorRainyNight.mp4",
};

const Home = () => {
  const valueCT = useContext(StoreContext);
  const setEnter = valueCT.setEnter;
  const rain = valueCT.rain;
  const setRain = valueCT.setRain;
  const cityRain = valueCT.cityRain;
  const setCityRain = valueCT.setCityRain;
  const setVolumeRain = valueCT.setVolumeRain;
  const cityTraffic = valueCT.cityTraffic;
  const setCityTraffic = valueCT.setCityTraffic;
  const traffic = valueCT.traffic;
  const setTraffic = valueCT.setTraffic;
  const setVolumeTraffic = valueCT.setVolumeTraffic;

  const handleRain = () => {
    setRain((s) => !s);
    if (rain === true) {
      setVolumeRain(0);
    } else {
      setVolumeRain(50);
      setCityRain(50);
    }
  };

  const handleTraffic = () => {
    setTraffic((s) => !s);
    if (traffic === true) {
      setVolumeTraffic(0);
    } else {
      setVolumeTraffic(50);
      setCityTraffic(50);
    }
  };

  const handleEnter = () => {
    setEnter((s) => !s);
  };

  const handleChangeCityRain = (value) => {
    setCityRain(value);
    setVolumeRain(value);
  };

  const handleChangeCityTraffic = (value) => {
    setCityTraffic(value);
    setVolumeTraffic(value);
  };

  return (
    <div>
      <div>
        {/* Video Background - Lazy loaded */}
        <VideoBackground
          videos={EXTERIOR_VIDEOS}
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
            onToggle={handleRain}
            onVolumeChange={handleChangeCityRain}
            position="top-[40%] left-[6%]"
          />

          {/* Traffic */}
          <ActionPopover
            label="City Traffic"
            audioSrc="./assets/audio/city_traffic.mp3"
            isActive={traffic}
            volume={cityTraffic}
            onToggle={handleTraffic}
            onVolumeChange={handleChangeCityTraffic}
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
