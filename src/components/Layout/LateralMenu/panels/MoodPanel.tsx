import React from "react";
import ReactAudioPlayer from "react-audio-player";
import Slider from "@mui/material/Slider";
import type { MoodPanelProps } from "types/index";
import Icon from "../../../Icon/Icon";

/**
 * MoodPanel - Mood selection and volume controls panel
 */
const MoodPanel: React.FC<MoodPanelProps> = ({
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
    <div className="absolute top-[17%] right-[120px] w-[380px] rounded-[24px] z-10 overflow-hidden glass-ultra animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mx-[36px] py-[24px]">
        {/* Header - Minimalism 2.0: Larger typography */}
        <div className="h-[60px] flex items-center justify-between mb-[24px]">
          <h4 className="font-[700] text-[24px] text-white leading-[28px] tracking-tight">
            Mood
          </h4>
        </div>

        {/* Mood Selection - Enhanced with micro-interactions */}
        <div className="flex justify-center items-center gap-[16px] my-[24px]">
          {/* Sleepy */}
          <div
            className={`relative flex items-center flex-col cursor-pointer h-[100px] w-[100px] rounded-[16px] transition-all duration-300 hover:scale-105 active:scale-95 ${
              clickSleep 
                ? "glass shadow-glow border border-accent/30" 
                : "bg-white/5 hover:bg-white/10"
            }`}
            onClick={onClickSleep}
          >
            <div
              className={`absolute top-[-16%] bg-transparent transition-all duration-300 flex items-center justify-center ${
                clickSleep ? "opacity-100 scale-110" : "opacity-30 scale-100"
              }`}
            >
              <Icon name="bed" size={64} className="text-white" />
            </div>
            <p
              className={`absolute bottom-[12px] text-white text-[15px] font-[500] transition-all duration-300 ${
                clickSleep ? "opacity-100 text-accent" : "opacity-50"
              }`}
            >
              Sleepy
            </p>
          </div>

          {/* Jazzy */}
          <div
            className={`relative flex items-center flex-col cursor-pointer h-[100px] w-[100px] rounded-[16px] transition-all duration-300 hover:scale-105 active:scale-95 ${
              clickJazzy 
                ? "glass shadow-glow border border-accent/30" 
                : "bg-white/5 hover:bg-white/10"
            }`}
            onClick={onClickJazzy}
          >
            <div
              className={`absolute top-[-16%] bg-transparent transition-all duration-300 flex items-center justify-center ${
                clickJazzy ? "opacity-100 scale-110" : "opacity-30 scale-100"
              }`}
            >
              <Icon name="library_music" size={64} className="text-white" />
            </div>
            <p
              className={`absolute bottom-[12px] text-white text-[15px] font-[500] transition-all duration-300 ${
                clickJazzy ? "opacity-100 text-accent" : "opacity-50"
              }`}
            >
              Jazzy
            </p>
          </div>

          {/* Chill */}
          <div
            className={`relative flex items-center flex-col cursor-pointer h-[100px] w-[100px] rounded-[16px] transition-all duration-300 hover:scale-105 active:scale-95 ${
              clickChill 
                ? "glass shadow-glow border border-accent/30" 
                : "bg-white/5 hover:bg-white/10"
            }`}
            onClick={onClickChill}
          >
            <div
              className={`absolute top-[-16%] bg-transparent transition-all duration-300 flex items-center justify-center ${
                clickChill ? "opacity-100 scale-110" : "opacity-30 scale-100"
              }`}
            >
              <Icon name="spa" size={64} className="text-white" />
            </div>
            <p
              className={`absolute bottom-[12px] text-white text-[15px] font-[500] transition-all duration-300 ${
                clickChill ? "opacity-100 text-accent" : "opacity-50"
              }`}
            >
              Chill
            </p>
          </div>
        </div>

        {/* Volume Slider - Enhanced spacing */}
        <div className="flex justify-center items-center gap-[12px] my-[32px] px-[8px]">
          <Icon name="volume_down" size={20} className="opacity-60 text-white" />
          <div className="flex-1 px-[8px]">
            <ReactAudioPlayer preload="auto" autoPlay loop volume={volumeSong / 100} />
            <Slider
              style={{ padding: 0 }}
              className="volume-slider"
              value={volumeSong}
              onChange={onChangeVolumeSong}
            />
          </div>
          <Icon name="volume_up" size={20} className="opacity-60 text-white" />
        </div>

        {/* Background Noises Header - Minimalism 2.0 */}
        <div className="h-[32px] mt-[36px] mb-[12px] flex items-center justify-between border-t border-white/10 pt-[20px]">
          <h4 className="font-[700] text-[20px] text-white leading-[24px] tracking-tight">
            Background noises
          </h4>
        </div>

        {/* Noise Controls - Enhanced with better spacing */}
        <div className="space-y-[12px]">
          {/* City Traffic */}
          <div className="flex items-center justify-between py-[10px] px-[4px] rounded-[12px] hover:bg-white/5 transition-colors duration-200">
            <p className="text-[15px] text-white font-[500] opacity-70">City traffic</p>
            <div className="flex-1 max-w-[180px] ml-[16px]">
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
          <div className="flex items-center justify-between py-[10px] px-[4px] rounded-[12px] hover:bg-white/5 transition-colors duration-200">
            <p className="text-[15px] text-white font-[500] opacity-70">City rain</p>
            <div className="flex-1 max-w-[180px] ml-[16px]">
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
          <div className="flex items-center justify-between py-[10px] px-[4px] rounded-[12px] hover:bg-white/5 transition-colors duration-200">
            <p className="text-[15px] text-white font-[500] opacity-70">Keyboard</p>
            <div className="flex-1 max-w-[180px] ml-[16px]">
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
