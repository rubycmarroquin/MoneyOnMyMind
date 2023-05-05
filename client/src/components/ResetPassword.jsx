import { Button } from "react-bootstrap";
import { useContext } from "react";
import { SnackbarContext } from "../components/SnackbarContext";

const ResetButtonComp = ({ user_email }) => {
  const { open, handleOpen, handleClose } = useContext(SnackbarContext);

  async function resetPassword() {
    await fetch(
      `https://${
        import.meta.env.VITE_AUTH0_DOMAIN
      }/dbconnections/change_password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
          email: user_email,
          connection: import.meta.env.VITE_DB_CONNECTION,
        }),
      }
    ).then((response) => {
      handleOpen("Email sent successfully!");
      return response;
    });
  }

  return (
    <div id="ResetPasswordDiv">
      <h1>Change Password</h1>
      <Button
        type="button"
        variant="primary"
        id="ResetPasswordButton"
        onClick={resetPassword}
      >
        Send Reset Password Email
      </Button>
    </div>
  );
};

export default ResetButtonComp;
