const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { randomUUID } = require("crypto");
const path = require("path");
const db = require("./db/db-connection.js");
const Calendar = require("./calendar.js")

//auth0 jwt
const { auth } = require("express-oauth2-jwt-bearer");

const app = express();

const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;


function jwtCheck(req, res, next) {

    //ignore jwt check for these paths
    if (req.path === "/") return next();

    const handler = auth({
      audience: "https://money-on-my-mind/api",
      issuerBaseURL: "https://dev-xy4didc5bijpholc.us.auth0.com/",
      tokenSigningAlg: "RS256",
    });
    return handler(req, res, next);
}

//JWT middleware

app.use(cors());
app.use(express.json());
app.use(jwtCheck);

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  // res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
  res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

/***************************************************************************************************
 ***************************************** USER API CALLS ******************************************
 ***************************************************************************************************/

// create the get request for students in the endpoint '/api/students'
app.get("/api/user/:userId", cors(), async (req, res) => {
  const user_id = req.params.userId;
  try {
    const { rows: users } = await db.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    res.send(users.length > 0 ? users[0] : {});
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// creates new entry for user, else does nothing
app.post("/api/user", cors(), async (req, res) => {
  console.log(req.body.user_id, req.body.email);
  try {
    const newUser = {
      user_id: req.body.user_id,
      email: req.body.email,
    };
    const result = await db.query(
      "INSERT INTO users(user_id, email) VALUES($1, $2) ON CONFLICT DO NOTHING RETURNING*",
      [newUser.user_id, newUser.email]
    );
    console.log("result.rows[0]: ", result.rows[0]);
    // if value is undefined, set value to {}
    res.json(result.rows[0] ?? {});
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// update a user's info
app.put("/api/user/:userId", cors(), async (req, res) => {
  const user_id = req.params.userId;
  const updatedUser = {
    name: req.body.name,
    phone: req.body.phone,
  };
  console.log("Updated User - Server: ", updatedUser);
  try {
    const updated = await db.query(
      `update users set name=$1, phone=$2 where user_id=$3 RETURNING *`,
      [updatedUser.name, updatedUser.phone, user_id]
    );
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

/***************************************************************************************************
 **************************************** EXPENSE API CALLS ****************************************
 ***************************************************************************************************/

// grab data by user id and month and year
app.get("/api/expenses/:userId&:monthName&:yearNum", cors(), async (req, res) => {
  const user_id = req.params.userId;
  const monthName = req.params.monthName;
  const yearNum = req.params.yearNum;
  try {
    const { rows: budgets } = await db.query(
      `SELECT * FROM expenses WHERE user_id = $1 AND month iLIKE $2 AND year iLike $3`,
      [user_id, monthName, yearNum]
    );
    console.log(budgets);
    res.send(budgets);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// post expense to database
app.post("/api/expenses", cors(), async (req, res) => {
  const generated_id = randomUUID();
  try {
    const newExpense = {
      user_id: req.body.user_id,
      amount: req.body.amount,
      duedate: req.body.duedate || null,
      datepaid: req.body.datepaid || null,
      expense_name: req.body.expense_name,
      tags: req.body.tags || "Other",
      month: req.body.month,
      year: req.body.year,
    };

    const result = await db.query(
      "insert into expenses(user_id, amount, duedate, datepaid, reminded, expense_name, month, year, expense_id, tags) values($1, $2, $3, $4, false, $5, $6, $7, $8, $9) RETURNING *",
      [
        newExpense.user_id,
        newExpense.amount,
        newExpense.duedate,
        newExpense.datepaid,
        newExpense.expense_name,
        newExpense.month,
        newExpense.year,
        generated_id,
        newExpense.tags,
      ]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete an expense entry
app.delete("/api/expense/:expenseId", cors(), async (req, res) => {
  try {
    const expense_id = req.params.expenseId;
    await db.query("DELETE FROM expenses WHERE expense_id=$1", [expense_id]);
    console.log("From the delete request-url", expense_id);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// edit a user's expense
app.put("/api/expense/:expenseId", cors(), async (req, res) => {
  const expense_id = req.params.expenseId;
  try {
    const updateExpense = {
      amount: req.body.amount,
      duedate: req.body.duedate || null,
      datepaid: req.body.datepaid || null,
      expense_name: req.body.expense_name,
      tags: req.body.tags || "Other",
    };

    const result = await db.query(
      "update expenses set amount=$1, duedate=$2, datepaid=$3, expense_name=$4, tags=$5 where expense_id=$6 RETURNING *",
      [
        updateExpense.amount,
        updateExpense.duedate,
        updateExpense.datepaid,
        updateExpense.expense_name,
        updateExpense.tags,
        expense_id,
      ]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

/***************************************************************************************************
 **************************************** INCOME API CALLS  ****************************************
 ***************************************************************************************************/

// grab income data by user id and month and year
app.get("/api/incomes/:userId&:monthName&:yearNum", cors(), async (req, res) => {
  const user_id = req.params.userId;
  const monthName = req.params.monthName;
  const yearNum = req.params.yearNum;
  try {
    const { rows: incomes } = await db.query(
      "SELECT * FROM incomes WHERE user_id = $1 AND month iLIKE $2 AND year iLike $3",
      [user_id, monthName, yearNum]
    );
    console.log(incomes);
    res.send(incomes);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// post an income entry to database
app.post("/api/incomes", cors(), async (req, res) => {
  const income_id = randomUUID();
  try {
    const newIncome = {
      amount: req.body.amount,
      date: req.body.date || null,
      user_id: req.body.user_id,
      income_name: req.body.income_name,
      month: req.body.month,
      year: req.body.year,
    };

    const result = await db.query(
      "insert into incomes(user_id, amount, date, income_name, month, year, income_id) values($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        newIncome.user_id,
        newIncome.amount,
        newIncome.date,
        newIncome.income_name,
        newIncome.month,
        newIncome.year,
        income_id,
      ]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete an income entry
app.delete("/api/income/:incomeId", cors(), async (req, res) => {
  try {
    const income_id = req.params.incomeId;
    await db.query("DELETE FROM incomes WHERE income_id=$1", [income_id]);
    console.log("From the delete request-url", income_id);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// edit a user's income entry
app.put("/api/income/:incomeId", cors(), async (req, res) => {
  const income_id = req.params.incomeId;
  try {
    const editedIncome = {
      amount: req.body.amount,
      date: req.body.date || null,
      income_name: req.body.income_name,
    };

    const result = await db.query(
      "update incomes set amount=$1, date=$2, income_name=$3 where income_id=$4 RETURNING *",
      [
        editedIncome.amount,
        editedIncome.date,
        editedIncome.income_name,
        income_id,
      ]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

/***************************************************************************************************
 **************************************** YEAR API CALLS  ******************************************
 ***************************************************************************************************/
// grab income amount by year and user id
app.get("/api/yearly/income/:userId&:yearNum", cors(), async (req, res) => {
  const user_id = req.params.userId;
  const yearNum = req.params.yearNum;
  try {
    const { rows: incomes } = await db.query(
      "SELECT amount, month FROM incomes WHERE user_id = $1 AND year iLike $2",
      [user_id, yearNum]
    );
    console.log(incomes);
    res.send(incomes);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// grab expenses amount + tags by year and user id
app.get("/api/yearly/expenses/:userId&:yearNum", cors(), async (req, res) => {
  const user_id = req.params.userId;
  const yearNum = req.params.yearNum;
  try {
    const { rows: expenses } = await db.query(
      "SELECT amount, month FROM expenses WHERE user_id = $1 AND year iLike $2",
      [user_id, yearNum]
    );
    console.log(expenses);
    res.send(expenses);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.post("/api/calendar", cors(), async (req, res) => {
 let { expenseName, expenseDate, email } = req.body;
  try{
       Calendar.createEvent({
        summary: expenseName,
        description: "Upcoming due date.",
        start: {
          date: (new Date(expenseDate).toISOString().slice(0, 10)),
        },
        end: {
          date: (new Date(expenseDate).toISOString().slice(0, 10)),
        },
        attendees: [
          { email: email },
        ],
        reminders: {
          useDefault: true,
        }
      });
    res.status(200);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

/***************************************************************************************************
 **************************************** YOUTUBE API CALLS ****************************************
 ***************************************************************************************************/

app.get("/api/videos/:keyword", async (req, res) => {
  const mockData = [
    {
      kind: "youtube#searchResult",
      etag: "RKQchR6oAHMwTUoZ5md4cSesJ54",
      id: {
        kind: "youtube#video",
        videoId: "DfVB73q8EMY",
      },
      snippet: {
        publishedAt: "2021-12-28T14:00:06Z",
        channelId: "UC7eBNeDW1GQf2NJQ6G6gAxw",
        title: "How Do I Tackle My $13,000 Credit Card Debt?",
        description:
          "How Do I Tackle My $13000 Credit Card Debt? Nix the guesswork and scrolling. We'll connect you with investment pros we trust: ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/DfVB73q8EMY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/DfVB73q8EMY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/DfVB73q8EMY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "The Ramsey Show - Highlights",
        liveBroadcastContent: "none",
        publishTime: "2021-12-28T14:00:06Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "L4iWPdBNxco7uc3ns_BGy-pTJ1k",
      id: {
        kind: "youtube#video",
        videoId: "mllmoeq2HYA",
      },
      snippet: {
        publishedAt: "2018-08-17T21:00:09Z",
        channelId: "UC7eBNeDW1GQf2NJQ6G6gAxw",
        title: "How Do I Start Tackling My Debt?",
        description:
          "How Do I Start Tackling My Debt? Get a FREE customized plan for your money. It only takes 3 minutes! http://bit.ly/2YTMuQM Visit ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/mllmoeq2HYA/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/mllmoeq2HYA/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/mllmoeq2HYA/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "The Ramsey Show - Highlights",
        liveBroadcastContent: "none",
        publishTime: "2018-08-17T21:00:09Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "0HR2Q_h2_ZeHPBjopKW53KenjUc",
      id: {
        kind: "youtube#video",
        videoId: "77U-782rsKw",
      },
      snippet: {
        publishedAt: "2023-02-04T03:24:44Z",
        channelId: "UCKjU3KzdbJE1EFcHVqXC3_g",
        title: "Tackling debt as the cost of living rises | Quick Question",
        description:
          "Canadians are struggling with their finances amid high interest rates and inflation. Certified financial planner Zainab Williams and ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/77U-782rsKw/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/77U-782rsKw/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/77U-782rsKw/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "CBC News: The National",
        liveBroadcastContent: "none",
        publishTime: "2023-02-04T03:24:44Z",
      },
    },
  ];
  const maxResults = 3;

  // const params = new URLSearchParams({
  //   part: "snippet",
  //   maxResults,
  //   q: req.params.keyword,
  //   key: process.env.YOUTUBE_API_KEY,
  // });

  // const url = `https://www.googleapis.com/youtube/v3/search?${params}`;
  // console.log(url);

  // // Make an API call to the YouTube API to get the latest videos
  // await fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //     res.send(data.items);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.status(500).send("Error fetching videos");
  //   });

   res.send(mockData);
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
