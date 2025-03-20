import { describe, it, expect } from "vitest";
import { adjustRacePlacements } from "../adjustRacePlacements";

describe("adjustRacePlacements", () => {
  it("should adjust the order while maintaining student groups", () => {
    const input = [
      { order: 0, studentIds: ["1", "2"] },
      { order: 1, studentIds: [] },
      { order: 2, studentIds: ["3"] },
      { order: 3, studentIds: ["4", "5"] },
      { order: 4, studentIds: [] },
    ];

    const expectedOutput = [
      { order: 0, studentIds: ["1", "2"] },
      { order: 1, studentIds: ["3"] },
      { order: 2, studentIds: ["4", "5"] },
    ];

    expect(adjustRacePlacements(input)).toEqual(expectedOutput);
  });

  it("should return an empty array when input is empty", () => {
    expect(adjustRacePlacements([])).toEqual([]);
  });

  it("should skip ranks with no studentIds", () => {
    const input = [
      { order: 0, studentIds: [] },
      { order: 1, studentIds: [] },
      { order: 2, studentIds: ["6"] },
    ];

    const expectedOutput = [{ order: 0, studentIds: ["6"] }];

    expect(adjustRacePlacements(input)).toEqual(expectedOutput);
  });

  it("should correctly reassign orders when all ranks are non-empty", () => {
    const input = [
      { order: 0, studentIds: ["1"] },
      { order: 1, studentIds: ["2"] },
      { order: 2, studentIds: ["3"] },
    ];

    const expectedOutput = [
      { order: 0, studentIds: ["1"] },
      { order: 1, studentIds: ["2"] },
      { order: 2, studentIds: ["3"] },
    ];

    expect(adjustRacePlacements(input)).toEqual(expectedOutput);
  });

  it("should handle cases where all ranks are empty", () => {
    const input = [
      { order: 0, studentIds: [] },
      { order: 1, studentIds: [] },
      { order: 2, studentIds: [] },
    ];

    expect(adjustRacePlacements(input)).toEqual([]);
  });
});
