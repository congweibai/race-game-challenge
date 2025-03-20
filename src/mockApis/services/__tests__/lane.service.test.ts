import { CreateLaneHanderPayload } from "@/mockApis/types";
// @ts-expect-error
import { uid } from "uid";
import { describe, expect, it, Mock, vi } from "vitest";
import { createLaneService, validateCreateLanePayload } from "../lane.service";
import { createLaneRepo } from "@/mockApis/repos/lane.repo";

vi.mock("uid", () => ({
  uid: vi.fn(() => "mocked-uid"),
}));

vi.mock("@/mockApis/repos/lane.repo", () => ({
  createLaneRepo: vi.fn(),
}));

describe("validateCreateLanePayload", () => {
  it("should return false if there are fewer than 2 lanes", () => {
    const payload: CreateLaneHanderPayload = {
      raceName: "New Race Game!",
      lanes: [
        {
          laneId: "928e6ed7cac",
          studentId: "1",
        },
      ],
    };

    expect(validateCreateLanePayload(payload)).toBe(false);
  });

  it("should return false if a student is assigned to more than one lane", () => {
    const payload: CreateLaneHanderPayload = {
      raceName: "New Race Game!",
      lanes: [
        {
          laneId: "928e6ed7cac",
          studentId: "1",
        },
        {
          laneId: "28e6ed7cac5",
          studentId: "1",
        },
      ],
    };

    expect(validateCreateLanePayload(payload)).toBe(false);
  });

  it("should return true for a valid payload", () => {
    const payload: CreateLaneHanderPayload = {
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

    expect(validateCreateLanePayload(payload)).toBe(true);
  });
});

describe("createLaneService", () => {
  it("should return 'Payload is not correct' if validation fails", () => {
    const invalidPayload: CreateLaneHanderPayload = {
      raceName: "New Race Game!",
      lanes: [
        {
          laneId: "928e6ed7cac",
          studentId: "1",
        },
      ],
    };

    expect(createLaneService(invalidPayload)).toBe("Payload is not correct");
  });

  it("should call `createLaneRepo` with a valid transformed payload with ids", () => {
    const validPayload: CreateLaneHanderPayload = {
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

    (createLaneRepo as Mock).mockResolvedValue({ success: true });

    const result = createLaneService(validPayload);

    expect(createLaneRepo).toHaveBeenCalledWith({
      ...validPayload,
      id: "mocked-uid",
      lanes: [
        { studentId: "1", id: "mocked-uid", laneId: "928e6ed7cac" },
        { studentId: "2", id: "mocked-uid", laneId: "28e6ed7cac5" },
      ],
    });

    expect(result).resolves.toEqual({ success: true });
  });
});
