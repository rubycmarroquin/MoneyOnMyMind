import { React, useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";

const LoadBudget = ({ month }) => {
  const { user } = useAuth0();
  const [expenses, setExpenses] = useState([]);

  // load expenses from database
  async function loadExpenses() {
    // fetch the data from the backend
    const response = await fetch(
      `http://localhost:8080/expenses/${user.sub}&${month}`
    );
    const json = await response.json();
    setExpenses(json);
    console.log("this is the json", json);
  }

  const parseDate = (expenseDate) => {
    if (expenseDate === null) return "";
    let date = new Date(expenseDate);
    return date.toDateString();
  };

  useEffect(() => {
    loadExpenses();
  }, [month]);

  return (
    <div id="LoadBudgetOuterDiv">
      <h1>Viewing: {month}</h1>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Expense</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Currency</Table.HeaderCell>
            <Table.HeaderCell>Due Date</Table.HeaderCell>
            <Table.HeaderCell>Date Paid</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expenses.map((expense, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{expense.expense_name}</Table.Cell>
                <Table.Cell>{expense.amount}</Table.Cell>
                <Table.Cell>{expense.currency}</Table.Cell>
                <Table.Cell>{parseDate(expense.duedate)}</Table.Cell>
                <Table.Cell>{parseDate(expense.datepaid)}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
export default LoadBudget;

/**
 *         <Table.Row>
            <Table.Cell>
              <Header as="h2" textAlign="center">
                A
              </Header>
            </Table.Cell>
            <Table.Cell singleLine>Power Output</Table.Cell>
            <Table.Cell>
              <Rating icon="star" defaultRating={3} maxRating={3} />
            </Table.Cell>
            <Table.Cell textAlign="right">
              80% <br />
              <a href="#">18 studies</a>
            </Table.Cell>
            <Table.Cell>
              Creatine supplementation is the reference compound for increasing
              muscular creatine levels; there is variability in this increase,
              however, with some nonresponders.
            </Table.Cell>
          </Table.Row>
 */
