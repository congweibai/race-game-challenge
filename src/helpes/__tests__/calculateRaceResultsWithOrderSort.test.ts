import { describe, expect, it } from "vitest";
import { calculateRaceResultsWithOrderSort } from "../calculateRaceResultsWithOrderSort";
import { mockPastRaces, mockStudents } from "@/__tests__/mock";
import { ResultRecord } from "@/types";

describe("calculateRaceResultsWithOrderSort", () => {
  it("should return empty array when results is empty", () => {
    const result = calculateRaceResultsWithOrderSort({
      results: [],
      students: [],
    });

    expect(result).toStrictEqual([]);
  });

  it("should add student name and sort by order", () => {
    const result = calculateRaceResultsWithOrderSort({
      results: mockPastRaces[2].results as ResultRecord[],
      students: mockStudents,
    });

    expect(result).toStrictEqual([
      {
        order: 0,
        studentId: "3",
        studentName: "Jack",
      },
      {
        order: 1,
        studentId: "2",
        studentName: "Tom",
      },
      {
        order: 2,
        studentId: "4",
        studentName: "James",
      },
      {
        order: 2,
        studentId: "5",
        studentName: "Kevin",
      },
      {
        order: 4,
        studentId: "1",
        studentName: "Wyatt",
      },
    ]);
  });

  it("should put student name as 'No Record' if student id can't found ", () => {
    const result = calculateRaceResultsWithOrderSort({
      results: [
        ...(mockPastRaces[2].results as ResultRecord[]),
        {
          studentId: "500",
          order: 6,
        },
      ],
      students: mockStudents,
    });

    expect(result).toStrictEqual([
      {
        order: 0,
        studentId: "3",
        studentName: "Jack",
      },
      {
        order: 1,
        studentId: "2",
        studentName: "Tom",
      },
      {
        order: 2,
        studentId: "4",
        studentName: "James",
      },
      {
        order: 2,
        studentId: "5",
        studentName: "Kevin",
      },
      {
        order: 4,
        studentId: "1",
        studentName: "Wyatt",
      },
      {
        order: 6,
        studentId: "500",
        studentName: "No Record",
      },
    ]);
  });
});
