import React from "react";
import "../styles/WelcomePage.css";
import LoginButton from "../components/LoginButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import PigPicture from "../assets/Pig_WP.jpg";

export default function WelcomePage() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    window.location.href = "http://localhost:5173/dashboard";
  }

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
                Welcome to Money on My Mind. A budgeting application, where
                managing your finances has never been easier. Money on My Mind
                is designed to help you take control of your money and achieve
                your financial goals. With our user-friendly interface and
                customizable features, you can easily create budgets, track your
                expenses, and monitor your savings all in one place. Whether
                you're looking to pay off debt, save for a big purchase, or
                simply improve your overall financial health, Money on My Mind
                is here to help. Thank you for choosing our budgeting app. We're
                excited to help you take control of your finances and reach your
                financial goals.
              </p>
              <div id="LoginButtonDiv">
                <LoginButton />
              </div>
            </div>
            <div id="PigDiv">
              <img id="PigWP" src={PigPicture} />
            </div>{" "}
          </>
        ) : null}
      </div>
    </div>
  );
}
