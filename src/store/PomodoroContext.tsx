import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import type { PomodoroContextType, TimerMode, TimerStatus } from "types/index";

const DURATIONS: Record<TimerMode, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

/** Play a notification sound using Web Audio API */
const playNotificationSound = (): void => {
  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch {
    // Fallback: try mp3 file if Web Audio API fails
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
  const [mode, setMode] = useState<TimerMode>("work");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const endTimeRef = useRef<number | null>(null);

  // Handle timer completion
  const handleComplete = useCallback(() => {
    setStatus("idle");
    endTimeRef.current = null;

    // Play notification sound
    playNotificationSound();

    if (mode === "work") {
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);

      // Every 4 sessions, take long break
      if (newSessions % 4 === 0) {
        setMode("longBreak");
        setTimeLeft(DURATIONS.longBreak);
      } else {
        setMode("shortBreak");
        setTimeLeft(DURATIONS.shortBreak);
      }
    } else {
      // After break, back to work
      setMode("work");
      setTimeLeft(DURATIONS.work);
    }
  }, [mode, sessionsCompleted]);

  // Timer effect using Date.now() for accuracy when tab inactive
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
    setTimeLeft(DURATIONS[mode]);
    endTimeRef.current = null;
  }, [mode]);

  const skip = useCallback(() => {
    handleComplete();
  }, [handleComplete]);

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
    }),
    [mode, status, timeLeft, sessionsCompleted, start, pause, resume, reset, skip]
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
