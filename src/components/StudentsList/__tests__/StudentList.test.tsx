import { render, screen } from "@testing-library/react";
import { StudentsList } from "../StudentsList";
import { useStudentList } from "@/hooks/useStudentList";
import { describe, expect, it, Mock, vi } from "vitest";

vi.mock("@/hooks/useStudentList");

describe("StudentsList Component", () => {
  it("should render the student list correctly", () => {
    // Mock the hook response
    (useStudentList as Mock).mockReturnValue({
      studentList: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
      ],
    });

    render(<StudentsList />);

    // Check if the heading is rendered
    expect(screen.getByText("Student list:")).toBeInTheDocument();

    // Check if student names are rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("should render an empty list if there are no students", () => {
    (useStudentList as Mock).mockReturnValue({
      studentList: [],
    });

    render(<StudentsList />);

    expect(screen.getByText("Student list:")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
