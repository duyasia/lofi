import React from "react";
import { render, screen } from "@testing-library/react";
import ChangeSetPanel from "../ChangeSetPanel";

describe("ChangeSetPanel", () => {
  it("returns null when isOpen=false", () => {
    const { container } = render(<ChangeSetPanel isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders 'Change Set' header when open", () => {
    render(<ChangeSetPanel isOpen={true} />);
    expect(screen.getByText("Change Set")).toBeInTheDocument();
  });

  it("renders 6 change set items", () => {
    render(<ChangeSetPanel isOpen={true} />);
    expect(screen.getByAltText("bookcafe")).toBeInTheDocument();
    expect(screen.getByAltText("dreamin")).toBeInTheDocument();
    expect(screen.getByAltText("chill")).toBeInTheDocument();
    expect(screen.getByAltText("cottage")).toBeInTheDocument();
    expect(screen.getByAltText("kyoto")).toBeInTheDocument();
    expect(screen.getByAltText("lofidesk")).toBeInTheDocument();
  });

  it("first item (bookcafe) has no premium badge", () => {
    render(<ChangeSetPanel isOpen={true} />);
    const bookcafeImg = screen.getByAltText("bookcafe");
    // bookcafe is not premium, so it should not have opacity-50 class
    expect(bookcafeImg).not.toHaveClass("opacity-50");
  });

  it("premium items show premium badge", () => {
    render(<ChangeSetPanel isOpen={true} />);
    // There should be 5 premium badges (dreamin, chill, cottage, kyoto, lofidesk)
    const premiumBadges = screen.getAllByAltText("premium");
    expect(premiumBadges).toHaveLength(5);
  });

  it("premium items have opacity-50", () => {
    render(<ChangeSetPanel isOpen={true} />);
    const dreaminImg = screen.getByAltText("dreamin");
    expect(dreaminImg).toHaveClass("opacity-50");
  });
});
