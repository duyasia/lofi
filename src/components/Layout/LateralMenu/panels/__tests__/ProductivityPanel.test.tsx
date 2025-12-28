import React from "react";
import { render, screen, fireEvent } from "../../../../../test-utils";
import ProductivityPanel from "../ProductivityPanel";

describe("ProductivityPanel", () => {
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
      expect(screen.getByText("Focus Time")).toBeInTheDocument();
    });

    it("renders sessions counter", () => {
      render(<ProductivityPanel isOpen={true} />);
      expect(screen.getByText("Sessions: 0")).toBeInTheDocument();
    });

    it("renders 'Notes & History coming soon' placeholder", () => {
      render(<ProductivityPanel isOpen={true} />);
      expect(screen.getByText("Notes & History coming soon")).toBeInTheDocument();
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
      expect(screen.getByText("Sessions: 1")).toBeInTheDocument();
    });

    it("returns to Focus Time after skipping break", () => {
      render(<ProductivityPanel isOpen={true} />);
      // Skip work to break
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
      fireEvent.click(screen.getByRole("button", { name: /skip to next/i }));

      // Skip break to work
      fireEvent.click(screen.getByRole("button", { name: /start timer/i }));
      fireEvent.click(screen.getByRole("button", { name: /skip to next/i }));

      expect(screen.getByText("Focus Time")).toBeInTheDocument();
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
      expect(screen.getByText("Sessions: 4")).toBeInTheDocument();
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
});
