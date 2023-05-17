import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import WelcomePage from "../pages/WelcomePage";
import * as auth0 from "@auth0/auth0-react";

vi.mock("@auth0/auth0-react");

test("Welcome Page renders correctly", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: false,
    user: { nickname: "Test" },
  });
  render(<WelcomePage />);
  const welcomePageText = screen.getByText("Budget smarter, not harder.");
  expect(welcomePageText).toBeDefined();
});

test("WelcomePage when user is signed in", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "Test" },
  });
  render(<WelcomePage />);
  const welcomePageText = screen.getByText("Is Authenticated, redirecting...");
  expect(welcomePageText).toBeDefined();
});
