import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import * as auth0 from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import TagsDropDown from "../components/TagsDropDown";

vi.mock("@auth0/auth0-react");

test("Checks to see if the drop down is rendering", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "JohnDoe", given_name: "John" },
  });

  // mock expense data
  const expense = {
    tags: undefined,
  };

  render(
    <Router>
      <TagsDropDown expense={expense} />
    </Router>
  );
  const dropDown = screen.getByText("Select Type of Expense");
  expect(dropDown).toBeDefined();
});

test("Checks to see if the drop down options are rendering", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "JohnDoe", given_name: "John" },
  });

  // mock expense data
  const expense = {
    tags: undefined,
  };

  render(
    <Router>
      <TagsDropDown expense={expense} />
    </Router>
  );
  const dropDown = screen.getByText("Select Type of Expense");
  expect(dropDown).toBeDefined();
  fireEvent.click(dropDown);
  const housingOption = screen.getByText("Housing");
  expect(housingOption).toBeDefined();
});
