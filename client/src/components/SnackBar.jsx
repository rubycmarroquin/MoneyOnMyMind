import { Snackbar } from "@mui/material";

const SnackbarComp = ({ message }) => {
  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>;
};

export default SnackbarComp;
