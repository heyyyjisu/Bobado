import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CategoryCard from "@/components/CategoryCard";

const mockTodos = [
  {
    _id: "123",
    text: "Buy milk",
    isCompleted: false,
    category: "important",
    recurring: false,
    deadline: null,
  },
];
const mockOnComplete = jest.fn();
const mockOnDelete = jest.fn();

describe("CategoryCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("isCompleted is clicked", async () => {
    const user = userEvent.setup();

    render(
      <CategoryCard
        title="important"
        icon="/images/important.webp"
        alt="apple"
        todos={mockTodos}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        isDeleting={null}
      />,
    );

    await user.click(screen.getByTestId("complete-123"));
    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  test("onDelete is cliecked", async () => {
    const user = userEvent.setup();

    render(
      <CategoryCard
        title="important"
        icon="/images/important.webp"
        alt="apple"
        todos={mockTodos}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        isDeleting={null}
      />,
    );

    await user.click(screen.getByText("✄"));

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
