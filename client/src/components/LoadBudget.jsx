import { React, useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import { useAuth0 } from "@auth0/auth0-react";
import BudgetModal from "./BudgetModal";
import { Button } from "react-bootstrap";
import { AuthContext } from "./AuthContext";

const LoadBudget = ({ month, year }) => {
  const { user } = useAuth0();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const { authToken } = useContext(AuthContext);

  // load expenses from database
  async function loadExpenses() {
    const response = await fetch(
      `http://localhost:8080/expenses/${user.sub}&${month}&${year}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const json = await response.json();
    setExpenses(json);
    console.log("this is the json", json);
  }

  // load expenses from database
  async function loadIncomes() {
    const response = await fetch(
      `http://localhost:8080/incomes/${user.sub}&${month}&${year}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const json = await response.json();
    setIncomes(json);
    console.log("this is the json", json);
  }

  // delete an expense from database
  async function deleteExpense(expense_id) {
    const response = await fetch(
      `http://localhost:8080/expense/${expense_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    ).then((response) => {
      if (response.ok) loadExpenses();
    });
  }

  // delete an expense from database
  async function deleteIncome(income_id) {
    await fetch(`http://localhost:8080/income/${income_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authToken}` },
    }).then((response) => {
      if (response.ok) loadExpenses();
    });
  }

  const parseDate = (expenseDate) => {
    if (expenseDate === null) return "";
    let date = new Date(expenseDate);
    return date.toDateString();
  };

  useEffect(() => {
    loadExpenses();
    loadIncomes();
  }, [month, year, authToken]);

  return (
    <div id="LoadBudgetOuterDiv">
      <h1>
        Viewing: {month} {year}
      </h1>
      <h2>Income</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Expense</th>
            <th>Amount</th>
            <th>Date Received</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income, index) => {
            return (
              <tr key={index}>
                <td>{income.income_name}</td>
                <td>{income.amount}</td>
                <td>{parseDate(income.date)}</td>
                <td>
                  <Button onClick={() => deleteIncome(icome.income_id)}>
                    Delete
                  </Button>
                  {/* <BudgetModal
                    month={month}
                    year={year}
                    editExpense={expense}
                    loadExpenses={loadExpenses}
                  /> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h2>Expenses</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Expense</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Date Paid</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            return (
              <tr key={index}>
                <td>{expense.expense_name}</td>
                <td>{expense.amount}</td>
                <td>{parseDate(expense.duedate)}</td>
                <td>{parseDate(expense.datepaid)}</td>
                <td>
                  <Button onClick={() => deleteExpense(expense.expense_id)}>
                    Delete
                  </Button>
                  <BudgetModal
                    month={month}
                    year={year}
                    editExpense={expense}
                    loadExpenses={loadExpenses}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <BudgetModal month={month} year={year} loadExpenses={loadExpenses} />
    </div>
  );
};
export default LoadBudget;
