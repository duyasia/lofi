import React from "react";
import { render, screen, fireEvent } from "../../../../../test-utils";
import ProductivityPanel from "../ProductivityPanel";

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

describe("ProductivityPanel", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe("Basic Rendering", () => {
    it("returns null when isOpen=false", () => {
      const { container } = render(<ProductivityPanel isOpen={false} />);
      expect(container.firstChild).toBeNull();
    });

    it("renders 'Productivity' header when open", () => {
      render(<ProductivityPanel isOpen={true} />);
      expect(screen.getByText("Productivity")).toBeInTheDocument();
    });

    it("renders timer display with initial time (25:00)", () => {
      render(<ProductivityPanel isOpen={true} />);
      expect(screen.getByText("25:00")).toBeInTheDocument();
    });

    it("renders 'Focus Time' mode label initially", () => {
      render(<ProductivityPanel isOpen={true} />);
      expect(screen.getByText("Focus")).toBeInTheDocument();
    });

    it("renders sessions counter", () => {
      render(<ProductivityPanel isOpen={true} />);
      expect(screen.getByText(/sessions completed/)).toBeInTheDocument();
    });

    it("renders tab navigation with timer, tasks, stats", () => {
      render(<ProductivityPanel isOpen={true} />);
      expect(screen.getByText("timer")).toBeInTheDocument();
      expect(screen.getByText("tasks")).toBeInTheDocument();
      expect(screen.getByText("stats")).toBeInTheDocument();
    });

    it("renders settings button", () => {
      render(<ProductivityPanel isOpen={true} />);
      expect(screen.getByRole("button", { name: /settings/i })).toBeInTheDocument();
    });

    it("renders quick notes textarea", () => {
      render(<ProductivityPanel isOpen={true} />);
      expect(screen.getByPlaceholderText("Quick notes...")).toBeInTheDocument();
    });
  });

  describe("Timer Controls", () => {
    it("shows Start button in idle state", () => {
      render(<ProductivityPanel isOpen={true} />);
      expect(screen.getByRole("button", { name: /start timer/i })).toBeInTheDocument();
    });

    it("shows Pause button after clicking Start", () => {
      render(<ProductivityPanel isOpen={true} />);
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
      expect(screen.getByRole("button", { name: /pause timer/i })).toBeInTheDocument();
    });

    it("shows Skip button when running", () => {
      render(<ProductivityPanel isOpen={true} />);
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
      expect(screen.getByRole("button", { name: /skip to next/i })).toBeInTheDocument();
    });

    it("shows Resume and Reset buttons when paused", () => {
      render(<ProductivityPanel isOpen={true} />);
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
      fireEvent.click(screen.getByRole("button", { name: /pause timer/i }));
      expect(screen.getByRole("button", { name: /resume timer/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /reset timer/i })).toBeInTheDocument();
    });
  });

  describe("Mode Transitions", () => {
    it("shows Short Break after skipping work session", () => {
      render(<ProductivityPanel isOpen={true} />);
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
      fireEvent.click(screen.getByRole("button", { name: /skip to next/i }));

      expect(screen.getByText("Short Break")).toBeInTheDocument();
      expect(screen.getByText("05:00")).toBeInTheDocument();
    });

    it("returns to Focus after skipping break", () => {
      render(<ProductivityPanel isOpen={true} />);
      // Skip work to break
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
      fireEvent.click(screen.getByRole("button", { name: /skip to next/i }));

      // Skip break to work
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
      fireEvent.click(screen.getByRole("button", { name: /skip to next/i }));

      expect(screen.getByText("Focus")).toBeInTheDocument();
      expect(screen.getByText("25:00")).toBeInTheDocument();
    });

    it("shows Long Break after 4 work sessions", () => {
      render(<ProductivityPanel isOpen={true} />);

      // Complete 4 work sessions (work->break->work->break->work->break->work->longBreak)
      for (let i = 0; i < 4; i++) {
        fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
        fireEvent.click(screen.getByRole("button", { name: /skip to next/i }));
        if (i < 3) {
          fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
          fireEvent.click(screen.getByRole("button", { name: /skip to next/i }));
        }
      }

      expect(screen.getByText("Long Break")).toBeInTheDocument();
      expect(screen.getByText("15:00")).toBeInTheDocument();
    });
  });

  describe("Reset Functionality", () => {
    it("reset returns to idle state with full time", () => {
      render(<ProductivityPanel isOpen={true} />);
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
      fireEvent.click(screen.getByRole("button", { name: /pause timer/i }));
      fireEvent.click(screen.getByRole("button", { name: /reset timer/i }));

      expect(screen.getByRole("button", { name: /start timer/i })).toBeInTheDocument();
      expect(screen.getByText("25:00")).toBeInTheDocument();
    });
  });

  describe("Tab Navigation", () => {
    it("switches to tasks tab when clicked", () => {
      render(<ProductivityPanel isOpen={true} />);
      fireEvent.click(screen.getByText("tasks"));
      expect(screen.getByPlaceholderText("Add a task...")).toBeInTheDocument();
    });

    it("switches to stats tab when clicked", () => {
      render(<ProductivityPanel isOpen={true} />);
      fireEvent.click(screen.getByText("stats"));
      expect(screen.getByText("Sessions")).toBeInTheDocument();
      expect(screen.getByText("Focus Time")).toBeInTheDocument();
      expect(screen.getByText("This Week")).toBeInTheDocument();
    });
  });

  describe("Tasks Management", () => {
    it("adds a new task", () => {
      render(<ProductivityPanel isOpen={true} />);
      fireEvent.click(screen.getByText("tasks"));

      const input = screen.getByPlaceholderText("Add a task...");
      fireEvent.change(input, { target: { value: "Test task" } });
      fireEvent.submit(input.closest("form")!);

      expect(screen.getByText("Test task")).toBeInTheDocument();
    });

    it("shows 'No tasks yet' when empty", () => {
      render(<ProductivityPanel isOpen={true} />);
      fireEvent.click(screen.getByText("tasks"));
      expect(screen.getByText("No tasks yet")).toBeInTheDocument();
    });
  });

  describe("Settings Panel", () => {
    it("toggles settings panel visibility", () => {
      render(<ProductivityPanel isOpen={true} />);
      const settingsBtn = screen.getByRole("button", { name: /settings/i });

      fireEvent.click(settingsBtn);
      expect(screen.getByText("Timer Durations (minutes)")).toBeInTheDocument();

      fireEvent.click(settingsBtn);
      expect(screen.queryByText("Timer Durations (minutes)")).not.toBeInTheDocument();
    });

    it("shows preset duration buttons for each mode", () => {
      render(<ProductivityPanel isOpen={true} />);
      fireEvent.click(screen.getByRole("button", { name: /settings/i }));

      // Focus Time presets: 25, 50, 90
      expect(screen.getByText("25")).toBeInTheDocument();
      expect(screen.getByText("50")).toBeInTheDocument();
      expect(screen.getByText("90")).toBeInTheDocument();
    });
  });
});
