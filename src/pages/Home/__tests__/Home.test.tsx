import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../Home";
import { useAudio, useUI } from "../../../store";

// Mock store hooks
jest.mock("../../../store", () => ({
  useAudio: jest.fn(),
  useUI: jest.fn(),
}));

// Mock VideoBackground
jest.mock("../../../components/VideoBackground/VideoBackground", () => ({
  __esModule: true,
  default: ({ videos, className }: { videos: object; className: string }) => (
    <div data-testid="video-background" className={className}>
      VideoBackground Mock
    </div>
  ),
}));

// Mock ActionPopover
jest.mock("../../../components/ActionPopover/ActionPopover", () => ({
  __esModule: true,
  default: ({
    label,
    isActive,
    volume,
    onToggle,
    onVolumeChange,
  }: {
    label: string;
    isActive: boolean;
    volume: number;
    onToggle: () => void;
    onVolumeChange: (v: number) => void;
  }) => (
    <div data-testid={`action-popover-${label.toLowerCase().replace(" ", "-")}`}>
      <span>{label}</span>
      <button onClick={onToggle} data-testid={`toggle-${label.toLowerCase().replace(" ", "-")}`}>
        Toggle
      </button>
      {isActive && (
        <input
          type="range"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          data-testid={`volume-${label.toLowerCase().replace(" ", "-")}`}
        />
      )}
    </div>
  ),
}));

const mockUseAudio = useAudio as jest.MockedFunction<typeof useAudio>;
const mockUseUI = useUI as jest.MockedFunction<typeof useUI>;

describe("Home", () => {
  const mockSetEnter = jest.fn();
  const mockToggleRain = jest.fn();
  const mockChangeRainVolume = jest.fn();
  const mockToggleTraffic = jest.fn();
  const mockChangeTrafficVolume = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUI.mockReturnValue({
      enter: false,
      setEnter: mockSetEnter,
    });
    mockUseAudio.mockReturnValue({
      rain: false,
      cityRain: 0,
      toggleRain: mockToggleRain,
      changeRainVolume: mockChangeRainVolume,
      traffic: false,
      cityTraffic: 0,
      toggleTraffic: mockToggleTraffic,
      changeTrafficVolume: mockChangeTrafficVolume,
    } as ReturnType<typeof useAudio>);
  });

  it("renders VideoBackground component", () => {
    render(<Home />);
    expect(screen.getByTestId("video-background")).toBeInTheDocument();
  });

  it("renders City Rain ActionPopover", () => {
    render(<Home />);
    expect(screen.getByTestId("action-popover-city-rain")).toBeInTheDocument();
    expect(screen.getByText("City Rain")).toBeInTheDocument();
  });

  it("renders City Traffic ActionPopover", () => {
    render(<Home />);
    expect(screen.getByTestId("action-popover-city-traffic")).toBeInTheDocument();
    expect(screen.getByText("City Traffic")).toBeInTheDocument();
  });

  it("renders Enter ActionPopover", () => {
    render(<Home />);
    expect(screen.getByTestId("action-popover-enter")).toBeInTheDocument();
    expect(screen.getByText("Enter")).toBeInTheDocument();
  });

  it("clicking City Rain toggles rain state", () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId("toggle-city-rain"));
    expect(mockToggleRain).toHaveBeenCalledTimes(1);
  });

  it("clicking City Traffic toggles traffic state", () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId("toggle-city-traffic"));
    expect(mockToggleTraffic).toHaveBeenCalledTimes(1);
  });

  it("clicking Enter toggles enter state", () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId("toggle-enter"));
    expect(mockSetEnter).toHaveBeenCalledTimes(1);
  });

  it("volume change calls changeRainVolume", () => {
    mockUseAudio.mockReturnValue({
      rain: true,
      cityRain: 50,
      toggleRain: mockToggleRain,
      changeRainVolume: mockChangeRainVolume,
      traffic: false,
      cityTraffic: 0,
      toggleTraffic: mockToggleTraffic,
      changeTrafficVolume: mockChangeTrafficVolume,
    } as ReturnType<typeof useAudio>);

    render(<Home />);
    const volumeSlider = screen.getByTestId("volume-city-rain");
    fireEvent.change(volumeSlider, { target: { value: "75" } });
    expect(mockChangeRainVolume).toHaveBeenCalledWith(75);
  });
});
