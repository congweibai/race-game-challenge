import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
// To Test
import App from "../App";

describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    //act
    render(<App />);
    const raceHeading = screen.getByText("Race system");
    expect(raceHeading).toBeVisible();
  });
});
