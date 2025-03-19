import { render, screen } from "@testing-library/react";
import { RacePanel } from "../RacePanel";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

describe("RacePanel Component", () => {
  it("should render CreateRace component by default", () => {
    render(<RacePanel />);

    expect(screen.getByText("Create new race")).toBeDisabled();
    expect(screen.getByText("Race history")).not.toBeDisabled();

    expect(screen.getByText("Create a race:")).toBeVisible();
    expect(screen.queryByText("Race history:")).toBeNull();
  });

  it("should switch to RaceHistory when clicking the button", async () => {
    const user = userEvent.setup();
    render(<RacePanel />);

    const raceHistoryButton = screen.getByRole("button", {
      name: "Race history",
    });
    await user.click(raceHistoryButton);

    expect(raceHistoryButton).toBeDisabled();
    expect(screen.getByText("Create new race")).not.toBeDisabled();

    expect(screen.getByText("Race history:")).toBeVisible();
    expect(screen.queryByText("Create a race:")).toBeNull();
  });

  it("should switch back to CreateRace when clicking the button", async () => {
    const user = userEvent.setup();
    render(<RacePanel />);

    const raceHistoryButton = screen.getByRole("button", {
      name: "Race history",
    });

    const createRaceButton = screen.getByRole("button", {
      name: "Create new race",
    });

    await user.click(raceHistoryButton);
    await user.click(createRaceButton);

    expect(screen.getByText("Create new race")).toBeDisabled();
    expect(screen.getByText("Race history")).not.toBeDisabled();

    expect(screen.getByText("Create a race:")).toBeVisible();
    expect(screen.queryByText("Race history:")).toBeNull();
  });
});
