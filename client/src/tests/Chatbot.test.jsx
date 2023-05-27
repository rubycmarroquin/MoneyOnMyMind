import { render, screen } from "@testing-library/react";
import * as auth0 from "@auth0/auth0-react";
import Chatbot from "../components/Chatbot";
import { AuthContext } from "../components/AuthContext";

// mock the auth context provider so that we can wrap it around BudgetForm and pass
// the authToken
const MockedAuthProvider = ({ children, authToken }) => (
  <AuthContext.Provider value={{ authToken }}>{children}</AuthContext.Provider>
);

vi.mock("@auth0/auth0-react");

test("Check to see if money mentor button is rendering", () => {
  // mock auth token data
  const authToken = "abc123";
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "John", sub: "auth123.userid" },
  });

  render(
    <MockedAuthProvider authToken={authToken}>
      <Chatbot />
    </MockedAuthProvider>
  );
});

test("Checking to see if the money mentor button text is present", () => {
  // mock auth token data
  const authToken = "abc123";
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "Test" },
  });

  render(
    <MockedAuthProvider authToken={authToken}>
      <Chatbot />
    </MockedAuthProvider>
  );

  // check to see if the button exists
  const moneyMentor = screen.getByRole("button");
  expect(moneyMentor).toBeDefined();

  // check to see if the button text matches
  const openText = screen.getByText("Open Money Mentor");
  expect(openText).toBeDefined();
});
