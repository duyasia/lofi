import React from "react";
import type { PanelProps, TimerMode } from "types/index";
import { usePomodoro } from "../../../../store";

/** Format seconds to mm:ss display */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const MODE_LABELS: Record<TimerMode, string> = {
  work: "Focus Time",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

/**
 * ProductivityPanel - Pomodoro timer with controls
 */
const ProductivityPanel: React.FC<PanelProps> = ({ isOpen }) => {
  const {
    mode,
    status,
    timeLeft,
    sessionsCompleted,
    start,
    pause,
    resume,
    reset,
    skip,
  } = usePomodoro();

  if (!isOpen) return null;

  return (
    <div className="absolute top-[42%] right-[90px] w-[300px] rounded-[24px] z-10 overflow-hidden bg-[#070707]">
      <div className="mx-[16px] py-[10px]">
        <div className="h-[54px] flex items-center justify-between">
          <h4 className="font-[700] text-[20px] text-white leading-[24px]">
            Productivity
          </h4>
        </div>

        {/* Timer Display */}
        <div className="text-center my-4">
          <div className="text-[14px] text-white/70">{MODE_LABELS[mode]}</div>
          <div className="text-[48px] font-bold text-white font-mono">
            {formatTime(timeLeft)}
          </div>
          <div className="text-[12px] text-white/50">
            Sessions: {sessionsCompleted}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-4">
          {status === "idle" && (
            <button
              onClick={start}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-colors"
              aria-label="Start timer"
            >
              Start
            </button>
          )}
          {status === "running" && (
            <button
              onClick={pause}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-colors"
              aria-label="Pause timer"
            >
              Pause
            </button>
          )}
          {status === "paused" && (
            <>
              <button
                onClick={resume}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors"
                aria-label="Resume timer"
              >
                Resume
              </button>
              <button
                onClick={reset}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors"
                aria-label="Reset timer"
              >
                Reset
              </button>
            </>
          )}
          {status !== "idle" && (
            <button
              onClick={skip}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors"
              aria-label="Skip to next"
            >
              Skip
            </button>
          )}
        </div>

        {/* Notes and History - placeholder for future */}
        <div className="opacity-50 text-[14px] text-white text-center pb-2">
          Notes &amp; History coming soon
        </div>
      </div>
    </div>
  );
};

export default ProductivityPanel;
