import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import * as auth0 from "@auth0/auth0-react";
import NavigationBar from "../components/NavigationBar";

vi.mock("@auth0/auth0-react");

test("Navigation Bar", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "JohnDoe", given_name: "John" },
  });
  render(<NavigationBar />);
  const projectName = screen.getByText("Money on My Mind");
  expect(projectName).toBeDefined();
});

test("Check to see if Dashboard link rendering", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "JohnDoe", given_name: "John" },
  });
  render(<NavigationBar />);
  const dashboard = screen.getByText("Dashboard");
  expect(dashboard).toBeDefined();
});

test("Check to see if Budgets link is rendering", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "JohnDoe", given_name: "John" },
  });
  render(<NavigationBar />);
  const budget = screen.getByText("Budgets");
  expect(budget).toBeDefined();
});

test("Checks to see if the drop down renders", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "JohnDoe", given_name: "John" },
  });
  render(<NavigationBar />);
  const dropDown = screen.getByText("More Options");
  expect(dropDown).toBeDefined();
  dropDown.click();
  // screen.debug(undefined, Infinity); // shows you the DOM of the component
  // const financial = screen.getByText("Financial Literacy");
  // expect(financial).toBeDefined();
  // const settings = screen.getByText("Account Settings");
  // expect(settings).toBeDefined();
});
