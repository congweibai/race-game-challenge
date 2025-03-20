import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { RaceResultForm } from "@/components/race/RaceResultForm";
import { Race } from "@/types";
import { useStudentList } from "@/hooks/useStudentList";
import userEvent from "@testing-library/user-event";

vi.mock("@/hooks/useStudentList", () => ({
  useStudentList: vi.fn(),
}));

describe("RaceResultForm", () => {
  const mockRace: Race = {
    id: "2",
    raceName: "Race 2",
    lanes: [
      {
        id: "1",
        laneId: "Lane 1",
        studentId: "1",
      },
      {
        id: "2",
        laneId: "Lane 2",
        studentId: "2",
      },
      {
        id: "3",
        laneId: "Lane 3",
        studentId: "3",
      },
    ],
  };

  beforeEach(() => {
    (useStudentList as Mock).mockReturnValue({
      studentList: [
        { id: "1", name: "Wyatt" },
        { id: "2", name: "Tom" },
        { id: "3", name: "Test" },
      ],
    });
  });

  it("renders the form with correct number of ranks", () => {
    const mockOnUpdateRaceResults = vi.fn();
    render(
      <RaceResultForm
        race={mockRace}
        onUpdateRaceResults={mockOnUpdateRaceResults}
      />
    );

    expect(screen.getByText("Rank 1:")).toBeInTheDocument();
    expect(screen.getByText("Rank 2:")).toBeInTheDocument();
    expect(screen.getByText("Rank 3:")).toBeInTheDocument();
  });

  it("disables submit button when not all students are assigned", () => {
    const mockOnUpdateRaceResults = vi.fn();
    render(
      <RaceResultForm
        race={mockRace}
        onUpdateRaceResults={mockOnUpdateRaceResults}
      />
    );
    const submitButton = screen.getByRole("button", { name: "Save result" });

    expect(submitButton).toBeDisabled();
  });

  it("enables submit button when all students are assigned", async () => {
    const user = userEvent.setup();
    const mockOnUpdateRaceResults = vi.fn();
    render(
      <RaceResultForm
        race={mockRace}
        onUpdateRaceResults={mockOnUpdateRaceResults}
      />
    );

    const selectInputs = screen.getAllByRole("combobox");
    const firstOption = selectInputs[0];
    await user.click(firstOption);
    const optionToSelectTom = screen.getByText("Wyatt");
    await user.click(optionToSelectTom);

    await user.click(firstOption);
    const optionToSelectWyatt = screen.getByText("Tom");
    await user.click(optionToSelectWyatt);

    await user.click(firstOption);
    const optionToSelectTest = screen.getByText("Test");
    await user.click(optionToSelectTest);

    const submitButton = screen.getByRole("button", { name: "Save result" });

    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });

  it("calls onUpdateRaceResults with correctly formatted data", async () => {
    const user = userEvent.setup();
    const mockOnUpdateRaceResults = vi.fn();
    render(
      <RaceResultForm
        race={mockRace}
        onUpdateRaceResults={mockOnUpdateRaceResults}
      />
    );

    const selectInputs = screen.getAllByRole("combobox");
    const firstOption = selectInputs[0];
    await user.click(firstOption);
    const optionToSelectTom = screen.getByText("Wyatt");
    await user.click(optionToSelectTom);

    await user.click(firstOption);
    const optionToSelectWyatt = screen.getByText("Tom");
    await user.click(optionToSelectWyatt);

    await user.click(firstOption);
    const optionToSelectTest = screen.getByText("Test");
    await user.click(optionToSelectTest);

    const submitButton = screen.getByRole("button", { name: "Save result" });
    await user.click(submitButton);

    await waitFor(() =>
      expect(mockOnUpdateRaceResults).toHaveBeenCalledWith([
        { order: 0, studentIds: ["1", "2", "3"] },
      ])
    );
  });
});
