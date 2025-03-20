import { updateRaceResultsService } from "@/mockApis/services/race.service";
import { UpdateRaceResultsPayload } from "@/mockApis/types";
import { describe, expect, it, Mock, vi } from "vitest";
import { updateRaceResultsHandler } from "../updateRaceResults.handler";

vi.mock("@/mockApis/services/race.service", () => ({
  updateRaceResultsService: vi.fn(),
}));

describe("updateRaceResultsHandler", () => {
  it("should call updateRaceResultsService with the correct payload", async () => {
    const mockPayload: UpdateRaceResultsPayload = {
      raceId: "1",
      results: [
        {
          order: 0,
          studentIds: ["1", "2", "5"],
        },
      ],
    };

    (updateRaceResultsService as Mock).mockResolvedValue({ success: true });

    const result = await updateRaceResultsHandler(mockPayload);

    expect(updateRaceResultsService).toHaveBeenCalledTimes(1);
    expect(updateRaceResultsService).toHaveBeenCalledWith(mockPayload);
    expect(result).toEqual({ success: true });
  });

  it("should handle service rejection", async () => {
    const mockPayload: UpdateRaceResultsPayload = {
      raceId: "1",
      results: [
        {
          order: 0,
          studentIds: ["1", "2", "5"],
        },
      ],
    };

    // Mock rejected value
    (updateRaceResultsService as Mock).mockRejectedValue(
      new Error("Service error")
    );

    await expect(updateRaceResultsHandler(mockPayload)).rejects.toThrow(
      "Service error"
    );
    expect(updateRaceResultsService).toHaveBeenCalledWith(mockPayload);
  });
});
