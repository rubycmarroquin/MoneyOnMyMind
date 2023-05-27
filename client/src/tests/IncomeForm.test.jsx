import { render, screen } from "@testing-library/react";
import * as auth0 from "@auth0/auth0-react";
import IncomeForm from "../components/IncomeForm";
import { AuthContext } from "../components/AuthContext";

// mock the auth context provider so that we can wrap it around BudgetForm and pass
// the authToken
const MockedAuthProvider = ({ children, authToken }) => (
  <AuthContext.Provider value={{ authToken }}>{children}</AuthContext.Provider>
);

vi.mock("@auth0/auth0-react");

test("Checking if income form is rendering", () => {
  // mock auth token data
  const authToken = "abc123";
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "John", sub: "auth123.userid" },
  });

  render(
    <MockedAuthProvider authToken={authToken}>
      <IncomeForm />
    </MockedAuthProvider>
  );
});
