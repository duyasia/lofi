import React, { useState } from "react";
import type { PanelProps, TimerMode } from "types/index";
import { usePomodoro } from "../../../../store";

type TabType = "timer" | "tasks" | "stats";

/** Format seconds to mm:ss display */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

/** Format seconds to hours and minutes */
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
};

const MODE_LABELS: Record<TimerMode, string> = {
  work: "Focus",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const PRESET_DURATIONS: Record<TimerMode, number[]> = {
  work: [25, 50, 90],
  shortBreak: [5, 10, 15],
  longBreak: [15, 20, 30],
};

/**
 * ProductivityPanel - Enhanced Pomodoro timer with tasks, notes, and stats
 */
const ProductivityPanel: React.FC<PanelProps> = ({ isOpen }) => {
  const [activeTab, setActiveTab] = useState<TabType>("timer");
  const [showSettings, setShowSettings] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

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
    settings,
    updateDuration,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    clearCompletedTasks,
    notes,
    updateNotes,
    getTodayStats,
    getWeekStats,
  } = usePomodoro();

  if (!isOpen) return null;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText("");
  };

  const todayStats = getTodayStats();
  const weekStats = getWeekStats();
  const maxFocusTime = Math.max(...weekStats.map((s) => s.focusTime), 1);

  return (
    <div className="absolute top-[18%] right-[90px] w-[300px] rounded-[20px] z-10 overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-sm border border-white/5">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-[16px] text-white">Productivity</h4>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
              showSettings ? "bg-white/20 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/10"
            }`}
            aria-label="Settings"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white/5 rounded-lg p-1 mb-4">
          {(["timer", "tasks", "stats"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-[11px] rounded-md transition-all capitalize ${
                activeTab === tab
                  ? "bg-white/15 text-white font-medium"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="text-[11px] text-white/60 mb-3 font-medium">
              Timer Durations (minutes)
            </div>
            {(Object.keys(MODE_LABELS) as TimerMode[]).map((timerMode) => (
              <div key={timerMode} className="mb-3 last:mb-0">
                <div className="text-[10px] text-white/40 mb-1.5 uppercase tracking-wide">
                  {MODE_LABELS[timerMode]}
                </div>
                <div className="flex gap-1.5">
                  {PRESET_DURATIONS[timerMode].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => updateDuration(timerMode, mins)}
                      className={`flex-1 py-1.5 text-[11px] rounded-md transition-all ${
                        settings.durations[timerMode] === mins * 60
                          ? "bg-white/25 text-white font-medium"
                          : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                      }`}
                    >
                      {mins}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Timer Tab */}
        {activeTab === "timer" && (
          <>
            {/* Mode indicator */}
            <div className="text-center mb-1">
              <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-[10px] text-white/60 uppercase tracking-wide">
                {MODE_LABELS[mode]}
              </span>
            </div>

            {/* Timer Display */}
            <div className="text-center mb-4">
              <div className="text-[52px] font-bold text-white font-mono tracking-tight leading-none">
                {formatTime(timeLeft)}
              </div>
              <div className="text-[11px] text-white/40 mt-1">
                {sessionsCompleted} sessions completed
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-2 mb-4">
              {status === "idle" && (
                <button
                  onClick={start}
                  className="bg-white/15 hover:bg-white/25 text-white px-6 py-2 text-[12px] rounded-lg transition-all font-medium"
                  aria-label="Start timer"
                >
                  Start
                </button>
              )}
              {status === "running" && (
                <button
                  onClick={pause}
                  className="bg-white/15 hover:bg-white/25 text-white px-6 py-2 text-[12px] rounded-lg transition-all font-medium"
                  aria-label="Pause timer"
                >
                  Pause
                </button>
              )}
              {status === "paused" && (
                <>
                  <button
                    onClick={resume}
                    className="bg-white/15 hover:bg-white/25 text-white px-5 py-2 text-[12px] rounded-lg transition-all font-medium"
                    aria-label="Resume timer"
                  >
                    Resume
                  </button>
                  <button
                    onClick={reset}
                    className="bg-white/5 hover:bg-white/15 text-white/70 px-5 py-2 text-[12px] rounded-lg transition-all"
                    aria-label="Reset timer"
                  >
                    Reset
                  </button>
                </>
              )}
              {status !== "idle" && (
                <button
                  onClick={skip}
                  className="bg-white/5 hover:bg-white/15 text-white/70 px-5 py-2 text-[12px] rounded-lg transition-all"
                  aria-label="Skip to next"
                >
                  Skip
                </button>
              )}
            </div>

            {/* Quick Notes */}
            <textarea
              value={notes}
              onChange={(e) => updateNotes(e.target.value)}
              placeholder="Quick notes..."
              className="w-full h-[56px] bg-white/5 text-white text-[11px] p-2.5 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-white/20 placeholder-white/30 border border-transparent"
            />
          </>
        )}

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div className="max-h-[280px] overflow-y-auto">
            <form onSubmit={handleAddTask} className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add a task..."
                className="flex-1 bg-white/5 text-white text-[11px] px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/20 placeholder-white/30 border border-transparent"
              />
              <button
                type="submit"
                disabled={!newTaskText.trim()}
                className="bg-white/15 hover:bg-white/25 disabled:opacity-30 disabled:hover:bg-white/15 text-white w-8 h-8 text-[14px] rounded-lg transition-all flex items-center justify-center"
              >
                +
              </button>
            </form>

            {tasks.length === 0 ? (
              <div className="text-center text-white/30 text-[11px] py-8">
                No tasks yet
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-2.5 bg-white/5 rounded-lg px-3 py-2.5 group hover:bg-white/[0.07] transition-colors"
                    >
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-[18px] h-[18px] rounded flex items-center justify-center flex-shrink-0 transition-all border ${
                          task.completed
                            ? "bg-white/30 border-white/30"
                            : "border-white/20 hover:border-white/40"
                        }`}
                        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                      >
                        {task.completed && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                      <span
                        className={`flex-1 text-[11px] leading-tight ${
                          task.completed
                            ? "text-white/35 line-through"
                            : "text-white/80"
                        }`}
                      >
                        {task.text}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-white/20 hover:text-white/60 text-[16px] opacity-0 group-hover:opacity-100 transition-all w-5 h-5 flex items-center justify-center"
                        aria-label="Delete task"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {tasks.some((t) => t.completed) && (
                  <button
                    onClick={clearCompletedTasks}
                    className="mt-3 text-[10px] text-white/30 hover:text-white/50 transition-colors"
                  >
                    Clear completed
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <div>
            {/* Today's Stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-[22px] font-bold text-white">
                  {todayStats.sessions}
                </div>
                <div className="text-[10px] text-white/40 mt-0.5">Sessions</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-[22px] font-bold text-white">
                  {formatDuration(todayStats.focusTime)}
                </div>
                <div className="text-[10px] text-white/40 mt-0.5">Focus Time</div>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="text-[10px] text-white/40 mb-2 uppercase tracking-wide">This Week</div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-end justify-between gap-1.5 h-[60px]">
                {weekStats.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full bg-white/20 rounded-sm transition-all"
                      style={{
                        height: `${Math.max(3, (day.focusTime / maxFocusTime) * 45)}px`,
                      }}
                    />
                    <div className="text-[8px] text-white/35">{day.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductivityPanel;
