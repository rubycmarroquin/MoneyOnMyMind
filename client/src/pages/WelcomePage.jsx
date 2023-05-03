import React from "react";
import LoginButton from "../components/LoginButton.jsx";

export default function WelcomePage() {
  return (
    <div id="WelcomePageOuterDiv">
      <h1 id="WelcomePageWelcomeText">WELCOME</h1>
      <h2 id="WelcomePageTitle">Money on My Mind</h2>
      <p id="WelcomePageText">
        Welcome to our budgeting application, where managing your finances has
        never been easier. Our app is designed to help you take control of your
        money and achieve your financial goals. With our user-friendly interface
        and customizable features, you can easily create budgets, track your
        expenses, and monitor your savings all in one place. Whether you're
        looking to pay off debt, save for a big purchase, or simply improve your
        overall financial health, we're here to help. Thank you for choosing our
        budgeting app. We're excited to help you take control of your finances
        and reach your financial goals.
      </p>
      <LoginButton />
    </div>
  );
}
