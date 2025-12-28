import images from "../../../../assets/images/images";
import ReactAudioPlayer from "react-audio-player";
import Slider from "@mui/material/Slider";

/**
 * MoodPanel - Mood selection and volume controls panel
 */
const MoodPanel = ({
  isOpen,
  clickSleep,
  clickJazzy,
  clickChill,
  volumeSong,
  volumeTraffic,
  volumeRain,
  volumeKeyboard,
  onClickSleep,
  onClickJazzy,
  onClickChill,
  onChangeVolumeSong,
  onChangeTraffic,
  onChangeRain,
  onChangeKeyboard,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[17%] right-[90px] w-[345px] rounded-[24px] z-10 overflow-hidden bg-[#070707]">
      <div className="mx-[32px] py-[10px]">
        {/* Header */}
        <div className="h-[54px] flex items-center justify-between">
          <h4 className="font-[700] text-[20px] text-white leading-[24px]">
            Mood
          </h4>
        </div>

        {/* Mood Selection */}
        <div className="flex justify-center items-center gap-[12px] my-[16px]">
          {/* Sleepy */}
          <div
            className="relative flex items-center flex-col cursor-pointer h-[84px] w-[84px] bg-[hsla(0,0%,100%,.05)] rounded-[8px]"
            onClick={onClickSleep}
          >
            <div
              className={`absolute top-[-14%] left-2 bg-transparent ${clickSleep ? "" : "opacity-10 brightness-200"}`}
            >
              <img className="scale-[1.8]" src={images.sleep} alt="sleep" />
            </div>
            <p
              className={`absolute bottom-[10px] text-[#fff] text-[16px] ${clickSleep ? "opacity-100" : "opacity-30"}`}
            >
              Sleepy
            </p>
          </div>

          {/* Jazzy */}
          <div
            className="relative flex items-center flex-col cursor-pointer h-[84px] w-[84px] bg-[hsla(0,0%,100%,.05)] rounded-[8px]"
            onClick={onClickJazzy}
          >
            <div
              className={`absolute top-[-14%] left-2 bg-transparent ${clickJazzy ? "" : "opacity-10 brightness-200"}`}
            >
              <img className="scale-[1.8]" src={images.jazzy} alt="jazzy" />
            </div>
            <p
              className={`absolute bottom-[10px] text-[#fff] text-[16px] ${clickJazzy ? "opacity-100" : "opacity-30"}`}
            >
              Jazzy
            </p>
          </div>

          {/* Chill */}
          <div
            className="relative flex items-center flex-col cursor-pointer h-[84px] w-[84px] bg-[hsla(0,0%,100%,.05)] rounded-[8px]"
            onClick={onClickChill}
          >
            <div
              className={`absolute top-[-14%] left-2 bg-transparent ${clickChill ? "" : "opacity-10 brightness-200"}`}
            >
              <img className="scale-[1.8]" src={images.chill} alt="chill" />
            </div>
            <p
              className={`absolute bottom-[10px] text-[#fff] text-[16px] ${clickChill ? "opacity-100" : "opacity-30"}`}
            >
              Chill
            </p>
          </div>
        </div>

        {/* Volume Slider */}
        <div className="flex justify-center items-center gap-[10px] my-[32px]">
          <img src={images.volumemin} alt="volumemin" />
          <div className="px-[16px] mt-[5px]">
            <ReactAudioPlayer preload="auto" autoPlay loop volume={volumeSong / 100} />
            <Slider
              style={{ padding: 0 }}
              className="volume-slider"
              value={volumeSong}
              onChange={onChangeVolumeSong}
            />
          </div>
          <img src={images.volumemax} alt="volumemax" />
        </div>

        {/* Background Noises Header */}
        <div className="h-[24px] mt-[30px] mb-[8px] flex items-center justify-between">
          <h4 className="font-[700] text-[20px] text-white leading-[24px]">
            Background noises
          </h4>
        </div>

        {/* Noise Controls */}
        <div>
          {/* City Traffic */}
          <div className="flex items-center justify-between py-[8px]">
            <p className="text-[14px] text-white opacity-40">City traffic</p>
            <div>
              <ReactAudioPlayer
                preload="auto"
                autoPlay
                loop
                src="./assets/audio/city_traffic.mp3"
                volume={volumeTraffic / 100}
              />
              <Slider
                style={{ padding: 0 }}
                className="volume-noise--traffic opacity-100"
                value={volumeTraffic}
                onChange={onChangeTraffic}
              />
            </div>
          </div>

          {/* City Rain */}
          <div className="flex items-center justify-between py-[8px]">
            <p className="text-[14px] text-white opacity-40">City rain</p>
            <div>
              <ReactAudioPlayer
                preload="auto"
                autoPlay
                loop
                volume={volumeRain / 100}
              />
              <Slider
                style={{ padding: 0 }}
                className="volume-noise--rain"
                value={volumeRain}
                onChange={onChangeRain}
              />
            </div>
          </div>

          {/* Keyboard */}
          <div className="flex items-center justify-between py-[8px]">
            <p className="text-[14px] text-white opacity-40">Keyboard</p>
            <div>
              <ReactAudioPlayer
                preload="auto"
                autoPlay
                loop
                src="./assets/audio/key_board.mp3"
                volume={volumeKeyboard / 100}
              />
              <Slider
                style={{ padding: 0 }}
                className="volume-noise--keyboard"
                value={volumeKeyboard}
                onChange={onChangeKeyboard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodPanel;
