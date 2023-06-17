import ApiRoute, {
  MyResponse,
  SomeApiResponse,
  MY_URL,
  MY_SECOND_URL,
} from "@/pages/api/an-endpoint";
import { createMocks } from "node-mocks-http";
import { server, rest, HttpResponse } from "@/mocks/server";
import url from "node:url";

describe("TestApiRoute", () => {
  it("should get data", async () => {
    const testId = "1";
    const mockMetadata: SomeApiResponse = { foo: "metadata_response" };
    const mockMetadataTwo: SomeApiResponse = { foo: "two_metadata_response" };
    const mockApi = {
      id: "one",
      label: "one",
    };

    const headersSpy = jest.fn();
    const searchParamsSpy = jest.fn();
    const pathParamsSpy = jest.fn();

    // This is a MSW2.0 server handler that is scoped to this test.
    // In general this pattern is preferred over setting up global
    // mocks, as the mocks are co-located with the test files, and
    // so keeping these up to date is simpler and more likely.
    // See https://github.com/mswjs/msw/blob/feat/standard-api/MIGRATING.md
    server.use(
      rest.post(MY_URL, ({ request }) => {
        // If we want to check a header, request headers.entries returns
        // an iterator, so to actually make it a collection we spread
        // the iterator into an array with the spread operator `...`
        headersSpy(...request.headers.entries());
        return HttpResponse.json(mockApi);
      }),
      rest.get(MY_SECOND_URL, ({ request }) => {
        // We can assert that our file is sending the correct
        // request body or params by passing in request details from
        // the handler to a jest spy that we check later.
        const parsed = url.parse(request.url, true);
        searchParamsSpy(parsed.query);

        return HttpResponse.json(mockMetadata);
      }),
      rest.get(`${MY_SECOND_URL}/:id`, ({ params }) => {
        // MSW2.0
        pathParamsSpy(params.id);

        return HttpResponse.json(mockMetadataTwo);
      })
    );

    // If you're running into problems figuring out
    // why a request isn't being handled. It can be handy to print
    // the active handlers.
    // server.printHandlers();

    // This package may not be required anymore, but makes it simple
    // to test that a response has been written to with synchronous
    // calls.
    // See https://github.com/eugef/node-mocks-http
    const { req, res } = createMocks({
      method: "GET",
      cookies: { bearer: "1234" },
      query: { id: testId },
    });

    // Express-style responses are driven by side-effects on the response
    // body. This returns a void promise, so you can't directly
    // expect a result on it. You have to inspect the response object
    // that we pass into it has been written to.
    await ApiRoute(req, res);

    // Earlier in our request handlers in MSW, we called these with
    // various arguments. These spy tests would be useful to make sure
    // that given a certain request from a user, we make a certain request
    // out to third party APIs during the response.
    expect(headersSpy).toHaveBeenCalledWith(["authorization", "bearer 1234"]);
    expect(searchParamsSpy).toHaveBeenCalledWith({ id: testId });
    expect(pathParamsSpy).toHaveBeenCalledWith(testId);

    // Here we're using a method provided by the node-mocks-http package
    // to read the data off the response stream, and to parse it
    // as JSON. You can do this natively but it is more of a chore.
    expect(res._getJSONData()).toEqual<MyResponse>({
      id: mockApi.id,
      label: mockApi.label,
      metadata: mockMetadata.foo,
      metadataTwo: mockMetadataTwo.foo,
    });
  });
});
