<h1 align="center">
  <br>
<img src="https://github.com/rubycmarroquin/MoneyOnMyMind/blob/master/client/src/assets/Pig_Removed.png?raw=true" alt="MoMMLogo" width="200">
  <br>
  Money on My Mind
  <br>
</h1>

[![Contributors][contributors-shield]][contributors-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="api-reference">API Reference</a></li>
      </ul>
    </li>
        <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="./client/src/assets/WelcomePage.png" />

As someone who is low income and has watched people spiral into debt, I have seen many people around me have trouble with managing their finances, which has led them into overspending, debt buildup, and difficulty saving for long-term goals and retirement. In order to stop this cycle, I want to build an informative, free application that helps people plan their budgets to make informed financial decisions and achieve financial stability.

Here's why:

- Money on My Mind has a user-friendly interface to make it easy for technical and non-technical people to use.
- Expense and income tracking is offered so that you can view your finances as a table or as a chart if you like visuals.
- Provide an informative, financial literacy tab with an in-app chat bot that you can ask for financial advice.
- Get a Google Calendar invite for upcoming expenses with due dates so that you don't forget!

### Built With

- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- [![React][React.js]][React-url]
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- [![Bootstrap][Bootstrap.com]][Bootstrap-url]
- ![Semantic UI React](https://img.shields.io/badge/Semantic%20UI%20React-%2335BDB2.svg?style=for-the-badge&logo=SemanticUIReact&logoColor=white)
- ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

<!-- API Reference -->

## API Reference

- [Google Calendar API](https://developers.google.com/calendar/api/guides/overview)
- [OpenAI GPT-3 3 API](https://platform.openai.com/docs/api-reference)
- [YouTube API](https://developers.google.com/youtube/v3)

<!-- Installation -->

## Installation

**This project requires Auth0! Please visit [Auth0](https://auth0.com/) to make an account and retrieve a domain and clientid. See .env.example for set up!**

Step 1: Go to your terminal: clone the project and switch into the project directory.

```bash
  git clone https://github.com/rubycmarroquin/MoneyOnMyMind.git
  cd moneyonmymind
```

Step 2: Install all packages.

```bash
  cd client && npm install && cd ../server && npm install
```

Step 3: Setup Environment Variables

- Copy the instructions from both .env.example files in the client and server.

Step 4: Connect the database and the data.

```bash
  cd server
  psql moneyonmymind -f db.sql
```

Step 5: Start the program!

```bash
  cd server && npm run dev
```

<!-- USAGE EXAMPLES -->

## Usage

TBA

## Roadmap

- [x] Create Dashboard
  - [x] Display a summary of user spending using Google Charts React Library
    - [x] Current month uses Donut Chart
    - [x] Year overview using Combo Chart
  - [x] Display a table of the expenses
  - [x] Allow the user to switch between months and years
- [x] Create Budget Page
  - [x] Let users add, modify and delete income items
  - [x] Let users add, modify and expense income items
  - [x] Allow users to select each month and year they want to add to
  - [x] Button that allows users to receive a google calendar invite for expenses with upcoming due dates.
    - [x] Generate calendar invite using Google Calendar API
- [x] Create Account Settings Page
  - [x] Reset password email
  - [x] Form for user's name and phone number
- [x] Financial Literacy Page
  - [x] Display financial videos using YouTube API
  - [ ] In-app chat bot based with scope to finance using OpenAI API

<!-- CONTRIBUTING -->

## Contributing

In case you have a suggestion to improve the project, you can either fork the repository and initiate a pull request or raise an issue labeled as "enhancement".

<!-- CONTACT -->

## Contact

Project Link: [Money on My Mind](https://github.com/rubycmarroquin/MoneyOnMyMind)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Img Shields](https://shields.io)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)
<p align="right">(<a href="#about-the-project">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/badge/Contributors-1-brightgreen?style=for-the-badge&logo=appveyor
[contributors-url]: https://github.com/rubycmarroquin/MoneyOnMyMind/graphs/contributors
[linkedin-shield]: https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/rubymarroquin/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
