import React from "react";
import LoginButton from "../components/LoginButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import PigPicture from "../assets/Pig_Removed.png";

export default function WelcomePage() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    window.location.href = "http://localhost:5173/dashboard";
  }

  return (
    <div id="WelcomePageOuterDiv">
      <div id="WelcomePageInnerDiv">
        <div>
          <img id="Pig" src={PigPicture} />
        </div>
        {!isAuthenticated ? (
          <div id="WelcomeOuter">
            <h1 id="WelcomePageWelcomeText">WELCOME</h1>
            <h2 id="WelcomePageTitle">Money on My Mind</h2>
            <p id="WelcomePageText">
              Welcome to our budgeting application, where managing your finances
              has never been easier. Our app is designed to help you take
              control of your money and achieve your financial goals. With our
              user-friendly interface and customizable features, you can easily
              create budgets, track your expenses, and monitor your savings all
              in one place. Whether you're looking to pay off debt, save for a
              big purchase, or simply improve your overall financial health,
              we're here to help. Thank you for choosing our budgeting app.
              We're excited to help you take control of your finances and reach
              your financial goals.
            </p>
            <LoginButton />
          </div>
        ) : (
          <h2 id="RedirectWelcome">Redirecting... </h2>
        )}
      </div>
    </div>
  );
}
