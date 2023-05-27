import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import * as auth0 from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import YearMonthDropDown from "../components/YearMonthDropDown";

vi.mock("@auth0/auth0-react");

test("Checks to see if the drop down is rendering", () => {
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "JohnDoe", given_name: "John" },
  });

  // mock expense data
  const month = undefined;
  const year = undefined;

  render(
    <Router>
      <YearMonthDropDown year={year} month={month} />
    </Router>
  );
  const monthDropDown = screen.getByText("Select Month");
  expect(monthDropDown).toBeDefined();

  const yearDropDown = screen.getByText("Select Year");
  expect(yearDropDown).toBeDefined();
});
