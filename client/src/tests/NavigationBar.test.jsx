import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import * as auth0 from "@auth0/auth0-react";
import NavigationBar from "../components/NavigationBar";
import { BrowserRouter as Router } from "react-router-dom";

vi.mock("@auth0/auth0-react");

test("Navigation Bar", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "John" },
  });
  render(
    <Router>
      <NavigationBar />
    </Router>
  );
  const projectName = screen.getByText("Money on My Mind");
  expect(projectName).toBeDefined();
});

test("Check to see if Dashboard link rendering", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "JohnDoe", given_name: "John" },
  });
  render(
    <Router>
      <NavigationBar />
    </Router>
  );
  const dashboard = screen.getByText("Dashboard");
  expect(dashboard).toBeDefined();
});

test("Check to see if Budgets link is rendering", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "JohnDoe", given_name: "John" },
  });
  render(
    <Router>
      <NavigationBar />
    </Router>
  );
  const budget = screen.getByText("Budgets");
  expect(budget).toBeDefined();
});

test("Checks to see if the drop down options are rendering", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "JohnDoe", given_name: "John" },
  });
  render(
    <Router>
      <NavigationBar />
    </Router>
  );
  const dropDown = screen.getByText("More Options");
  expect(dropDown).toBeDefined();
  fireEvent.click(dropDown);
  const financial = screen.getByText("Financial Literacy");
  expect(financial).toBeDefined();
  const account = screen.getByText("Account Settings");
  expect(account).toBeDefined();
});
