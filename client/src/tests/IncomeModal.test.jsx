import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import IncomeModal from "../components/IncomeModal";
import * as auth0 from "@auth0/auth0-react";

vi.mock("@auth0/auth0-react");

test("Checking if Income Modal Button renders", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "Test" },
  });
  render(
    <Router>
      <IncomeModal />
    </Router>
  );
  // check to see if the button exists
  const openModalButton = screen.getByRole("button");
  expect(openModalButton).toBeDefined();
});
