import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  //A function to handle the post request
  async function insertUserToDB() {
    const userObj = { user_id: user.sub, email: user.email };
    await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    insertUserToDB(user);
  }, []);

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
