import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "./AuthContext";
import { getMonthNum, getDayNum } from "./handleDates";
import TagsDropDown from "./TagsDropDown";
import { removeTimeZone } from "./handleDates";

const BudgetForm = ({
  handleClose,
  month,
  year,
  editExpense,
  loadExpenses,
}) => {
  const { user } = useAuth0();
  const { authToken } = useContext(AuthContext);

  const [expense, setExpense] = useState(
    editExpense || {
      user_id: user.sub,
      amount: "",
      duedate: "",
      datepaid: "",
      expense_name: "",
      tags: "",
      month: month,
      year: year,
    }
  );

  const [hasDueDate, setHasDueDate] = useState(
    editExpense && editExpense.duedate ? true : false
  );

  const handleChange = (field, value) => {
    if (field === "amount") value = Math.round(value * 100) / 100;
    setExpense({ ...expense, [field]: value });
  };

  const handleCheckChange = (e) => {
    const check = e.target.checked;
    // resets the expenses due date
    if (!check) setExpense({ ...expense, ["duedate"]: "" });
    setHasDueDate(check);
  };

  //A function to handle the post request
  async function addExpense() {
    if (!hasDueDate) expense.duedate = "";
    await fetch("http://localhost:8080/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(expense),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // reload expenses to show changes made
        loadExpenses();
      });
  }

  //A function to handle the put request
  async function editExpenseDB() {
    console.log(expense);
    await fetch(`http://localhost:8080/expense/${expense.expense_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(expense),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        loadExpenses();
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editExpense && editExpense.expense_id) editExpenseDB();
    else addExpense();
    handleClose();
  };

  return (
    authToken && (
      <Form className="form-students" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Expense</Form.Label>
          <input
            type="text"
            id="add-expense"
            placeholder="Expense Name"
            required
            value={expense.expense_name || ""}
            onChange={(event) =>
              handleChange("expense_name", event.target.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount: </Form.Label>
          <input
            type="number"
            id="add-amount"
            placeholder="Amount"
            required
            value={expense.amount || ""}
            onChange={(event) => handleChange("amount", event.target.value)}
          />
        </Form.Group>
        <Form.Check
          type={"checkbox"}
          checked={hasDueDate}
          onChange={handleCheckChange}
          label={"Has due date?"}
        />
        {hasDueDate ? (
          <Form.Group>
            <Form.Label>Due Date: </Form.Label>
            <input
              type="date"
              id="add-duedate"
              required
              min={`${year}-${getMonthNum(month)}-01`}
              max={`${year}-${getMonthNum(month)}-${getDayNum(month)}`}
              value={expense.duedate ? removeTimeZone(expense.duedate) : ""}
              onChange={(event) => handleChange("duedate", event.target.value)}
            />
          </Form.Group>
        ) : null}
        <Form.Group>
          <Form.Label>Date Paid: </Form.Label>
          <input
            type="Date"
            id="add-datepaid"
            max={`${year}-${getMonthNum(month)}-${getDayNum(month)}`}
            value={expense.datepaid ? removeTimeZone(expense.datepaid) : ""}
            onChange={(event) => handleChange("datepaid", event.target.value)}
          />
        </Form.Group>
        <Form.Group required>
          <TagsDropDown expense={expense} setExpense={setExpense} />
        </Form.Group>
        <Form.Group>
          {editExpense ? (
            // TODO: disable button toggle
            // Checkout isRequired from material UI
            <Button type="submit" variant="success">
              Edit Expense
            </Button>
          ) : (
            <Button type="submit" variant="outline-success">
              Add Budget
            </Button>
          )}
        </Form.Group>
      </Form>
    )
  );
};

export default BudgetForm;
