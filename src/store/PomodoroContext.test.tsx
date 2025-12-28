import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { PomodoroProvider, usePomodoro } from "./PomodoroContext";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Test component to access context
function TestComponent() {
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
    notes,
    updateNotes,
    getTodayStats,
  } = usePomodoro();

  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <span data-testid="status">{status}</span>
      <span data-testid="timeLeft">{timeLeft}</span>
      <span data-testid="sessions">{sessionsCompleted}</span>
      <span data-testid="workDuration">{settings.durations.work}</span>
      <span data-testid="taskCount">{tasks.length}</span>
      <span data-testid="notes">{notes}</span>
      <span data-testid="todaySessions">{getTodayStats().sessions}</span>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={reset}>Reset</button>
      <button onClick={skip}>Skip</button>
      <button onClick={() => updateDuration("work", 50)}>Set50min</button>
      <button onClick={() => addTask("Test task")}>AddTask</button>
      <button onClick={() => tasks[0] && toggleTask(tasks[0].id)}>ToggleTask</button>
      <button onClick={() => tasks[0] && deleteTask(tasks[0].id)}>DeleteTask</button>
      <button onClick={() => updateNotes("My notes")}>SetNotes</button>
    </div>
  );
}

const renderWithProvider = () => {
  return render(
    <PomodoroProvider>
      <TestComponent />
    </PomodoroProvider>
  );
};

// Mock Web Audio API
beforeAll(() => {
  global.AudioContext = jest.fn().mockImplementation(() => ({
    createOscillator: () => ({
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      frequency: { value: 0 },
      type: "sine",
    }),
    createGain: () => ({
      connect: jest.fn(),
      gain: {
        value: 0,
        exponentialRampToValueAtTime: jest.fn(),
      },
    }),
    destination: {},
    currentTime: 0,
  }));
});

describe("PomodoroContext", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorageMock.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Initial State", () => {
    it("starts with work mode", () => {
      renderWithProvider();
      expect(screen.getByTestId("mode")).toHaveTextContent("work");
    });

    it("starts with idle status", () => {
      renderWithProvider();
      expect(screen.getByTestId("status")).toHaveTextContent("idle");
    });

    it("starts with 25 minutes (1500 seconds)", () => {
      renderWithProvider();
      expect(screen.getByTestId("timeLeft")).toHaveTextContent("1500");
    });

    it("starts with 0 sessions completed", () => {
      renderWithProvider();
      expect(screen.getByTestId("sessions")).toHaveTextContent("0");
    });
  });

  describe("Timer Controls", () => {
    it("start changes status to running", () => {
      renderWithProvider();
      fireEvent.click(screen.getByText("Start"));
      expect(screen.getByTestId("status")).toHaveTextContent("running");
    });

    it("pause changes status to paused", () => {
      renderWithProvider();
      fireEvent.click(screen.getByText("Start"));
      fireEvent.click(screen.getByText("Pause"));
      expect(screen.getByTestId("status")).toHaveTextContent("paused");
    });

    it("resume changes status back to running", () => {
      renderWithProvider();
      fireEvent.click(screen.getByText("Start"));
      fireEvent.click(screen.getByText("Pause"));
      fireEvent.click(screen.getByText("Resume"));
      expect(screen.getByTestId("status")).toHaveTextContent("running");
    });

    it("reset sets status to idle and restores duration", () => {
      renderWithProvider();
      fireEvent.click(screen.getByText("Start"));

      // Let some time pass
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      fireEvent.click(screen.getByText("Pause"));
      fireEvent.click(screen.getByText("Reset"));

      expect(screen.getByTestId("status")).toHaveTextContent("idle");
      expect(screen.getByTestId("timeLeft")).toHaveTextContent("1500");
    });
  });

  describe("Skip Functionality", () => {
    it("skip from work mode goes to short break", () => {
      renderWithProvider();
      fireEvent.click(screen.getByText("Start"));
      fireEvent.click(screen.getByText("Skip"));

      expect(screen.getByTestId("mode")).toHaveTextContent("shortBreak");
      expect(screen.getByTestId("timeLeft")).toHaveTextContent("300"); // 5 min
    });

    it("skip from short break goes back to work", () => {
      renderWithProvider();
      // Skip to short break
      fireEvent.click(screen.getByText("Start"));
      fireEvent.click(screen.getByText("Skip"));

      // Skip from short break
      fireEvent.click(screen.getByText("Start"));
      fireEvent.click(screen.getByText("Skip"));

      expect(screen.getByTestId("mode")).toHaveTextContent("work");
      expect(screen.getByTestId("timeLeft")).toHaveTextContent("1500");
    });

    it("after 4 work sessions, goes to long break", () => {
      renderWithProvider();

      // Complete 4 work sessions
      for (let i = 0; i < 4; i++) {
        fireEvent.click(screen.getByText("Start"));
        fireEvent.click(screen.getByText("Skip")); // Skip work -> break

        if (i < 3) {
          fireEvent.click(screen.getByText("Start"));
          fireEvent.click(screen.getByText("Skip")); // Skip break -> work
        }
      }

      // After 4th work session, should be long break
      expect(screen.getByTestId("mode")).toHaveTextContent("longBreak");
      expect(screen.getByTestId("timeLeft")).toHaveTextContent("900"); // 15 min
    });
  });

  describe("Timer Countdown", () => {
    it("timer decrements when running", async () => {
      // Use real timers for this test
      jest.useRealTimers();

      renderWithProvider();
      const initialTime = parseInt(screen.getByTestId("timeLeft").textContent || "0");

      fireEvent.click(screen.getByText("Start"));

      // Wait for timer to tick
      await waitFor(
        () => {
          const currentTime = parseInt(screen.getByTestId("timeLeft").textContent || "0");
          expect(currentTime).toBeLessThan(initialTime);
        },
        { timeout: 2000 }
      );
    });
  });

  describe("Custom Durations", () => {
    it("updates work duration", () => {
      renderWithProvider();
      fireEvent.click(screen.getByText("Set50min"));
      expect(screen.getByTestId("workDuration")).toHaveTextContent("3000"); // 50*60
    });

    it("updates timeLeft when changing current mode duration while idle", () => {
      renderWithProvider();
      fireEvent.click(screen.getByText("Set50min"));
      expect(screen.getByTestId("timeLeft")).toHaveTextContent("3000");
    });
  });

  describe("Task Management", () => {
    it("adds a task", () => {
      renderWithProvider();
      expect(screen.getByTestId("taskCount")).toHaveTextContent("0");
      fireEvent.click(screen.getByText("AddTask"));
      expect(screen.getByTestId("taskCount")).toHaveTextContent("1");
    });

    it("deletes a task", () => {
      renderWithProvider();
      fireEvent.click(screen.getByText("AddTask"));
      expect(screen.getByTestId("taskCount")).toHaveTextContent("1");
      fireEvent.click(screen.getByText("DeleteTask"));
      expect(screen.getByTestId("taskCount")).toHaveTextContent("0");
    });
  });

  describe("Notes", () => {
    it("updates notes", () => {
      renderWithProvider();
      fireEvent.click(screen.getByText("SetNotes"));
      expect(screen.getByTestId("notes")).toHaveTextContent("My notes");
    });
  });

  describe("Error Handling", () => {
    it("throws error when usePomodoro used outside provider", () => {
      const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow("usePomodoro must be used within PomodoroProvider");

      consoleError.mockRestore();
    });
  });
});
