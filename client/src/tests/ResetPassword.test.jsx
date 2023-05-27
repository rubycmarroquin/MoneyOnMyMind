import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ResetPassword from "../components/ResetPassword";
import * as auth0 from "@auth0/auth0-react";
import { SnackbarContext } from "../components/SnackbarContext";

//Mock snackbar context
const MockedSnackbarProvider = ({ children, handleClose }) => (
  <SnackbarContext.Provider value={{ handleClose }}>
    {children}
  </SnackbarContext.Provider>
);

vi.mock("@auth0/auth0-react");

test("Checking to see if reset password button is rendering", () => {
  const handleClose = () => {};
  auth0.useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    user: { nickname: "Test" },
  });

  render(
    <MockedSnackbarProvider handleClose={handleClose}>
      <ResetPassword />
    </MockedSnackbarProvider>
  );

  // check to see if the button exists
  const logoutButton = screen.getByRole("button");
  expect(logoutButton).toBeDefined();

  // check to see if the button text matches
  const resetText = screen.getByText("Send Reset Password Email");
  expect(resetText).toBeDefined();
});
