import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import * as auth0 from "@auth0/auth0-react";

vi.mock("@auth0/auth0-react");

test("Checking to see if login button is there", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "Test" },
  });
  render(
    <Router>
      <LoginButton />
    </Router>
  );
  // check to see if the button exists
  const loginButton = screen.getByRole("button");
  expect(loginButton).toBeDefined();
});
