import { createRaceService } from "@/mockApis/services/race.service";
import { CreateRaceHanderPayload } from "@/mockApis/types";
import { describe, expect, it, Mock, vi } from "vitest";
import { createRaceHandler } from "../createRace.handler";

vi.mock("@/mockApis/services/race.service", () => ({
  createRaceService: vi.fn(),
}));

describe("createRaceHandler", () => {
  it("should call createRaceService with the correct payload", async () => {
    const mockPayload: CreateRaceHanderPayload = {
      raceName: "New Race Game!",
      lanes: [
        {
          laneId: "928e6ed7cac",
          studentId: "1",
        },
        {
          laneId: "28e6ed7cac5",
          studentId: "2",
        },
      ],
    };

    // Mock resolved value
    (createRaceService as Mock).mockResolvedValue({ success: true });

    // Call the handler
    const result = await createRaceHandler(mockPayload);

    // Assertions
    expect(createRaceService).toHaveBeenCalledTimes(1);
    expect(createRaceService).toHaveBeenCalledWith(mockPayload);
    expect(result).toEqual({ success: true });
  });

  it("should handle service rejection", async () => {
    const mockPayload: CreateRaceHanderPayload = {
      raceName: "New Race Game!",
      lanes: [
        {
          laneId: "928e6ed7cac",
          studentId: "1",
        },
        {
          laneId: "28e6ed7cac5",
          studentId: "2",
        },
      ],
    };

    // Mock rejected value
    (createRaceService as Mock).mockRejectedValue(new Error("Service error"));

    await expect(createRaceHandler(mockPayload)).rejects.toThrow(
      "Service error"
    );
    expect(createRaceService).toHaveBeenCalledWith(mockPayload);
  });
});
