import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("cookies-next", () => ({
  deleteCookie: jest.fn(),
}));

describe("Navbar", () => {
  test("calls buymeacoffee link when it is clicked", async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    await user.click(screen.getByTestId("buymeacoffee"));
    expect(
      screen.getByRole("link", { name: /buy me a coffee/i }),
    ).toHaveAttribute("href", "https://buymeacoffee.com/heyyyjisu");
  });

  test("calls logout when it is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Log out" }));

    expect(deleteCookie).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
