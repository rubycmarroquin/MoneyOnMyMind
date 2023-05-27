import { render, screen } from "@testing-library/react";
import * as auth0 from "@auth0/auth0-react";
import { AuthContext } from "../components/AuthContext";
import YouTubeVideos from "../components/YouTubeVideos";
import { setupServer } from "msw/node";
import { rest, RESTMethods } from "msw";

// rest is a namespace from the MSW library that contains
// methods for mocking REST API data (get, post...)

// ctx helps to set a status code (200 in our case for a success)

// error: fetch not being found, had to create mock proxy
// reference: https://github.com/mswjs/msw/discussions/887

// Create a custom method to generate
// the same request handler for all REST API methods.

/**
 * utility function that aids in creating a request handler for
 * mocking rest api
 * @param {string} url - url path for request handlers; api endpoint
 * @param {function} resolver - function that determines the response
 * send back
 * @returns an array of request handlers
 */
function createProxy(url, resolver) {
  return Object.values(RESTMethods).map((method) => {
    return rest[method.toLowerCase()](`${url}`, resolver);
  });
}

const handlers = [
  ...createProxy(`/api/videos/:keyword`, async (req, res, ctx) => {
    // video type data
    const { keyword } = req.params;
    console.log(keyword);
    // mock video data
    const mockVideoData = [
      {
        id: { videoId: "1" },
        snippet: { title: "Video 1", description: "Description 1" },
      },
      {
        id: { videoId: "2" },
        snippet: { title: "Video 2", description: "Description 2" },
      },
    ];
    // send 200 success response and mock data
    return res(ctx.status(200), ctx.json(mockVideoData));
  }),
];

const server = setupServer(...handlers);

// start msw server before running tests to ensure mock server
// is up and running
beforeAll(() => {
  console.log("Mock server starting...");
  server.listen();
});

// // closes the msw server after running tests
// // helps avoid conflicts or interferences
afterAll(() => {
  console.log("Mock server closing...");
  server.close();
});

// mock the auth context provider so that we can wrap it around BudgetForm and pass
// the authToken
const MockedAuthProvider = ({ children, authToken }) => (
  <AuthContext.Provider value={{ authToken }}>{children}</AuthContext.Provider>
);

vi.mock("@auth0/auth0-react");

test("YouTubeVideos component loads and renders videos", async () => {
  // mock auth token data
  const authToken = "abc123";
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "John", sub: "auth123.userid" },
  });

  <MockedAuthProvider authToken={authToken}>
    <YouTubeVideos videoType={"hello"} />
  </MockedAuthProvider>;

  screen.debug(undefined, Infinity);
});
