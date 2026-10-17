import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FlightScoringVisual } from "@/components/portfolio/visuals";

describe("FlightSight recommendation scoring visual", () => {
  it("shows the seven audited scoring weights and their API-only status", () => {
    render(<FlightScoringVisual />);

    const list = screen.getByRole("list", { name: "Recommendation API scoring weights" });
    const factors = within(list).getAllByRole("listitem").map((item) => item.textContent);

    expect(factors).toEqual([
      "Price25%",
      "Safety20%",
      "Emissions15%",
      "Duration10%",
      "Stops10%",
      "Seat availability10%",
      "Weather10%",
    ]);
    expect(factors.reduce((total, factor) => total + Number(factor?.match(/(\d+)%/)?.[1]), 0)).toBe(100);
    expect(screen.getByText(/not currently connected to the application UI/i)).toBeInTheDocument();
  });
});
