import { Incrementor } from "./Incrementor";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(Incrementor, () => {
  it("increments when you click it!", async () => {
    const click = jest.fn();
    render(<Incrementor onIncrement={() => click()} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(click).toHaveBeenCalledTimes(1);
    await userEvent.click(button);
    expect(click).toHaveBeenCalledTimes(2);
  });
});
