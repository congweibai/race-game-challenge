import { renderHook } from "@testing-library/react";
import { useStudentList } from "@/hooks/useStudentList";
import { mockStudents } from "@/__tests__/mock";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/__tests__/mock", () => ({
  mockStudents: [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ],
}));

describe("useStudentList Hook", () => {
  it("should return the given mock students list", () => {
    const { result } = renderHook(() => useStudentList());

    expect(result.current.studentList).toEqual(mockStudents);
  });

  it("should not modify the student list", () => {
    const { result } = renderHook(() => useStudentList());

    expect(result.current.studentList).toHaveLength(2);
    expect(result.current.studentList[0].name).toBe("John Doe");
  });
});
