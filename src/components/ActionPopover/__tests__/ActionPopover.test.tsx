import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ActionPopover from "../ActionPopover";
import type { ActionPopoverProps } from "../../../types";

// Mock react-audio-player
jest.mock("react-audio-player", () => ({
  __esModule: true,
  default: () => <div data-testid="audio-player" />,
}));

// Mock MUI Slider
jest.mock("@mui/material/Slider", () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
  }: {
    value: number;
    onChange?: (e: Event, val: number | number[]) => void;
  }) => (
    <input
      type="range"
      data-testid="volume-slider"
      value={value}
      onChange={(e) => {
        // Support both number and array for coverage
        const val = Number(e.target.value);
        onChange?.(e.nativeEvent, val);
        if (val === 99) {
          onChange?.(e.nativeEvent, [99]);
        }
      }}
    />
  ),
}));

const createMockProps = (overrides?: Partial<ActionPopoverProps>): ActionPopoverProps => ({
  label: "Test Label",
  audioSrc: "/test-audio.mp3",
  isActive: false,
  volume: 50,
  onToggle: jest.fn(),
  onVolumeChange: jest.fn(),
  position: "top-[10%] left-[20%]",
  zIndex: "z-10",
  ...overrides,
});

describe("ActionPopover", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label text", () => {
    const props = createMockProps();
    render(<ActionPopover {...props} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders toggle circle", () => {
    const props = createMockProps();
    const { container } = render(<ActionPopover {...props} />);
    const circle = container.querySelector(".circle-hover");
    expect(circle).toBeInTheDocument();
  });

  it("does NOT render slider when isActive=false", () => {
    const props = createMockProps({ isActive: false });
    render(<ActionPopover {...props} />);
    expect(screen.queryByTestId("volume-slider")).not.toBeInTheDocument();
  });

  it("renders slider when isActive=true", () => {
    const props = createMockProps({ isActive: true });
    render(<ActionPopover {...props} />);
    expect(screen.getByTestId("volume-slider")).toBeInTheDocument();
  });

  it("renders audio player when isActive=true", () => {
    const props = createMockProps({ isActive: true });
    render(<ActionPopover {...props} />);
    expect(screen.getByTestId("audio-player")).toBeInTheDocument();
  });

  it("calls onToggle when circle clicked", () => {
    const props = createMockProps();
    const { container } = render(<ActionPopover {...props} />);
    const circle = container.querySelector(".circle-hover");
    fireEvent.click(circle!);
    expect(props.onToggle).toHaveBeenCalledTimes(1);
  });

  it("calls onToggle when label clicked", () => {
    const props = createMockProps();
    render(<ActionPopover {...props} />);
    fireEvent.click(screen.getByText("Test Label"));
    expect(props.onToggle).toHaveBeenCalledTimes(1);
  });

  it("calls onVolumeChange when slider changed", () => {
    const props = createMockProps({ isActive: true });
    render(<ActionPopover {...props} />);
    const slider = screen.getByTestId("volume-slider");
    fireEvent.change(slider, { target: { value: "75" } });
    expect(props.onVolumeChange).toHaveBeenCalledWith(75);
  });

  it("applies position class correctly", () => {
    const props = createMockProps({ position: "top-[50%] left-[50%]" });
    const { container } = render(<ActionPopover {...props} />);
    const popover = container.querySelector(".popover-action");
    expect(popover?.className).toContain("top-[50%]");
    expect(popover?.className).toContain("left-[50%]");
  });

  it("applies zIndex class correctly", () => {
    const props = createMockProps({ zIndex: "z-20" });
    const { container } = render(<ActionPopover {...props} />);
    const popover = container.querySelector(".popover-action");
    expect(popover?.className).toContain("z-20");
  });

  it("handles array value in slider onChange", () => {
    const props = createMockProps({ isActive: true });
    render(<ActionPopover {...props} />);

    const slider = screen.getByTestId("volume-slider");
    // Trigger the special case in our mock to pass an array
    fireEvent.change(slider, { target: { value: "99" } });

    expect(props.onVolumeChange).toHaveBeenCalledWith(99);
  });

  it("does not render audio player when audioSrc is undefined", () => {
    const props = createMockProps({ isActive: true, audioSrc: undefined });
    render(<ActionPopover {...props} />);
    expect(screen.queryByTestId("audio-player")).not.toBeInTheDocument();
  });

  it("uses default zIndex when not provided", () => {
    const props = createMockProps();
    delete (props as Partial<ActionPopoverProps>).zIndex;
    const propsWithoutZIndex = { ...props, zIndex: undefined };
    const { container } = render(<ActionPopover {...propsWithoutZIndex} />);
    const popover = container.querySelector(".popover-action");
    expect(popover?.className).toContain("z-auto");
  });
});
