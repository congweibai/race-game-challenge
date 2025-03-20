import { render, screen, waitFor } from "@testing-library/react";
import { CreateRace } from "../CreateRace";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useStudentList } from "@/hooks/useStudentList";
import { mockStudents } from "@/__tests__/mock";
import userEvent from "@testing-library/user-event";
import { createRaceHandler } from "@/mockApis/handlers/createRace.handler";

vi.mock("@/hooks/useStudentList");
const mockCreate = vi.fn();
vi.mock("@/mockApis/handlers/createRace.handler");

describe("CreateRace Component", () => {
  beforeEach(() => {
    (useStudentList as Mock).mockReturnValue({
      studentList: mockStudents,
    });

    (createRaceHandler as Mock).mockImplementation(mockCreate);
  });

  it("should default with 2 lanes and can not remove from it", () => {
    const mockOnRefresh = vi.fn();
    render(<CreateRace onFinshed={mockOnRefresh} />);
    const items = screen.getAllByText(/Lane /);
    expect(items.length).toEqual(2);

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    expect(removeButtons.length).toEqual(2);
    removeButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("should able to add lane and remove lane", async () => {
    const user = userEvent.setup();
    const mockOnRefresh = vi.fn();
    render(<CreateRace onFinshed={mockOnRefresh} />);
    const addLaneButton = screen.getByRole("button", { name: "Add lane" });
    const items = screen.getAllByText(/Lane /);
    expect(items.length).toEqual(2);

    await user.click(addLaneButton);

    const itemsAfterAdd = screen.getAllByText(/Lane /);
    expect(itemsAfterAdd.length).toEqual(3);

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    expect(removeButtons.length).toEqual(3);
    await user.click(removeButtons[0]);
    const itemsAfterRemove = screen.getAllByText(/Lane /);
    expect(itemsAfterRemove.length).toEqual(2);
  });

  it("should only able to select student who is not assigned to the lane", async () => {
    const user = userEvent.setup();
    const mockOnRefresh = vi.fn();
    render(<CreateRace onFinshed={mockOnRefresh} />);
    const selectInputs = screen.getAllByRole("combobox");
    const firstOption = selectInputs[0];
    await user.click(firstOption);
    expect(screen.getAllByText("Wyatt").length).toBe(1);
    expect(screen.getAllByText("Tom").length).toBe(1);
    const optionToSelect = screen.getByText("Wyatt");
    await user.click(optionToSelect);

    expect(screen.getByText("Wyatt")).toBeVisible();

    // click second options which is not allow to show wyatt
    const secondOption = selectInputs[1];
    await user.click(secondOption);
    expect(screen.getAllByText("Wyatt").length).toBe(1);
    expect(screen.getAllByText("Tom").length).toBe(1);
  });

  it("should not able to submit only if form is filled and call mock api when submit", async () => {
    const user = userEvent.setup();
    const mockOnRefresh = vi.fn();
    render(<CreateRace onFinshed={mockOnRefresh} />);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    // run useEffect to first valid form on init
    await waitFor(() => expect(submitButton).toBeDisabled());
    const selectInputs = screen.getAllByRole("combobox");
    const firstOption = selectInputs[0];
    await user.click(firstOption);
    const optionToSelectWyatt = screen.getByText("Wyatt");
    await user.click(optionToSelectWyatt);

    expect(screen.getByText("Wyatt")).toBeVisible();

    // click second options which is not allow to show wyatt
    const secondOption = selectInputs[1];
    await user.click(secondOption);
    const optionToSelectTom = screen.getByText("Tom");
    await user.click(optionToSelectTom);
    expect(screen.getByText("Tom")).toBeVisible();

    const submitButtonAfterSelect = screen.getByRole("button", {
      name: "Submit",
    });
    await waitFor(() => expect(submitButtonAfterSelect).not.toBeDisabled());
    await user.click(submitButtonAfterSelect);
    expect(mockCreate).toBeCalledTimes(1);
    expect(mockOnRefresh).toBeCalledTimes(1);
  });

  it("should able to select only one student for each lane", async () => {
    const user = userEvent.setup();
    const mockOnRefresh = vi.fn();
    render(<CreateRace onFinshed={mockOnRefresh} />);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    // run useEffect to first valid form on init
    await waitFor(() => expect(submitButton).toBeDisabled());
    const selectInputs = screen.getAllByRole("combobox");
    const firstOption = selectInputs[0];
    await user.click(firstOption);
    const optionToSelectWyatt = screen.getByText("Wyatt");
    await user.click(optionToSelectWyatt);

    expect(screen.getByText("Wyatt")).toBeVisible();
    expect(screen.queryByText("Tom")).toBeNull();

    await user.click(firstOption);
    const optionToSelectTom = screen.getByText("Tom");
    await user.click(optionToSelectTom);
    expect(screen.getByText("Tom")).toBeVisible();
    expect(screen.queryByText("Wyatt")).toBeNull();
  });
});
