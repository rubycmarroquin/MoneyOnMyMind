import React, { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "./AuthContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { authToken } = useContext(AuthContext);

  //A function to handle the post request
  async function insertUserToDB() {
    const userObj = { user_id: user.sub, email: user.email };
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  useEffect(() => {
    if (authToken) insertUserToDB();
  }, [authToken]);

  if (isLoading) {
    return <div className="loader">Loading ...</div>;
  }

  return isAuthenticated && <div id="UserInfo"></div>;
};

export default Profile;
