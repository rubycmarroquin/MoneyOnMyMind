const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { randomUUID } = require("crypto");
const path = require("path");
const db = require("./db/db-connection.js");
const axios = require("axios");
const Calendar = require("./calendar.js");

//auth0 jwt
const { auth } = require("express-oauth2-jwt-bearer");

const app = express();

const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;

function jwtCheck(req, res, next) {
  //ignore jwt check for these paths
  if (!req.path.startsWith("/api")) return next();

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

app.post("/api/chat", async (req, res) => {
  const { userInput } = req.body;
  console.log(userInput);
  const client = axios.create({
    headers: {
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
  });

  console.log(process.env.OPENAI_API_KEY);

  const params = {
    model: "text-davinci-003",
    prompt: `Generate me one response based on this inquiry " ${userInput} ". Structure response as a sentence or small paragraph. Try to keep the topic related to financial advice if possible.`,
    max_tokens: 2048,
    temperature: 1,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  client
    .post("https://api.openai.com/v1/completions", params)
    .then((result) => {
      console.log(result);
      // format data to remove all \n from response
      let openAiResponse = result.data.choices[0].text;
      res.send({ advice: openAiResponse });
    })
    .catch((err) => {
      console.log(err);
      console.error(err);
      return res.status(400).json({ err });
    });
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
    return res.status(400).json({ e });
  }
});

/***************************************************************************************************
 **************************************** EXPENSE API CALLS ****************************************
 ***************************************************************************************************/

// grab data by user id and month and year
app.get(
  "/api/expenses/:userId&:monthName&:yearNum",
  cors(),
  async (req, res) => {
    const user_id = req.params.userId;
    const monthName = req.params.monthName;
    const yearNum = req.params.yearNum;
    try {
      const { rows: budgets } = await db.query(
        `SELECT * FROM expenses WHERE user_id = $1 AND month iLIKE $2 AND year iLike $3`,
        [user_id, monthName, yearNum]
      );
      res.send(budgets);
    } catch (e) {
      return res.status(400).json({ e });
    }
  }
);

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
    return res.status(400).json({ e });
  }
});

// delete an expense entry
app.delete("/api/expenses/:expenseId", cors(), async (req, res) => {
  try {
    const expense_id = req.params.expenseId;
    await db.query("DELETE FROM expenses WHERE expense_id=$1", [expense_id]);
    res.status(200).end();
  } catch (e) {
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
    return res.status(400).json({ e });
  }
});

/***************************************************************************************************
 **************************************** INCOME API CALLS  ****************************************
 ***************************************************************************************************/

// grab income data by user id and month and year
app.get(
  "/api/incomes/:userId&:monthName&:yearNum",
  cors(),
  async (req, res) => {
    const user_id = req.params.userId;
    const monthName = req.params.monthName;
    const yearNum = req.params.yearNum;
    try {
      const { rows: incomes } = await db.query(
        "SELECT * FROM incomes WHERE user_id = $1 AND month iLIKE $2 AND year iLike $3",
        [user_id, monthName, yearNum]
      );
      res.send(incomes);
    } catch (e) {
      return res.status(400).json({ e });
    }
  }
);

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
    return res.status(400).json({ e });
  }
});

// delete an income entry
app.delete("/api/incomes/:incomeId", cors(), async (req, res) => {
  try {
    const income_id = req.params.incomeId;
    await db.query("DELETE FROM incomes WHERE income_id=$1", [income_id]);
    res.status(200).end();
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// edit a user's income entry
app.put("/api/incomes/:incomeId", cors(), async (req, res) => {
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
    return res.status(400).json({ e });
  }
});

/***************************************************************************************************
 **************************************** YEAR API CALLS  ******************************************
 ***************************************************************************************************/
// grab income amount by year and user id
app.get("/api/yearly/incomes/:userId&:yearNum", cors(), async (req, res) => {
  const user_id = req.params.userId;
  const yearNum = req.params.yearNum;
  try {
    const { rows: incomes } = await db.query(
      "SELECT amount, month FROM incomes WHERE user_id = $1 AND year iLike $2",
      [user_id, yearNum]
    );
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
    res.send(expenses);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

app.post("/api/calendar", cors(), async (req, res) => {
  let { expenseName, expenseDate, email } = req.body;
  try {
    Calendar.createEvent({
      summary: expenseName,
      description: "Upcoming due date.",
      start: {
        date: new Date(expenseDate).toISOString().slice(0, 10),
      },
      end: {
        date: new Date(expenseDate).toISOString().slice(0, 10),
      },
      attendees: [{ email: email }],
      reminders: {
        useDefault: true,
      },
    });
    res.status(200);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

/***************************************************************************************************
 **************************************** YOUTUBE API CALLS ****************************************
 ***************************************************************************************************/

// mock video api payload
app.get("/api/videos/:keyword", async (req, res) => {
  const maxResults = 3;
  const params = new URLSearchParams({
    part: "snippet",
    maxResults,
    q: req.params.keyword,
    key: process.env.YOUTUBE_API_KEY,
  });

  const url = `https://www.googleapis.com/youtube/v3/search?${params}`;

  // Make an API call to the YouTube API to get the latest videos
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.send(data.items);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get("/:any", (req, res) => {
  // res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
  res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
