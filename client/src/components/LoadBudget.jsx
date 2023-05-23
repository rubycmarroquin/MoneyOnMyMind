import { React, useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import { useAuth0 } from "@auth0/auth0-react";
import BudgetModal from "./BudgetModal";
import IncomeModal from "./IncomeModal";
import { Button } from "react-bootstrap";
import { AuthContext } from "./AuthContext";
import { parseDate } from "./dateHelperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBell } from "@fortawesome/free-solid-svg-icons";
import { useCalendar } from "./useCalendar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const LoadBudget = ({ month, year }) => {
  const { user } = useAuth0();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const { authToken } = useContext(AuthContext);

  async function loadData(type) {
    const response = await fetch(`/api/${type}/${user.sub}&${month}&${year}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const json = await response.json();
    if (type === "expenses") setExpenses(json);
    if (type === "incomes") setIncomes(json);
  }

  useEffect(() => {
    loadData("expenses");
    loadData("incomes");
  }, [month, year, authToken]);

  async function deleteData(type, data_id) {
    await fetch(`/api/${type}/${data_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authToken}` },
    }).then((response) => {
      if (response.ok) loadData(type);
    });
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Get a calendar reminder!
    </Tooltip>
  );

  const { createEvent } = useCalendar();

  return (
    <div id="LoadBudgetOuterDiv">
      <div id="ViewingDiv">
        <h3>
          Viewing: {month} {year}
        </h3>
      </div>
      <div id="WrapBudgetTables">
        <div id="IncomeTableOuterDiv">
          <h2>Income</h2>
          <Table bordered hover>
            <thead className="BudgetTables">
              <tr>
                <th>Paid By</th>
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
                      <IncomeModal
                        month={month}
                        year={year}
                        editIncome={income}
                        loadData={loadData}
                      />
                      <Button
                        className="DeleteButton"
                        onClick={() => deleteData("incomes", income.income_id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <IncomeModal month={month} year={year} loadData={loadData} />
        </div>
        <div id="ExpenseTableOuterDiv">
          <h2>Expenses</h2>
          <Table bordered hover>
            <thead className="BudgetTables">
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
                      <BudgetModal
                        month={month}
                        year={year}
                        editExpense={expense}
                        loadData={loadData}
                      />
                      <Button
                        className="DeleteButton"
                        onClick={() =>
                          deleteData("expenses", expense.expense_id)
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                      {expense.duedate ? (
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <Button
                            className="GoogleCalendarButton"
                            onClick={() => createEvent(expense)}
                            disabled={
                              new Date(expense.duedate) > new Date()
                                ? false
                                : true
                            }
                          >
                            <FontAwesomeIcon icon={faBell} />
                          </Button>
                        </OverlayTrigger>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <BudgetModal month={month} year={year} loadData={loadData} />
        </div>
      </div>
    </div>
  );
};
export default LoadBudget;
