import React from "react";
import { render, screen } from "@testing-library/react";
import PlaylistPanel from "../PlaylistPanel";

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
});
