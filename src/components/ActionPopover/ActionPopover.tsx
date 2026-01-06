import ReactAudioPlayer from "react-audio-player";
import Slider from "@mui/material/Slider";
import type { ActionPopoverProps } from "../../types";

/**
 * ActionPopover - Reusable popover with audio control
 * Used for rain, traffic, keyboard sound toggles
 */
const ActionPopover: React.FC<ActionPopoverProps> = ({
  label,
  audioSrc,
  isActive,
  volume,
  onToggle,
  onVolumeChange,
  position,
  zIndex = "z-auto",
}) => {
  const handleSliderChange = (e: Event, value: number | number[]) => {
    onVolumeChange(typeof value === 'number' ? value : value[0]);
  };

  return (
    <div
      className={`popover-action flex flex-col justify-start items-center absolute ${position} w-[220px] h-auto cursor-pointer select-none ${zIndex} animate-in fade-in duration-300`}
    >
      {/* Toggle Circle - Enhanced with micro-interactions */}
      <div
        className={`border-white flex justify-center items-center w-[40px] h-[40px] border-[3px] rounded-full cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ${
          isActive 
            ? "bg-accent/20 border-accent shadow-glow" 
            : "hover:border-white/60"
        }`}
        onClick={onToggle}
      >
        <div
          className={`bg-white rounded-full transition-all duration-300 ${
            isActive 
              ? "w-[22px] h-[22px] opacity-100" 
              : "w-[18px] h-[18px] opacity-0"
          }`}
        ></div>
      </div>

      {/* Label and Controls - Glassmorphism 2026 */}
      <div className="title flex flex-col items-center justify-center min-w-[140px] min-h-[1px] p-[12px] mt-[12px] glass rounded-[16px] transition-all duration-300 hover:bg-white/10">
        <h6
          className={`mx-[16px] text-[16px] font-[600] leading-[20px] text-white transition-all duration-300 cursor-pointer ${
            isActive ? "text-accent" : "hover:opacity-80"
          }`}
          onClick={onToggle}
        >
          {label}
        </h6>

        {/* Audio Player and Slider (only when active) - Enhanced spacing */}
        {isActive && audioSrc && (
          <div className="px-[16px] mt-[12px] w-full">
            <ReactAudioPlayer
              preload="auto"
              autoPlay
              src={audioSrc}
              loop
              volume={volume / 100}
            />
            <Slider
              style={{ padding: 0 }}
              className="volume-slider"
              value={volume}
              onChange={handleSliderChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionPopover;
