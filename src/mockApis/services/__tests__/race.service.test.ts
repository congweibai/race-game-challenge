import { CreateRaceHanderPayload } from "@/mockApis/types";
// @ts-expect-error
import { uid } from "uid";
import { describe, expect, it, Mock, vi } from "vitest";
import {
  createRaceService,
  isValidRacePlacements,
  transformRaceResults,
  validateCreateRacePayload,
} from "../race.service";
import { createRaceRepo } from "@/mockApis/repos/race.repo";

vi.mock("uid", () => ({
  uid: vi.fn(() => "mocked-uid"),
}));

vi.mock("@/mockApis/repos/race.repo", () => ({
  createRaceRepo: vi.fn(),
}));

describe("transformRaceResults", () => {
  it("should return correct order if there is no tie", () => {
    const inputs = [
      {
        order: 0,
        studentIds: ["2"],
      },
      {
        order: 1,
        studentIds: ["4"],
      },
      {
        order: 2,
        studentIds: ["7"],
      },
      {
        order: 3,
        studentIds: ["8"],
      },
      {
        order: 4,
        studentIds: ["9"],
      },
    ];

    const results = transformRaceResults(inputs);
    expect(results).toStrictEqual([
      {
        studentId: "2",
        order: 0,
      },
      {
        studentId: "4",
        order: 1,
      },
      {
        studentId: "7",
        order: 2,
      },
      {
        studentId: "8",
        order: 3,
      },
      {
        studentId: "9",
        order: 4,
      },
    ]);
  });

  it("should return correct order if there is tieL requirment case", () => {
    const inputs = [
      {
        order: 0,
        studentIds: ["2", "3", "1"],
      },
      {
        order: 1,
        studentIds: ["4"],
      },
    ];

    const results = transformRaceResults(inputs);
    expect(results).toStrictEqual([
      {
        studentId: "2",
        order: 0,
      },
      {
        studentId: "3",
        order: 0,
      },
      {
        studentId: "1",
        order: 0,
      },
      {
        studentId: "4",
        order: 3,
      },
    ]);
  });

  it("should return correct order if there is tie requirment case2 even front has a jump", () => {
    const inputs = [
      {
        order: 0,
        studentIds: ["2"],
      },
      {
        order: 1,
        studentIds: ["4", "1"],
      },
      {
        // we can't stop frontend payload, so we have to valid in backend
        order: 30,
        studentIds: ["8"],
      },
    ];

    const results = transformRaceResults(inputs);
    expect(results).toStrictEqual([
      {
        studentId: "2",
        order: 0,
      },
      {
        studentId: "4",
        order: 1,
      },
      {
        studentId: "1",
        order: 1,
      },
      {
        studentId: "8",
        order: 3,
      },
    ]);
  });

  it("should return correct order if there is tie", () => {
    const inputs = [
      {
        order: 0,
        studentIds: ["2", "3"],
      },
      {
        order: 1,
        studentIds: ["4", "5", "6"],
      },
      {
        order: 2,
        studentIds: ["7"],
      },
      {
        order: 3,
        studentIds: ["8"],
      },
      {
        order: 4,
        studentIds: ["9"],
      },
    ];

    const results = transformRaceResults(inputs);
    expect(results).toStrictEqual([
      {
        studentId: "2",
        order: 0,
      },
      {
        studentId: "3",
        order: 0,
      },
      {
        studentId: "4",
        order: 2,
      },
      {
        studentId: "5",
        order: 2,
      },
      {
        studentId: "6",
        order: 2,
      },
      {
        studentId: "7",
        order: 5,
      },
      {
        studentId: "8",
        order: 6,
      },
      {
        studentId: "9",
        order: 7,
      },
    ]);
  });
});

describe("isValidRacePlacements", () => {
  it("should return true if order is valid", () => {
    const inputs = [
      {
        studentId: "1",
        order: 0,
      },
      {
        studentId: "2",
        order: 0,
      },
      {
        studentId: "5",
        order: 0,
      },
    ];

    const results = isValidRacePlacements(inputs);
    expect(results).toBe(true);
  });

  it("should return true if order is valid and start with 0", () => {
    const inputs = [
      {
        studentId: "1",
        order: 0,
      },
      {
        studentId: "2",
        order: 1,
      },
      {
        studentId: "5",
        order: 2,
      },
    ];

    const results = isValidRacePlacements(inputs);
    expect(results).toBe(true);
  });

  it("should return true if order is valid and there is correct tie", () => {
    const inputs = [
      {
        studentId: "1",
        order: 0,
      },
      {
        studentId: "2",
        order: 1,
      },
      {
        studentId: "5",
        order: 1,
      },
      {
        studentId: "15",
        order: 3,
      },
      {
        studentId: "6",
        order: 3,
      },
      {
        studentId: "85",
        order: 3,
      },
      {
        studentId: "15",
        order: 6,
      },
      {
        studentId: "35",
        order: 7,
      },
    ];

    const results = isValidRacePlacements(inputs);
    expect(results).toBe(true);
  });

  it("should return false if not start with 0", () => {
    const inputs = [
      {
        studentId: "1",
        order: 1,
      },
      {
        studentId: "2",
        order: 2,
      },
      {
        studentId: "5",
        order: 3,
      },
    ];

    const results = isValidRacePlacements(inputs);
    expect(results).toBe(false);
  });

  it("should return false if there is a jump", () => {
    const inputs = [
      {
        studentId: "1",
        order: 0,
      },
      {
        studentId: "2",
        order: 2,
      },
      {
        studentId: "5",
        order: 3,
      },
    ];

    const results = isValidRacePlacements(inputs);
    expect(results).toBe(false);
  });
});

describe("validateCreateRacePayload", () => {
  it("should return false if there are fewer than 2 lanes", () => {
    const payload: CreateRaceHanderPayload = {
      raceName: "New Race Game!",
      lanes: [
        {
          laneId: "928e6ed7cac",
          studentId: "1",
        },
      ],
    };

    expect(validateCreateRacePayload(payload)).toBe(false);
  });

  it("should return false if a student is assigned to more than one lane", () => {
    const payload: CreateRaceHanderPayload = {
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

    expect(validateCreateRacePayload(payload)).toBe(false);
  });

  it("should return true for a valid payload", () => {
    const payload: CreateRaceHanderPayload = {
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

    expect(validateCreateRacePayload(payload)).toBe(true);
  });
});

describe("createRaceService", () => {
  it("should return 'Payload is not correct' if validation fails", () => {
    const invalidPayload: CreateRaceHanderPayload = {
      raceName: "New Race Game!",
      lanes: [
        {
          laneId: "928e6ed7cac",
          studentId: "1",
        },
      ],
    };

    expect(createRaceService(invalidPayload)).toBe("Payload is not correct");
  });

  it("should call `createRaceRepo` with a valid transformed payload with ids", () => {
    const validPayload: CreateRaceHanderPayload = {
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

    (createRaceRepo as Mock).mockResolvedValue({ success: true });

    const result = createRaceService(validPayload);

    expect(createRaceRepo).toHaveBeenCalledWith({
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
