import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button id="LoginButton" onClick={() => loginWithRedirect()}>
      Get Started <FontAwesomeIcon icon={faSignIn} />
    </button>
  );
};

export default LoginButton;
