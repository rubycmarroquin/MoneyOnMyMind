import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      id="Logout"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <FontAwesomeIcon icon={faSignOut} /> Log Out
    </button>
  );
};

export default LogoutButton;
