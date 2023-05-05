import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const value = {
    authToken,
    setAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
