import { render, screen } from "@testing-library/react";
import { RaceHistory } from "../RaceHistory";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useRaceList } from "@/hooks/useRaceList";
import { mockPastRaces } from "@/__tests__/mock";

vi.mock("@/hooks/useRaceList");

describe("RaceHistory Component", () => {
  beforeEach(() => {
    (useRaceList as Mock).mockReturnValue({
      raceList: mockPastRaces,
    });
  });

  it("should render RaceHistory correctly", () => {
    render(<RaceHistory />);
    expect(screen.getByText("Race history:")).toBeVisible();

    expect(screen.getByText("Race 1")).toBeVisible();
    expect(screen.getByText("Race 2")).toBeVisible();
    expect(screen.getByText("Race 3")).toBeVisible();
  });

  it("should show show detail once click race item", async () => {
    const user = userEvent.setup();
    render(<RaceHistory />);
    expect(screen.getByText("Race history:")).toBeVisible();
    expect(screen.queryByText("No results found!")).toBeNull();

    const raceOneButton = screen.getByRole("button", {
      name: "Race 1",
    });

    await user.click(raceOneButton);
    expect(screen.getByText("No results found!")).toBeVisible();
  });

  it("should hide previous detail once new detail clicked", async () => {
    const user = userEvent.setup();
    render(<RaceHistory />);
    expect(screen.getByText("Race history:")).toBeVisible();
    expect(screen.queryByText("No results found!")).toBeNull();

    const raceOneButton = screen.getByRole("button", {
      name: "Race 1",
    });

    const raceThreeButton = screen.getByRole("button", {
      name: "Race 3",
    });

    await user.click(raceOneButton);
    expect(screen.getByText("No results found!")).toBeVisible();
    expect(screen.queryByText("Rank:1, Jack")).toBeNull();

    await user.click(raceThreeButton);
    expect(screen.getByText("Rank:1, Jack")).toBeVisible();
    expect(screen.queryByText("No results found!")).toBeNull();
  });
});
