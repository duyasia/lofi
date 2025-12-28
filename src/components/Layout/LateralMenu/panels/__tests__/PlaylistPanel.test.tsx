import React from "react";
import { render, screen, fireEvent } from "../../../../../test-utils";
import PlaylistPanel from "../PlaylistPanel";
import { chill, jazzy, sleep } from "../../../../../data/dataSong";

describe("PlaylistPanel", () => {
  it("returns null when isOpen=false", () => {
    const { container } = render(<PlaylistPanel isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders 'Playlists' header when open", () => {
    render(<PlaylistPanel isOpen={true} />);
    expect(screen.getByText("Playlists")).toBeInTheDocument();
  });

  it("renders 3 playlist images (chill, focus, sleep)", () => {
    render(<PlaylistPanel isOpen={true} />);
    expect(screen.getByAltText("chill")).toBeInTheDocument();
    expect(screen.getByAltText("focus")).toBeInTheDocument();
    expect(screen.getByAltText("sleep")).toBeInTheDocument();
  });

  it("renders 'Templates' section", () => {
    render(<PlaylistPanel isOpen={true} />);
    expect(screen.getByText("Templates")).toBeInTheDocument();
  });

  it("shows 'no template' message", () => {
    render(<PlaylistPanel isOpen={true} />);
    expect(
      screen.getByText("You haven't saved any template yet, open the mixer to save one.")
    ).toBeInTheDocument();
  });

  it("playlist images are clickable", () => {
    render(<PlaylistPanel isOpen={true} />);
    const chillImg = screen.getByAltText("chill");
    const focusImg = screen.getByAltText("focus");
    const sleepImg = screen.getByAltText("sleep");

    // All images should be clickable
    expect(chillImg).toHaveClass("cursor-pointer");
    expect(focusImg).toHaveClass("cursor-pointer");
    expect(sleepImg).toHaveClass("cursor-pointer");
  });

  it("clicking playlist changes active state", () => {
    render(<PlaylistPanel isOpen={true} />);
    const focusImg = screen.getByAltText("focus");

    // Click focus playlist
    fireEvent.click(focusImg);

    // After click, focus should be active (ring-2 ring-white)
    expect(focusImg).toHaveClass("ring-2");
    expect(focusImg).toHaveClass("ring-white");
  });
});
