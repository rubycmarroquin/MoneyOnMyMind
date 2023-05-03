import React from "react";
import { Snackbar } from "@mui/material";
import { useState } from "react";

export const SnackbarContext = React.createContext();
export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("PUT_MESSAGE_HERE");

  const handleOpen = (message) => {
    setMessage(message);
    setOpen(true);
  };
  const handleClose = () => {
    setMessage("");
    setOpen(false);
  };

  const value = {
    open,
    handleOpen,
    handleClose,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={undefined}
      />
    </SnackbarContext.Provider>
  );
};
