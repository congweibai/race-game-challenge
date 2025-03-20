import { describe, it, expect } from "vitest";
import { createRaceArray } from "../createRaceArray";

describe("createRaceArray", () => {
  it("should create an array of length `n` when `n` is 2 or greater", () => {
    const result = createRaceArray(5);
    expect(result).toHaveLength(5);
    expect(result).toEqual([
      { order: 0, studentIds: [] },
      { order: 1, studentIds: [] },
      { order: 2, studentIds: [] },
      { order: 3, studentIds: [] },
      { order: 4, studentIds: [] },
    ]);
  });

  it("should create an array of length 2 when `n` is less than 2", () => {
    const result = createRaceArray(1);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { order: 0, studentIds: [] },
      { order: 1, studentIds: [] },
    ]);
  });

  it("should create an array of length 2 when `n` is 0", () => {
    const result = createRaceArray(0);
    expect(result).toHaveLength(2);
  });

  it("should create an array of length 2 when `n` is negative", () => {
    const result = createRaceArray(-3);
    expect(result).toHaveLength(2);
  });

  it("should correctly assign `order` from 0 to `n - 1`", () => {
    const result = createRaceArray(3);
    expect(result.map((item) => item.order)).toEqual([0, 1, 2]);
  });

  it("should always initialize `studentIds` as an empty array", () => {
    const result = createRaceArray(4);
    result.forEach((item) => {
      expect(item.studentIds).toEqual([]);
    });
  });
});
