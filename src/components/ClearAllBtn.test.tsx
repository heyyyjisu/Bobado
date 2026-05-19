import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ClearAllBtn from "@/components/ClearAllBtn";

describe("ClearAllBtn", () => {
  test("click to clear all", async () => {
    render(<ClearAllBtn onClear={() => {}} />);
    expect(
      screen.getByRole("button", { name: "Clear all" }),
    ).toBeInTheDocument();
  });

  test("opens confirmation dialog when clicked", async () => {
    const user = userEvent.setup();
    render(<ClearAllBtn onClear={() => {}} />);

    await user.click(screen.getByText("Clear all"));

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("Clear all todos")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  test("calls onClear when Clear is clicked", async () => {
    const user = userEvent.setup();
    const mockOnClear = jest.fn();
    render(<ClearAllBtn onClear={mockOnClear} />);

    await user.click(screen.getByRole("button", { name: "Clear all" }));
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  test("closes dialog when Cancal is clicked", async () => {
    const user = userEvent.setup();
    render(<ClearAllBtn onClear={() => {}} />);

    await user.click(screen.getByRole("button", { name: "Clear all" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
});
