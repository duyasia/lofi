import React from "react";
import { render, screen } from "@testing-library/react";
import VideoBackground from "../VideoBackground";
import { useVideo, useAudio } from "../../../store";

// Mock the store hooks
jest.mock("../../../store", () => ({
  useVideo: jest.fn(),
  useAudio: jest.fn(),
}));

const mockVideos = {
  day: "/test-day.mp4",
  rainyDay: "/test-rainy-day.mp4",
  night: "/test-night.mp4",
  rainyNight: "/test-rainy-night.mp4",
};

const mockUseVideo = useVideo as jest.MockedFunction<typeof useVideo>;
const mockUseAudio = useAudio as jest.MockedFunction<typeof useAudio>;

describe("VideoBackground", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock values
    mockUseVideo.mockReturnValue({
      toggled: true,
      fullscreen: false,
      setToggled: jest.fn(),
      setFullscreen: jest.fn(),
    });
    mockUseAudio.mockReturnValue({
      rain: false,
      traffic: false,
      keyboard: false,
      volumeRain: 0,
      volumeTraffic: 0,
      volumeKeyboard: 0,
      volumeSong: 50,
      cityRain: 0,
      cityTraffic: 0,
      soundKey: 0,
      song: [],
      setRain: jest.fn(),
      setTraffic: jest.fn(),
      setKeyboard: jest.fn(),
      setVolumeRain: jest.fn(),
      setVolumeTraffic: jest.fn(),
      setVolumeKeyboard: jest.fn(),
      setVolumeSong: jest.fn(),
      setCityRain: jest.fn(),
      setCityTraffic: jest.fn(),
      setSoundKey: jest.fn(),
      setSong: jest.fn(),
    });
  });

  it("renders video element", () => {
    const { container } = render(<VideoBackground videos={mockVideos} />);
    const video = container.querySelector("video");
    expect(video).toBeInTheDocument();
  });

  it("shows day video when toggled=true, rain=false", () => {
    mockUseVideo.mockReturnValue({ toggled: true, fullscreen: false, setToggled: jest.fn(), setFullscreen: jest.fn() });
    mockUseAudio.mockReturnValue({ rain: false } as ReturnType<typeof useAudio>);

    const { container } = render(<VideoBackground videos={mockVideos} />);
    const source = container.querySelector("source");
    expect(source?.getAttribute("src")).toBe("/test-day.mp4");
  });

  it("shows rainyDay video when toggled=true, rain=true", () => {
    mockUseVideo.mockReturnValue({ toggled: true, fullscreen: false, setToggled: jest.fn(), setFullscreen: jest.fn() });
    mockUseAudio.mockReturnValue({ rain: true } as ReturnType<typeof useAudio>);

    const { container } = render(<VideoBackground videos={mockVideos} />);
    const source = container.querySelector("source");
    expect(source?.getAttribute("src")).toBe("/test-rainy-day.mp4");
  });

  it("shows night video when toggled=false, rain=false", () => {
    mockUseVideo.mockReturnValue({ toggled: false, fullscreen: false, setToggled: jest.fn(), setFullscreen: jest.fn() });
    mockUseAudio.mockReturnValue({ rain: false } as ReturnType<typeof useAudio>);

    const { container } = render(<VideoBackground videos={mockVideos} />);
    const source = container.querySelector("source");
    expect(source?.getAttribute("src")).toBe("/test-night.mp4");
  });

  it("shows rainyNight video when toggled=false, rain=true", () => {
    mockUseVideo.mockReturnValue({ toggled: false, fullscreen: false, setToggled: jest.fn(), setFullscreen: jest.fn() });
    mockUseAudio.mockReturnValue({ rain: true } as ReturnType<typeof useAudio>);

    const { container } = render(<VideoBackground videos={mockVideos} />);
    const source = container.querySelector("source");
    expect(source?.getAttribute("src")).toBe("/test-rainy-night.mp4");
  });

  it("has correct class when fullscreen=true", () => {
    mockUseVideo.mockReturnValue({ toggled: true, fullscreen: true, setToggled: jest.fn(), setFullscreen: jest.fn() });
    mockUseAudio.mockReturnValue({ rain: false } as ReturnType<typeof useAudio>);

    const { container } = render(<VideoBackground videos={mockVideos} />);
    const video = container.querySelector("video");
    expect(video?.className).toContain("top-[0%]");
  });

  it("has correct class when fullscreen=false", () => {
    mockUseVideo.mockReturnValue({ toggled: true, fullscreen: false, setToggled: jest.fn(), setFullscreen: jest.fn() });
    mockUseAudio.mockReturnValue({ rain: false } as ReturnType<typeof useAudio>);

    const { container } = render(<VideoBackground videos={mockVideos} />);
    const video = container.querySelector("video");
    expect(video?.className).toContain("top-[-11%]");
  });

  it("updates video when state changes", () => {
    mockUseVideo.mockReturnValue({ toggled: true, fullscreen: false, setToggled: jest.fn(), setFullscreen: jest.fn() });
    mockUseAudio.mockReturnValue({ rain: false } as ReturnType<typeof useAudio>);

    const { container, rerender } = render(<VideoBackground videos={mockVideos} />);
    let source = container.querySelector("source");
    expect(source?.getAttribute("src")).toBe("/test-day.mp4");

    // Change to night
    mockUseVideo.mockReturnValue({ toggled: false, fullscreen: false, setToggled: jest.fn(), setFullscreen: jest.fn() });
    rerender(<VideoBackground videos={mockVideos} />);
    source = container.querySelector("source");
    expect(source?.getAttribute("src")).toBe("/test-night.mp4");
  });

  it("uses default video when state is unknown", () => {
    // This is hard to trigger because of the logic, but we can try to pass partial mock
    mockUseVideo.mockReturnValue({ toggled: true, fullscreen: false } as any);
    mockUseAudio.mockReturnValue({ rain: undefined } as any);

    const { container } = render(<VideoBackground videos={mockVideos} />);
    const source = container.querySelector("source");
    // Should fall back to day video (line 23)
    expect(source?.getAttribute("src")).toBe("/test-day.mp4");
  });
});
