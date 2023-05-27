import { render, screen } from "@testing-library/react";
import * as auth0 from "@auth0/auth0-react";
import { AuthContext } from "../components/AuthContext";
import GenerateCharts from "../components/GenerateCharts";

// mock the auth context provider so that we can wrap it around and pass
// the authToken
const MockedAuthProvider = ({ children, authToken }) => (
  <AuthContext.Provider value={{ authToken }}>{children}</AuthContext.Provider>
);

vi.mock("@auth0/auth0-react");

test("Check to see charts are rendering.", () => {
  // mock auth token data
  const authToken = "abc123";
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "John", sub: "auth123.userid" },
  });

  render(
    <MockedAuthProvider authToken={authToken}>
      <GenerateCharts month={null} year={null} />
    </MockedAuthProvider>
  );

  const nonDataToShowText = screen.getByText("Nothing to Show");
  expect(nonDataToShowText).toBeDefined();

  const monthDropDown = screen.getByText("Select Month");
  expect(monthDropDown).toBeDefined();

  const yearDropDown = screen.getByText("Select Year");
  expect(yearDropDown).toBeDefined();
});

test("Check to see if drop downs are rendering.", () => {
  // mock auth token data
  const authToken = "abc123";
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "John", sub: "auth123.userid" },
  });

  render(
    <MockedAuthProvider authToken={authToken}>
      <GenerateCharts month={null} year={null} />
    </MockedAuthProvider>
  );

  const monthDropDown = screen.getByText("Select Month");
  expect(monthDropDown).toBeDefined();

  const yearDropDown = screen.getByText("Select Year");
  expect(yearDropDown).toBeDefined();
});
