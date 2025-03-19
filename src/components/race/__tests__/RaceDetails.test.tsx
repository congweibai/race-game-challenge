import { render, screen } from "@testing-library/react";
import { RaceDetails } from "../RaceDetails";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useRaceList } from "@/hooks/useRaceList";
import { mockPastRaces } from "@/__tests__/mock";
import { Race } from "@/types";

vi.mock("@/hooks/useRaceList");

describe("RaceDetails Component", () => {
  beforeEach(() => {
    (useRaceList as Mock).mockReturnValue({
      raceList: mockPastRaces,
    });
  });

  it("should show student name with given order", () => {
    const noResultsRace: Race = {
      id: "1",
      raceName: "Race 1",
      lanes: [
        {
          id: "1",
          laneName: "Lane 1",
          studentId: "1",
        },
        {
          id: "2",
          laneName: "Lane 2",
          studentId: "2",
        },
        {
          id: "3",
          laneName: "Lane 3",
          studentId: "3",
        },
        {
          id: "4",
          laneName: "Lane 4",
          studentId: "4",
        },
      ],
    };
    render(<RaceDetails race={noResultsRace} />);
    expect(screen.getByText("No results found!")).toBeVisible();
  });

  it("should show 'No results found!' if no results", () => {
    const withResultsRace: Race = {
      id: "3",
      raceName: "Race 3",
      lanes: [
        {
          id: "1",
          laneName: "Lane 1",
          studentId: "1",
        },
        {
          id: "2",
          laneName: "Lane 2",
          studentId: "2",
        },
        {
          id: "3",
          laneName: "Lane 3",
          studentId: "3",
        },
        {
          id: "4",
          laneName: "Lane 4",
          studentId: "4",
        },
      ],
      results: [
        {
          studentId: "3",
          order: 0,
        },
        {
          studentId: "2",
          order: 1,
        },
        {
          studentId: "1",
          order: 4,
        },
        {
          studentId: "4",
          order: 2,
        },
        {
          studentId: "5",
          order: 2,
        },
      ],
    };
    render(<RaceDetails race={withResultsRace} />);
    expect(screen.queryByText("No results found!")).toBeNull();

    const items = screen.getAllByRole("listitem");

    expect(items[0]).toHaveTextContent("Rank:1, Jack");
    expect(items[1]).toHaveTextContent("Rank:2, Tom");
    expect(items[2]).toHaveTextContent("Rank:3, James");
    expect(items[3]).toHaveTextContent("Rank:3, Kevin");
    expect(items[4]).toHaveTextContent("Rank:5, Wyatt");
  });
});
