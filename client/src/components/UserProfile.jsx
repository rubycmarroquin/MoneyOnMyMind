import React, { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "./AuthContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { authToken } = useContext(AuthContext);

  //A function to handle the post request
  async function insertUserToDB() {
    const userObj = { user_id: user.sub, email: user.email };
    await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        console.log("Response from post method ", response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  useEffect(() => {
    if (authToken) insertUserToDB();
  }, [authToken]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>Welcome, {user.name}!</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
