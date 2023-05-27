import { render, screen } from "@testing-library/react";
import * as auth0 from "@auth0/auth0-react";
import { AuthContext } from "../components/AuthContext";
import FinancialPageSection from "../components/FinancialPageSection";

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
      <FinancialPageSection
        title={"Financial"}
        subtitle={"This is a test"}
        content={"This is another test"}
        videoType={""}
      />
    </MockedAuthProvider>
  );

  // check to see if the mock title is rendering
  const title = screen.getByText("Financial");
  expect(title).toBeDefined();

  // check to see if the mock subtitle is rendering
  const subtitle = screen.getByText("This is a test");
  expect(subtitle).toBeDefined();

  // check to see if the mock content is rendering
  const content = screen.getByText("This is another test");
  expect(content).toBeDefined();
});
