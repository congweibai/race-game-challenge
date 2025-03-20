import { createLaneService } from "@/mockApis/services/lane.service";
import { CreateLaneHanderPayload } from "@/mockApis/types";
import { describe, expect, it, Mock, vi } from "vitest";
import { createLaneHandler } from "../createLane.handler";

vi.mock("@/mockApis/services/lane.service", () => ({
  createLaneService: vi.fn(),
}));

describe("createLaneHandler", () => {
  it("should call createLaneService with the correct payload", async () => {
    const mockPayload: CreateLaneHanderPayload = {
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
    (createLaneService as Mock).mockResolvedValue({ success: true });

    // Call the handler
    const result = await createLaneHandler(mockPayload);

    // Assertions
    expect(createLaneService).toHaveBeenCalledTimes(1);
    expect(createLaneService).toHaveBeenCalledWith(mockPayload);
    expect(result).toEqual({ success: true });
  });

  it("should handle service rejection", async () => {
    const mockPayload: CreateLaneHanderPayload = {
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
    (createLaneService as Mock).mockRejectedValue(new Error("Service error"));

    await expect(createLaneHandler(mockPayload)).rejects.toThrow(
      "Service error"
    );
    expect(createLaneService).toHaveBeenCalledWith(mockPayload);
  });
});
