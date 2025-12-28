import React from "react";
import { render, screen } from "@testing-library/react";
import ProductivityPanel from "../ProductivityPanel";

describe("ProductivityPanel", () => {
  it("returns null when isOpen=false", () => {
    const { container } = render(<ProductivityPanel isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders 'Productivity' header when open", () => {
    render(<ProductivityPanel isOpen={true} />);
    expect(screen.getByText("Productivity")).toBeInTheDocument();
  });

  it("renders 4 productivity items", () => {
    render(<ProductivityPanel isOpen={true} />);
    expect(screen.getByText("Start Session")).toBeInTheDocument();
    expect(screen.getByText("Timer and Tasks")).toBeInTheDocument();
    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
  });

  it("all items show lock icon (feature locked)", () => {
    render(<ProductivityPanel isOpen={true} />);
    const lockIcons = screen.getAllByAltText("lock");
    expect(lockIcons).toHaveLength(4);
  });
});
