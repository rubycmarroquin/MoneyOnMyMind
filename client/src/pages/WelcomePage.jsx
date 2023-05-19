import React, { useEffect } from "react";
import "../styles/WelcomePage.css";
import LoginButton from "../components/LoginButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import PigPicture from "../assets/Pig_WP.jpg";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div id="OuterWelcomePageDiv">
      <div id="InnerWelcomePageDiv">
        {!isAuthenticated ? (
          <>
            <div id="WelcomePageTextDiv">
              <div id="WelcomePageWelcomeText">
                <h1 id="WelcomeText">Welcome</h1>
              </div>
              <h3 id="WelcomePageTitle">Budget smarter, not harder.</h3>
              <p id="WelcomePageText">
                Money on My Mind is a budgeting app that helps users plan their
                budget, track expenses through charts and tables, and provides
                counseling through videos, text, and an in-app chatbot. The app
                is designed to help users take control of their finances and
                achieve their financial goals, with a user-friendly interface
                that is easy to navigate for both technical and non-technical
                users.
              </p>
              <div id="LoginButtonDiv">
                <LoginButton />
              </div>
            </div>
            <div id="PigDiv">
              <img id="PigWP" src={PigPicture} />
            </div>
          </>
        ) : (
          <h1>Is Authenticated, redirecting...</h1>
        )}
      </div>
    </div>
  );
}
