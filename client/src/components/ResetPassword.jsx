import { Button } from "react-bootstrap";
import { useContext } from "react";
import { SnackbarContext } from "../components/SnackbarContext";

const ResetButtonComp = ({ user_email }) => {
  const { open, handleOpen, handleClose } = useContext(SnackbarContext);

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
