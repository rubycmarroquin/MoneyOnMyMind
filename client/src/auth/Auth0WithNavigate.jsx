import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../components/AuthContext";

const Auth0WithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <AuthProvider>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: "openid profile email",
          redirect_uri: window.location.origin,
        }}
        cacheLocation="localstorage"
        onRedirectCallback={onRedirectCallback}
      >
        {children}
      </Auth0Provider>
    </AuthProvider>
  );
};

export default Auth0WithNavigate;
