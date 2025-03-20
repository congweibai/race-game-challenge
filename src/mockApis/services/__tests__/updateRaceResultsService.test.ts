import { describe, expect, it, Mock, vi } from "vitest";
import * as raceService from "@/mockApis/services/race.service";
import { updateRaceResultsByIdRepo } from "@/mockApis/repos/race.repo";

const isValidRacePlacementsSpyOn = vi.spyOn(
  raceService,
  "isValidRacePlacements"
);

vi.mock("@/mockApis/services/race.service", async (importOriginal) => {
  return {
    ...(await importOriginal<
      typeof import("@/mockApis/services/race.service")
    >()),
    // this will only affect "foo" outside of the original module
    isValidRacePlacements: vi.fn(),
  };
});

vi.mock("@/mockApis/repos/race.repo", () => {
  return {
    updateRaceResultsByIdRepo: vi.fn(),
  };
});

describe("updateRaceResultsService", () => {
  it("should update race results when valid", async () => {
    const mockPayload = {
      raceId: "race-123",
      results: [
        { order: 0, studentIds: ["2", "3"] },
        { order: 1, studentIds: ["4", "5", "6"] },
        { order: 2, studentIds: ["7"] },
      ],
    };

    const transformedResults = [
      { studentId: "2", order: 0 },
      { studentId: "3", order: 0 },
      { studentId: "4", order: 2 },
      { studentId: "5", order: 2 },
      { studentId: "6", order: 2 },
      { studentId: "7", order: 5 },
    ];
    (updateRaceResultsByIdRepo as Mock).mockResolvedValue("Update Successful");

    const result = await raceService.updateRaceResultsService(mockPayload);
    expect(result).toBe("Update Successful");
    expect(updateRaceResultsByIdRepo).toHaveBeenCalledWith(
      mockPayload.raceId,
      transformedResults
    );
  });

  // TO DO: fix this test case
  it.todo(
    "should return an error message when results are invalid",
    async () => {
      const mockPayload = {
        raceId: "race-123",
        results: [
          { order: 0, studentIds: ["2", "3"] },
          { order: 1, studentIds: ["4", "5", "6"] },
          { order: 2, studentIds: ["7"] },
        ],
      };

      isValidRacePlacementsSpyOn.mockReturnValue(false);

      const result = await raceService.updateRaceResultsService(mockPayload);
      expect(result).toBe("Payload is not correct");
      expect(updateRaceResultsByIdRepo).not.toHaveBeenCalled();
    }
  );
});
