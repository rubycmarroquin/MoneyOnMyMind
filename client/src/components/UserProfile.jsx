import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  /**
   * email: "rcmarroq21@gmail.com"
   * email_verified: true
   * family_name: "Marroquin"
   * given_name: "Ruby"
   * locale: "en"
   * name: "Ruby Marroquin"
   * nickname: "rcmarroq21"
   * picture: "https://lh3.googleusercontent.com/a/AGNmyxaCq-oIomOPO2zUvYlFNI6NwbcCr8Mn8Aw0OuWF=s96-c"
   * sub: "google-oauth2|112724273959108935115"
   * updated_at: "2023-05-02T00:53:11.965Z"
   */

  /**
   * TODO:
   * 1. login, user has "sub" property, this is their auth0 user_id
   * 2. take this user_id, and check if there's an entry in the db under user table
   *  2a. if exist, fetch user data
   *  2b. if doesn't exist, "register" user (i.e. copy whatever info you want from auth0)
   */

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

  // const [expenses, setExpenses] = useState(null);

  // async function loadExpenses(userInfo) {
  //   // fetch the data from the backend
  //   const response = await fetch(`http://localhost:8080/user/${userInfo.sub}`);
  //   if (response === undefined) setExpenses([]);
  //   else {
  //     const json = await response.json();
  //     setExpenses(json);
  //   }
  // }

  useEffect(() => {
    insertUserToDB(user);
    // loadExpenses(user);
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
