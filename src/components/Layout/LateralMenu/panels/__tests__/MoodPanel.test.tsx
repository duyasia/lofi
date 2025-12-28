import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MoodPanel from "../MoodPanel";
import type { MoodPanelProps } from "types/index";

// Mock react-audio-player
jest.mock("react-audio-player", () => ({
  __esModule: true,
  default: () => null,
}));

// Mock MUI Slider
jest.mock("@mui/material/Slider", () => ({
  __esModule: true,
  default: ({ value, onChange, className }: { value: number; onChange?: (e: Event, val: number) => void; className?: string }) => (
    <input
      type="range"
      data-testid={`slider-${className || "default"}`}
      value={value}
      onChange={(e) => onChange?.(e.nativeEvent, Number(e.target.value))}
    />
  ),
}));

const createMockProps = (overrides?: Partial<MoodPanelProps>): MoodPanelProps => ({
  isOpen: true,
  clickSleep: false,
  clickJazzy: false,
  clickChill: true,
  volumeSong: 50,
  volumeTraffic: 0,
  volumeRain: 0,
  volumeKeyboard: 0,
  onClickSleep: jest.fn(),
  onClickJazzy: jest.fn(),
  onClickChill: jest.fn(),
  onChangeVolumeSong: jest.fn(),
  onChangeTraffic: jest.fn(),
  onChangeRain: jest.fn(),
  onChangeKeyboard: jest.fn(),
  ...overrides,
});

describe("MoodPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null when isOpen=false", () => {
    const props = createMockProps({ isOpen: false });
    const { container } = render(<MoodPanel {...props} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders 'Mood' header when open", () => {
    const props = createMockProps();
    render(<MoodPanel {...props} />);
    expect(screen.getByText("Mood")).toBeInTheDocument();
  });

  it("renders 3 mood options (Sleepy, Jazzy, Chill)", () => {
    const props = createMockProps();
    render(<MoodPanel {...props} />);
    expect(screen.getByText("Sleepy")).toBeInTheDocument();
    expect(screen.getByText("Jazzy")).toBeInTheDocument();
    expect(screen.getByText("Chill")).toBeInTheDocument();
  });

  it("renders volume slider", () => {
    const props = createMockProps();
    render(<MoodPanel {...props} />);
    expect(screen.getByTestId("slider-volume-slider")).toBeInTheDocument();
  });

  it("renders background noise controls", () => {
    const props = createMockProps();
    render(<MoodPanel {...props} />);
    expect(screen.getByText("Background noises")).toBeInTheDocument();
    expect(screen.getByText("City traffic")).toBeInTheDocument();
    expect(screen.getByText("City rain")).toBeInTheDocument();
    expect(screen.getByText("Keyboard")).toBeInTheDocument();
  });

  it("calls onClickSleep when Sleepy clicked", () => {
    const props = createMockProps();
    render(<MoodPanel {...props} />);
    fireEvent.click(screen.getByText("Sleepy"));
    expect(props.onClickSleep).toHaveBeenCalledTimes(1);
  });

  it("calls onClickJazzy when Jazzy clicked", () => {
    const props = createMockProps();
    render(<MoodPanel {...props} />);
    fireEvent.click(screen.getByText("Jazzy"));
    expect(props.onClickJazzy).toHaveBeenCalledTimes(1);
  });

  it("calls onClickChill when Chill clicked", () => {
    const props = createMockProps();
    render(<MoodPanel {...props} />);
    fireEvent.click(screen.getByText("Chill"));
    expect(props.onClickChill).toHaveBeenCalledTimes(1);
  });

  it("renders correct classes based on active/inactive states", () => {
    const { rerender } = render(<MoodPanel {...createMockProps({ clickSleep: true, clickJazzy: false, clickChill: false })} />);
    expect(screen.getByText("Sleepy")).toHaveClass("opacity-100");
    expect(screen.getByText("Jazzy")).toHaveClass("opacity-30");
    expect(screen.getByText("Chill")).toHaveClass("opacity-30");

    rerender(<MoodPanel {...createMockProps({ clickSleep: false, clickJazzy: true, clickChill: false })} />);
    expect(screen.getByText("Sleepy")).toHaveClass("opacity-30");
    expect(screen.getByText("Jazzy")).toHaveClass("opacity-100");
    expect(screen.getByText("Chill")).toHaveClass("opacity-30");

    rerender(<MoodPanel {...createMockProps({ clickSleep: false, clickJazzy: false, clickChill: true })} />);
    expect(screen.getByText("Sleepy")).toHaveClass("opacity-30");
    expect(screen.getByText("Jazzy")).toHaveClass("opacity-30");
    expect(screen.getByText("Chill")).toHaveClass("opacity-100");
  });

  it("calls volume change handlers", () => {
    const props = createMockProps();
    render(<MoodPanel {...props} />);

    fireEvent.change(screen.getByTestId("slider-volume-slider"), { target: { value: "80" } });
    expect(props.onChangeVolumeSong).toHaveBeenCalled();

    fireEvent.change(screen.getByTestId("slider-volume-noise--traffic opacity-100"), { target: { value: "40" } });
    expect(props.onChangeTraffic).toHaveBeenCalled();

    fireEvent.change(screen.getByTestId("slider-volume-noise--rain"), { target: { value: "30" } });
    expect(props.onChangeRain).toHaveBeenCalled();

    fireEvent.change(screen.getByTestId("slider-volume-noise--keyboard"), { target: { value: "20" } });
    expect(props.onChangeKeyboard).toHaveBeenCalled();
  });
});
