import { BackendDaoMock } from "@/dao/BackendDao/BackendDaoMock";
import { ResourcePageImplemenation } from "./page";
import { screen, render } from "@testing-library/react";

// This is an example of using dependency injection to pass in a mock
// implementation of a data accessor.
//
// By following this pattern, you do not have to mock the network
// or use jest mocks.
describe(ResourcePageImplemenation, () => {
  it("renders", async () => {
    const backendDao = new BackendDaoMock();
    render(await ResourcePageImplemenation({ backendDao }));
    expect(await screen.findByText("Go to one")).toBeInTheDocument();
  });
});
