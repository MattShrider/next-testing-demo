import Home from "@/pages/index";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(Home, () => {
  it("renders with a default count", async () => {
    render(<Home />);
    expect(screen.getByText("Your count is 0")).toBeInTheDocument();
  });

  it("increments", async () => {
    render(<Home />);
    const button = screen.getByRole("button");
    expect(screen.getByText("Your count is 0")).toBeInTheDocument();
    await userEvent.click(button);
    expect(screen.getByText("Your count is 1")).toBeInTheDocument();
  });
});
