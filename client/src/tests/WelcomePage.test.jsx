import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import * as auth0 from "@auth0/auth0-react";

vi.mock("@auth0/auth0-react");

test("Welcome Page renders correctly when user not signed in", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: false,
    user: { nickname: "Test" },
  });
  render(
    <Router>
      <WelcomePage />
    </Router>
  );
  const welcomePageText = screen.getByText("Welcome");
  expect(welcomePageText).toBeDefined();
});

test("WelcomePage redirect text when user is signed in", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "Test" },
  });
  render(
    <Router>
      <WelcomePage />
    </Router>
  );
  const welcomePageText = screen.getByText("Is Authenticated, redirecting...");
  expect(welcomePageText).toBeDefined();
});
