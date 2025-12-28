import { useContext } from "react";
import { StoreContext } from "../../store";

import ReactAudioPlayer from "react-audio-player";

import "./Home.scss";
import Slider from "@mui/material/Slider";

const Home = () => {
  const valueCT = useContext(StoreContext);
  const toggled = valueCT.toggled;
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
  const handleChangeCityRain = (e) => {
    setCityRain(e.target.value);
    setVolumeRain(e.target.value);
  };
  const handleChangeCityTraffic = (e) => {
    setCityTraffic(e.target.value);
    setVolumeTraffic(e.target.value);
  };

  const comboMode = `${toggled}-${rain}`;

  return (
    <div>
      <div>
        {/* Video */}
        <div>
          {/* Day */}
          <video
            className={`background-video-home w-[100vw] z-[-1] absolute ${
              fullscreen ? "top-[0%]" : "top-[-11%]"
            } object-cover transition-opacity ease-in duration-300 ${
              comboMode === "true-false" ? "opacity-100" : "opacity-0"
            }`}
            loop
            autoPlay
            muted
          >
            <source src="./assets/video/ExteriorDay.mp4" type="video/mp4" />
          </video>
          {/* Rain Day */}
          <video
            className={`background-video-home w-[100vw] z-[-1] absolute ${
              fullscreen ? "top-[0%]" : "top-[-11%]"
            } object-cover transition-opacity ease-in duration-300 ${
              comboMode === "true-true" ? "opacity-100" : "opacity-0"
            }`}
            loop
            autoPlay
            muted
          >
            <source
              src="./assets/video/ExteriorRainyDay.mp4"
              type="video/mp4"
            />
          </video>
          {/* Night */}
          <video
            className={`background-video-home w-[100vw] z-[-1] absolute ${
              fullscreen ? "top-[0%]" : "top-[-11%]"
            } object-cover transition-opacity ease-in duration-300 ${
              comboMode === "false-false" ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            loop
            muted
          >
            <source src="./assets/video/ExteriorNight.mp4" type="video/mp4" />
          </video>
          {/* Rain Night */}
          <video
            className={`background-video-home w-[100vw] z-[-1] absolute ${
              fullscreen ? "top-[0%]" : "top-[-11%]"
            } object-cover transition-opacity ease-in duration-300 ${
              comboMode === "false-true" ? "opacity-100" : "opacity-0"
            }`}
            loop
            autoPlay
            muted
          >
            <source
              src="./assets/video/ExteriorRainyNight.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        {/* Action */}
        <div>
          {/* Rain */}
          <div className="popover-action flex flex-col justify-start items-center absolute top-[40%] left-[6%] w-[200px] h-auto cursor-pointer select-none">
            <div
              className="border-white circle-hover flex justify-center items-center w-[32px] h-[32px] border-[3px] rounded-full cursor-pointer transition-all duration-[20] ease-in"
              onClick={handleRain}
            >
              <div className="opacity-0 bg-white w-[18px] h-[18px] rounded-full transition-all duration-[20] ease-in"></div>
            </div>
            <div className="title flex flex-col items-center justify-center min-w-[120px] min-h-[1px] p-[8px] mt-[8px] bg-[#00000080] rounded-[8px] transition-all ease-in-out duration-[20]">
              <h6
                className="mx-[16px] text-[16px] font-[500] leading-[16px] text-white hover:opacity-60 "
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
          {/* Traffic */}
          <div className="popover-action flex flex-col justify-start items-center absolute top-[68%] left-[30%] w-[200px] h-auto cursor-pointer">
            <div
              className="border-white circle-hover flex justify-center items-center w-[32px] h-[32px] border-[3px] rounded-full cursor-pointer transition-all duration-[20] ease-in"
              onClick={handleTraffic}
            >
              <div className="opacity-0 bg-white w-[18px] h-[18px] rounded-full transition-all duration-[20] ease-in"></div>
            </div>
            <div className="title flex flex-col items-center justify-center min-w-[120px] min-h-[1px] p-[8px] mt-[8px] bg-[#00000080] rounded-[8px] transition-all ease-in-out duration-[20]">
              <h6
                className="mx-[16px] text-[16px] font-[500] leading-[16px] text-white hover:opacity-60"
                onClick={handleTraffic}
              >
                City Traffic
              </h6>
              {traffic && (
                <div className="px-[16px] mt-[5px]">
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/audio/city_traffic.mp3"
                    loop
                    volume={cityTraffic / 100}
                  />
                  <Slider
                    style={{ padding: 0 }}
                    className="volume-slider"
                    value={cityTraffic}
                    onChange={handleChangeCityTraffic}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Enter */}
          <div className="popover-action flex flex-col justify-start items-center absolute top-[60%] left-[60%] w-[200px] h-auto cursor-pointer">
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
                Enter
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
