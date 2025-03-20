import { renderHook, waitFor } from "@testing-library/react";
import { useRaceList } from "@/hooks/useRaceList";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { getLanesHandler } from "@/mockApis/handlers/getRaces.handler";

vi.mock("@/mockApis/handlers/getRaces.handler");

const mockPastRaces = [
  {
    id: "1",
    raceName: "Race 1",
    lanes: [
      {
        id: "1",
        laneId: "Lane 1",
        studentId: "1",
      },
      {
        id: "2",
        laneId: "Lane 2",
        studentId: "2",
      },
      {
        id: "3",
        laneId: "Lane 3",
        studentId: "3",
      },
      {
        id: "4",
        laneId: "Lane 4",
        studentId: "4",
      },
    ],
  },
];

describe("useRaceList Hook", () => {
  beforeEach(() => {
    (getLanesHandler as Mock).mockResolvedValue(mockPastRaces);
  });

  it("should return the given mock race list", async () => {
    const { result } = renderHook(() => useRaceList());
    expect(result.current.isLoadinng).toBe(true);

    await waitFor(() => expect(result.current.isLoadinng).toBe(false));

    expect(result.current.raceList).toEqual(mockPastRaces);
  });

  it("should not modify the race list", async () => {
    const { result } = renderHook(() => useRaceList());

    await waitFor(() => expect(result.current.raceList).toHaveLength(1));

    expect(result.current.raceList[0].raceName).toBe("Race 1");
  });
});
