const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { randomUUID } = require("crypto");
const path = require("path");
const db = require("./db/db-connection.js");

//auth0 jwt
const { auth } = require("express-oauth2-jwt-bearer");

const app = express();
const PORT = process.env.PORT || 8080;

//JWT middleware
const jwtCheck = auth({
  audience: "https://money-on-my-mind/api",
  issuerBaseURL: "https://dev-xy4didc5bijpholc.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

app.use(cors());
app.use(express.json());
app.use(jwtCheck);

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

/***************** Auth0 Connection **************/

// create the get request for students in the endpoint '/api/students'
app.get("/user/:userId", async (req, res) => {
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
app.post("/user", async (req, res) => {
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

/**************** Account Settings - Updating User Information ****************/

// update a user's info
app.put("/user/:userId", async (req, res) => {
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

/*************** Expense Table METHODS *****************/
// grab data by user id and month and year 
app.get("/expenses/:userId&:monthName&:yearNum", async (req, res) => {
  const user_id = req.params.userId;
  const monthName = req.params.monthName;
  const yearNum = req.params.yearNum;
  try {
    const { rows: expenses } = await db.query(
      "SELECT * FROM expenses WHERE user_id = $1 AND month iLIKE $2 AND year iLike $3",
      [user_id, monthName, yearNum]
    );
    console.log(expenses);
    res.send(expenses);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// post expense to database
app.post("/expenses", async (req, res) => {
  const expense_id = randomUUID();
  try {
    const newExpense = {
      user_id: req.body.user_id,
      amount: req.body.amount,
      duedate: req.body.duedate || null,
      datepaid: req.body.datepaid || null,
      expense_name: req.body.expense_name,
      month: req.body.month,
      year: req.body.year
    };

    const result = await db.query(
      "insert into expenses(user_id, amount, duedate, datepaid, reminded, expense_name, month, year, expense_id) values($1, $2, $3, $4, false, $5, $6, $7, $8) RETURNING *",
      [
        newExpense.user_id,
        newExpense.amount,
        newExpense.duedate,
        newExpense.datepaid,
        newExpense.expense_name,
        newExpense.month,
        newExpense.year,
        expense_id,
      ]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete an expense entry
app.delete("/expense/:expenseId", async (req, res) => {
  try {
    const expense_id = req.params.expenseId;
    await db.query("DELETE FROM expenses WHERE expense_id=$1", [
      expense_id,
    ]);
    console.log("From the delete request-url", expense_id);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// edit a user's expense 
app.put("/expense/:expenseId", async (req, res) => {
  const expense_id = req.params.expenseId;
  try {
    const newExpense = {
      amount: req.body.amount,
      duedate: req.body.duedate || null,
      datepaid: req.body.datepaid || null,
      expense_name: req.body.expense_name,
    };

    const result = await db.query(
      "update expenses set amount=$1, duedate=$2, datepaid=$3, expense_name=$4 where expense_id=$5 RETURNING *",
      [
        newExpense.amount,
        newExpense.duedate,
        newExpense.datepaid,
        newExpense.expense_name,
        expense_id
      ]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
