import { React, useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import { useAuth0 } from "@auth0/auth0-react";
import BudgetModal from "./BudgetModal";
import { Button } from "react-bootstrap";
import { AuthContext } from "./AuthContext";

const LoadBudget = ({ month }) => {
  const { user } = useAuth0();
  const [expenses, setExpenses] = useState([]);
  const { authToken } = useContext(AuthContext);

  // load expenses from database
  async function loadExpenses() {
    // fetch the data from the backend
    const response = await fetch(
      `http://localhost:8080/expenses/${user.sub}&${month}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const json = await response.json();
    setExpenses(json);
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

  const parseDate = (expenseDate) => {
    if (expenseDate === null) return "";
    let date = new Date(expenseDate);
    return date.toDateString();
  };

  useEffect(() => {
    loadExpenses();
  }, [month, authToken]);

  return (
    <div id="LoadBudgetOuterDiv">
      <h1>Viewing: {month}</h1>
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
                    editExpense={expense}
                    loadExpenses={loadExpenses}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <BudgetModal month={month} loadExpenses={loadExpenses} />
    </div>
  );
};
export default LoadBudget;
