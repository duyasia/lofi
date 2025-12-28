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
      className={`popover-action flex flex-col justify-start items-center absolute ${position} w-[200px] h-auto cursor-pointer select-none ${zIndex}`}
    >
      {/* Toggle Circle */}
      <div
        className="border-white circle-hover flex justify-center items-center w-[32px] h-[32px] border-[3px] rounded-full cursor-pointer transition-all duration-[20] ease-in"
        onClick={onToggle}
      >
        <div className="opacity-0 bg-white w-[18px] h-[18px] rounded-full transition-all duration-[20] ease-in"></div>
      </div>

      {/* Label and Controls */}
      <div className="title flex flex-col items-center justify-center min-w-[120px] min-h-[1px] p-[8px] mt-[8px] bg-[#00000080] rounded-[8px] transition-all ease-in-out duration-[20]">
        <h6
          className="mx-[16px] text-[16px] font-[500] leading-[16px] text-white hover:opacity-60"
          onClick={onToggle}
        >
          {label}
        </h6>

        {/* Audio Player and Slider (only when active) */}
        {isActive && audioSrc && (
          <div className="px-[16px] mt-[5px]">
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
