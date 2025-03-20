import { renderHook } from "@testing-library/react";
import { useRaceList } from "@/hooks/useRaceList";
import { mockPastRaces } from "@/__tests__/mock";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/__tests__/mock", () => ({
  mockPastRaces: [
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
  ],
}));

describe("useRaceList Hook", () => {
  it("should return the given mock race list", () => {
    const { result } = renderHook(() => useRaceList());

    expect(result.current.raceList).toEqual(mockPastRaces);
  });

  it("should not modify the race list", () => {
    const { result } = renderHook(() => useRaceList());

    expect(result.current.raceList).toHaveLength(1);
    expect(result.current.raceList[0].raceName).toBe("Race 1");
  });
});
