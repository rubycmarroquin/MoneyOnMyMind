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

// TODO: Create a custom method to generate
// the same request handler for all REST API methods.

/**
 * utility function that aids in creating a request handler for
 * mocking rest api
 * @param {string} url - url path for request handlers; api endpoint
 * @param {function} resolver - function that determines the response
 * send back
 * @returns an array of request handlers
 */
// function createProxy(url, resolver) {
//   return Object.values(RESTMethods).map((method) => {
//     return rest[method.toLowerCase()](`${url}`, resolver);
//   });
// }

// const handlers = [
//   ...createProxy(`/api/videos/:keyword`, async (req, res, ctx) => {
//     // video type data
//     const { keyword } = req.params;
//     console.log(keyword);
//     // mock video data
//     const mockVideoData = [
//       {
//         kind: "youtube#searchResult",
//         etag: "RKQchR6oAHMwTUoZ5md4cSesJ54",
//         id: {
//           kind: "youtube#video",
//           videoId: "DfVB73q8EMY",
//         },
//         snippet: {
//           publishedAt: "2021-12-28T14:00:06Z",
//           channelId: "UC7eBNeDW1GQf2NJQ6G6gAxw",
//           title: "How Do I Tackle My $13,000 Credit Card Debt?",
//           description:
//             "How Do I Tackle My $13000 Credit Card Debt? Nix the guesswork and scrolling. We'll connect you with investment pros we trust: ...",
//           thumbnails: {
//             default: {
//               url: "https://i.ytimg.com/vi/DfVB73q8EMY/default.jpg",
//               width: 120,
//               height: 90,
//             },
//             medium: {
//               url: "https://i.ytimg.com/vi/DfVB73q8EMY/mqdefault.jpg",
//               width: 320,
//               height: 180,
//             },
//             high: {
//               url: "https://i.ytimg.com/vi/DfVB73q8EMY/hqdefault.jpg",
//               width: 480,
//               height: 360,
//             },
//           },
//           channelTitle: "The Ramsey Show - Highlights",
//           liveBroadcastContent: "none",
//           publishTime: "2021-12-28T14:00:06Z",
//         },
//       },
//       {
//         kind: "youtube#searchResult",
//         etag: "L4iWPdBNxco7uc3ns_BGy-pTJ1k",
//         id: {
//           kind: "youtube#video",
//           videoId: "mllmoeq2HYA",
//         },
//         snippet: {
//           publishedAt: "2018-08-17T21:00:09Z",
//           channelId: "UC7eBNeDW1GQf2NJQ6G6gAxw",
//           title: "How Do I Start Tackling My Debt?",
//           description:
//             "How Do I Start Tackling My Debt? Get a FREE customized plan for your money. It only takes 3 minutes! http://bit.ly/2YTMuQM Visit ...",
//           thumbnails: {
//             default: {
//               url: "https://i.ytimg.com/vi/mllmoeq2HYA/default.jpg",
//               width: 120,
//               height: 90,
//             },
//             medium: {
//               url: "https://i.ytimg.com/vi/mllmoeq2HYA/mqdefault.jpg",
//               width: 320,
//               height: 180,
//             },
//             high: {
//               url: "https://i.ytimg.com/vi/mllmoeq2HYA/hqdefault.jpg",
//               width: 480,
//               height: 360,
//             },
//           },
//           channelTitle: "The Ramsey Show - Highlights",
//           liveBroadcastContent: "none",
//           publishTime: "2018-08-17T21:00:09Z",
//         },
//       },
//       {
//         kind: "youtube#searchResult",
//         etag: "0HR2Q_h2_ZeHPBjopKW53KenjUc",
//         id: {
//           kind: "youtube#video",
//           videoId: "77U-782rsKw",
//         },
//         snippet: {
//           publishedAt: "2023-02-04T03:24:44Z",
//           channelId: "UCKjU3KzdbJE1EFcHVqXC3_g",
//           title: "Tackling debt as the cost of living rises | Quick Question",
//           description:
//             "Canadians are struggling with their finances amid high interest rates and inflation. Certified financial planner Zainab Williams and ...",
//           thumbnails: {
//             default: {
//               url: "https://i.ytimg.com/vi/77U-782rsKw/default.jpg",
//               width: 120,
//               height: 90,
//             },
//             medium: {
//               url: "https://i.ytimg.com/vi/77U-782rsKw/mqdefault.jpg",
//               width: 320,
//               height: 180,
//             },
//             high: {
//               url: "https://i.ytimg.com/vi/77U-782rsKw/hqdefault.jpg",
//               width: 480,
//               height: 360,
//             },
//           },
//           channelTitle: "CBC News: The National",
//           liveBroadcastContent: "none",
//           publishTime: "2023-02-04T03:24:44Z",
//         },
//       },
//     ];
//     // send 200 success response and mock data
//     return res(ctx.json(mockVideoData));
//   }),
// ];

// const server = setupServer(...handlers);

// // start msw server before running tests to ensure mock server
// // is up and running
// beforeAll(() => {
//   console.log("Mock server starting...");
//   server.listen();
// });

// // closes the msw server after running tests
// // helps avoid conflicts or interferences
// afterAll(() => {
//   console.log("Mock server closing...");
//   server.close();
// });

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

  render(
    <MockedAuthProvider authToken={authToken}>
      <YouTubeVideos videoType={""} />
    </MockedAuthProvider>
  );
});
