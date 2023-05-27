import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import * as auth0 from "@auth0/auth0-react";

vi.mock("@auth0/auth0-react");

test("Checking to see if logout button is there", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "Test" },
  });
  render(
    <Router>
      <LogoutButton />
    </Router>
  );
  // check to see if the button exists
  const logoutButton = screen.getByRole("button");
  expect(logoutButton).toBeDefined();
});
