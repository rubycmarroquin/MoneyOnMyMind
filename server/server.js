const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// create the get request for students in the endpoint '/api/students'
app.get("/api/students", async (req, res) => {
  try {
    const { rows: students } = await db.query("SELECT * FROM students");
    res.send(students);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      iscurrent: req.body.iscurrent,
    };
    //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
    const result = await db.query(
      "INSERT INTO students(firstname, lastname, is_current) VALUES($1, $2, $3) RETURNING *",
      [newStudent.firstname, newStudent.lastname, newStudent.iscurrent]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for students
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    await db.query("DELETE FROM students WHERE id=$1", [studentId]);
    console.log("From the delete request-url", studentId);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

/***************** Auth0 Connection **************/

// create the get request for students in the endpoint '/api/students'
app.get("/user/:userId", async (req, res) => {
  const user_id = req.params.userId;
  try {
    const { rows: users } = await db.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
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

/* Account Settings - Updating User Information */

// update a user's info
app.put("/user/:userId", async (req, res) => {
  const user_id = req.params.userId;
  const updatedUser = {
    name: req.body.name,
    phone: req.body.phone,
  };
  console.log("Updated User - Server: ", updatedUser);
  try {
    const updated = await db.query(`update users set name=$1, phone=$2 where user_id=$3 RETURNING *`, 
    [updatedUser.name, updatedUser.phone, user_id]);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

/*************** Expense Table METHODS *****************/
app.get("/expenses/:userId&:monthName", async (req, res) => {
  const user_id = req.params.userId;
  const monthName = req.params.monthName;
  try {
    const { rows: expenses } = await db.query("SELECT * FROM expenses WHERE user_id = $1 AND month iLIKE $2", [user_id, monthName]);
    console.log(expenses);
    res.send(expenses);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// http://localhost:8080/user/expenses/ 

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});