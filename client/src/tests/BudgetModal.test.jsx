import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import BudgetModal from "../components/BudgetModal";
import * as auth0 from "@auth0/auth0-react";

vi.mock("@auth0/auth0-react");

test("Checking if Budget Modal Button renders", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "Test" },
  });
  render(
    <Router>
      <BudgetModal />
    </Router>
  );
  // check to see if the button exists
  const openModalButton = screen.getByRole("button");
  expect(openModalButton).toBeDefined();
});
