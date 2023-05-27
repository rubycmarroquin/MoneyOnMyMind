import { render, screen } from "@testing-library/react";
import * as auth0 from "@auth0/auth0-react";
import { AuthContext } from "../components/AuthContext";
import GenerateTables from "../components/GenTable";

// mock the auth context provider so that we can wrap it around and pass
// the authToken
const MockedAuthProvider = ({ children, authToken }) => (
  <AuthContext.Provider value={{ authToken }}>{children}</AuthContext.Provider>
);

vi.mock("@auth0/auth0-react");

test("Check to see GenerateTables is rendering.", () => {
  // mock auth token data
  const authToken = "abc123";
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "John", sub: "auth123.userid" },
  });

  render(
    <MockedAuthProvider authToken={authToken}>
      <GenerateTables expenses={[]} />
    </MockedAuthProvider>
  );

  const noSpending = screen.getByText("No Spendings to Show");
  expect(noSpending).toBeDefined();
});
