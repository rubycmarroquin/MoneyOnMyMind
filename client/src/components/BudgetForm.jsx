import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "./AuthContext";
import { getMonthNum, getDayNum, removeTimeZone } from "./handleDates";
import TagsDropDown from "./TagsDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMoneyBill,
  faCalendar,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

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

  // handles to see whether editedExpense has a due date checkbox in form
  const [hasDueDate, setHasDueDate] = useState(
    !!(editExpense && editExpense.duedate)
  );

  const handleChange = (field, value) => {
    // rounds amount to two decimal points
    if (field === "amount") value = Math.round(value * 100) / 100;
    setExpense({ ...expense, [field]: value });
  };

  const handleCheckChange = (e) => {
    const check = e.target.checked;
    // clears duedate field of expense that goes from having a due date to not having one
    setExpense({ ...expense, ["duedate"]: check ? expense.duedate : "" });
    setHasDueDate(check);
  };

  const apiCall = async (url, method) => {
    const requestData = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(expense),
    };

    await fetch(url, requestData)
      .then((response) => response.json())
      .then((data) => loadExpenses());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url, method;

    // makes a put request if expense is being edited, else makes a post
    if (editExpense && editExpense.expense_id) {
      url = `/api/expense/${expense.expense_id}`;
      method = "PUT";
    } else {
      url = `/api/expenses`;
      method = "POST";
    }

    await apiCall(url, method);
    handleClose();
  };

  return (
    authToken && (
      <Form className="form-students" onSubmit={handleSubmit}>
        <Form.Group className="FormOption">
          <Form.Label>
            <FontAwesomeIcon icon={faCartShopping} /> Expense
          </Form.Label>
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

        <Form.Group className="FormOption">
          <Form.Label>
            <FontAwesomeIcon icon={faMoneyBill} /> Amount:{" "}
          </Form.Label>
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
          className="CheckMark"
          type={"checkbox"}
          checked={hasDueDate}
          onChange={handleCheckChange}
          label={"Has due date?"}
        />

        {hasDueDate && (
          <Form.Group className="FormOption">
            <Form.Label>
              <FontAwesomeIcon icon={faCalendar} /> Due Date:
            </Form.Label>
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
        )}

        <Form.Group className="FormOption">
          <Form.Label>
            <FontAwesomeIcon icon={faCalendarCheck} /> Date Paid:
          </Form.Label>
          <input
            type="Date"
            id="add-datepaid"
            max={`${year}-${getMonthNum(month)}-${getDayNum(month)}`}
            value={expense.datepaid ? removeTimeZone(expense.datepaid) : ""}
            onChange={(event) => handleChange("datepaid", event.target.value)}
          />
        </Form.Group>

        <Form.Group className="FormOption">
          <TagsDropDown expense={expense} setExpense={setExpense} />
        </Form.Group>

        <Form.Group className="FormOption">
          {editExpense ? (
            <Button type="submit" variant="success" className="EditButton">
              Edit Expense
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outline-success"
              disabled={!expense.tags}
              className="ButtonTheme"
            >
              Add Expense
            </Button>
          )}
        </Form.Group>
      </Form>
    )
  );
};

export default BudgetForm;
