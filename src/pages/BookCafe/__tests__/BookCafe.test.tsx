import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookCafe from "../BookCafe";
import { useAudio, useUI, useVideo } from "../../../store";
import { DEFAULT_VIDEOS } from "../../../data/dataScenes";

// Mock store hooks
jest.mock("../../../store", () => ({
  useAudio: jest.fn(),
  useUI: jest.fn(),
  useVideo: jest.fn(),
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
const mockUseVideo = useVideo as jest.MockedFunction<typeof useVideo>;

describe("BookCafe", () => {
  const mockSetEnter = jest.fn();
  const mockToggleRain = jest.fn();
  const mockChangeRainVolume = jest.fn();
  const mockToggleKeyboard = jest.fn();
  const mockChangeKeyboardVolume = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUI.mockReturnValue({
      enter: false,
      setEnter: mockSetEnter,
    });
    mockUseVideo.mockReturnValue({
      toggled: true,
      fullscreen: false,
      setToggled: jest.fn(),
      setFullscreen: jest.fn(),
      currentScene: "exterior",
      currentVideos: DEFAULT_VIDEOS,
      changeScene: jest.fn(),
    });
    mockUseAudio.mockReturnValue({
      rain: false,
      cityRain: 0,
      toggleRain: mockToggleRain,
      changeRainVolume: mockChangeRainVolume,
      keyboard: false,
      soundKey: 0,
      toggleKeyboard: mockToggleKeyboard,
      changeKeyboardVolume: mockChangeKeyboardVolume,
    } as ReturnType<typeof useAudio>);
  });

  it("renders VideoBackground component", () => {
    render(<BookCafe />);
    expect(screen.getByTestId("video-background")).toBeInTheDocument();
  });

  it("renders City Rain ActionPopover", () => {
    render(<BookCafe />);
    expect(screen.getByTestId("action-popover-city-rain")).toBeInTheDocument();
    expect(screen.getByText("City Rain")).toBeInTheDocument();
  });

  it("renders Keyboard ActionPopover", () => {
    render(<BookCafe />);
    expect(screen.getByTestId("action-popover-keyboard")).toBeInTheDocument();
    expect(screen.getByText("Keyboard")).toBeInTheDocument();
  });

  it("renders Go out ActionPopover", () => {
    render(<BookCafe />);
    expect(screen.getByTestId("action-popover-go-out")).toBeInTheDocument();
    expect(screen.getByText("Go out")).toBeInTheDocument();
  });

  it("clicking City Rain toggles rain state", () => {
    render(<BookCafe />);
    fireEvent.click(screen.getByTestId("toggle-city-rain"));
    expect(mockToggleRain).toHaveBeenCalledTimes(1);
  });

  it("clicking Keyboard toggles keyboard state", () => {
    render(<BookCafe />);
    fireEvent.click(screen.getByTestId("toggle-keyboard"));
    expect(mockToggleKeyboard).toHaveBeenCalledTimes(1);
  });

  it("clicking Go out toggles enter state", () => {
    render(<BookCafe />);
    fireEvent.click(screen.getByTestId("toggle-go-out"));
    expect(mockSetEnter).toHaveBeenCalledTimes(1);

    // Verify the functional update logic
    const setEnterArg = mockSetEnter.mock.calls[0][0];
    expect(typeof setEnterArg).toBe("function");
    expect(setEnterArg(true)).toBe(false);
    expect(setEnterArg(false)).toBe(true);
  });

  it("volume change calls changeKeyboardVolume", () => {
    mockUseAudio.mockReturnValue({
      rain: false,
      cityRain: 0,
      toggleRain: mockToggleRain,
      changeRainVolume: mockChangeRainVolume,
      keyboard: true,
      soundKey: 50,
      toggleKeyboard: mockToggleKeyboard,
      changeKeyboardVolume: mockChangeKeyboardVolume,
    } as ReturnType<typeof useAudio>);

    render(<BookCafe />);
    const volumeSlider = screen.getByTestId("volume-keyboard");
    fireEvent.change(volumeSlider, { target: { value: "80" } });
    expect(mockChangeKeyboardVolume).toHaveBeenCalledWith(80);
  });
});
