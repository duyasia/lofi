import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import type {
  PomodoroContextType,
  PomodoroSettings,
  TimerMode,
  TimerStatus,
  Task,
  SessionRecord,
} from "types/index";

// Storage keys
const STORAGE_KEYS = {
  settings: "lofi-pomodoro-settings",
  tasks: "lofi-pomodoro-tasks",
  notes: "lofi-pomodoro-notes",
  history: "lofi-pomodoro-history",
  sessionsCompleted: "lofi-pomodoro-sessions",
} as const;

// Default settings
const DEFAULT_SETTINGS: PomodoroSettings = {
  durations: {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  },
  autoStartBreaks: false,
  autoStartWork: false,
};

/** Load data from localStorage with fallback */
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

/** Save data to localStorage */
function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Silent fail if storage is full or unavailable
  }
}

/** Generate unique ID */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/** Get start of day timestamp */
function getStartOfDay(date: Date = new Date()): number {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start.getTime();
}

/** Play a notification sound using Web Audio API */
const playNotificationSound = (): void => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.value = 0.3;

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch {
    try {
      const audio = new Audio("./assets/audio/notification.mp3");
      audio.play?.()?.catch?.(() => {});
    } catch {
      // Silent fail in test environment
    }
  }
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  // Timer state
  const [mode, setMode] = useState<TimerMode>("work");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [sessionsCompleted, setSessionsCompleted] = useState(() =>
    loadFromStorage(STORAGE_KEYS.sessionsCompleted, 0)
  );
  const endTimeRef = useRef<number | null>(null);

  // Settings state
  const [settings, setSettings] = useState<PomodoroSettings>(() =>
    loadFromStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS)
  );

  // Time left - initialize from settings
  const [timeLeft, setTimeLeft] = useState(settings.durations.work);

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>(() =>
    loadFromStorage(STORAGE_KEYS.tasks, [])
  );

  // Notes state
  const [notes, setNotes] = useState<string>(() =>
    loadFromStorage(STORAGE_KEYS.notes, "")
  );

  // Session history state
  const [sessionHistory, setSessionHistory] = useState<SessionRecord[]>(() => {
    const history = loadFromStorage<SessionRecord[]>(STORAGE_KEYS.history, []);
    // Clean up old records (keep last 30 days)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return history.filter((r) => r.completedAt > thirtyDaysAgo);
  });

  // Persist settings
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.settings, settings);
  }, [settings]);

  // Persist tasks
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.tasks, tasks);
  }, [tasks]);

  // Persist notes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.notes, notes);
  }, [notes]);

  // Persist history
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.history, sessionHistory);
  }, [sessionHistory]);

  // Persist sessions completed
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.sessionsCompleted, sessionsCompleted);
  }, [sessionsCompleted]);

  // Record a completed session
  const recordSession = useCallback(
    (completedMode: TimerMode, duration: number) => {
      const record: SessionRecord = {
        id: generateId(),
        mode: completedMode,
        duration,
        completedAt: Date.now(),
      };
      setSessionHistory((prev) => [...prev, record]);
    },
    []
  );

  // Handle timer completion
  const handleComplete = useCallback(() => {
    setStatus("idle");
    endTimeRef.current = null;

    playNotificationSound();

    // Record the completed session
    recordSession(mode, settings.durations[mode]);

    if (mode === "work") {
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);

      if (newSessions % 4 === 0) {
        setMode("longBreak");
        setTimeLeft(settings.durations.longBreak);
      } else {
        setMode("shortBreak");
        setTimeLeft(settings.durations.shortBreak);
      }
    } else {
      setMode("work");
      setTimeLeft(settings.durations.work);
    }
  }, [mode, sessionsCompleted, settings.durations, recordSession]);

  // Timer effect
  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(() => {
      if (endTimeRef.current) {
        const remaining = Math.max(
          0,
          Math.ceil((endTimeRef.current - Date.now()) / 1000)
        );
        setTimeLeft(remaining);

        if (remaining <= 0) {
          handleComplete();
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [status, handleComplete]);

  // Timer actions
  const start = useCallback(() => {
    setStatus("running");
    endTimeRef.current = Date.now() + timeLeft * 1000;
  }, [timeLeft]);

  const pause = useCallback(() => {
    setStatus("paused");
    endTimeRef.current = null;
  }, []);

  const resume = useCallback(() => {
    setStatus("running");
    endTimeRef.current = Date.now() + timeLeft * 1000;
  }, [timeLeft]);

  const reset = useCallback(() => {
    setStatus("idle");
    setTimeLeft(settings.durations[mode]);
    endTimeRef.current = null;
  }, [mode, settings.durations]);

  const skip = useCallback(() => {
    handleComplete();
  }, [handleComplete]);

  // Settings action
  const updateDuration = useCallback(
    (targetMode: TimerMode, minutes: number) => {
      const seconds = Math.max(60, Math.min(120 * 60, minutes * 60));
      setSettings((prev) => ({
        ...prev,
        durations: {
          ...prev.durations,
          [targetMode]: seconds,
        },
      }));
      // Update current timeLeft if changing current mode while idle
      if (targetMode === mode && status === "idle") {
        setTimeLeft(seconds);
      }
    },
    [mode, status]
  );

  // Task actions
  const addTask = useCallback((text: string) => {
    if (!text.trim()) return;
    const newTask: Task = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompletedTasks = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }, []);

  // Notes action
  const updateNotes = useCallback((text: string) => {
    setNotes(text);
  }, []);

  // Stats calculations
  const getTodayStats = useCallback(() => {
    const todayStart = getStartOfDay();
    const todayRecords = sessionHistory.filter(
      (r) => r.completedAt >= todayStart && r.mode === "work"
    );
    return {
      sessions: todayRecords.length,
      focusTime: todayRecords.reduce((sum, r) => sum + r.duration, 0),
    };
  }, [sessionHistory]);

  const getWeekStats = useCallback(() => {
    const stats: { date: string; focusTime: number }[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayStart = getStartOfDay(date);
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;

      const dayRecords = sessionHistory.filter(
        (r) =>
          r.completedAt >= dayStart &&
          r.completedAt < dayEnd &&
          r.mode === "work"
      );

      stats.push({
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        focusTime: dayRecords.reduce((sum, r) => sum + r.duration, 0),
      });
    }

    return stats;
  }, [sessionHistory]);

  const clearHistory = useCallback(() => {
    setSessionHistory([]);
  }, []);

  const value = useMemo(
    () => ({
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
      sessionHistory,
      getTodayStats,
      getWeekStats,
      clearHistory,
    }),
    [
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
      sessionHistory,
      getTodayStats,
      getWeekStats,
      clearHistory,
    ]
  );

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro(): PomodoroContextType {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("usePomodoro must be used within PomodoroProvider");
  }
  return context;
}
