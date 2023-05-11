import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "./AuthContext";
import { getMonthNum, getDayNum } from "./handleDates";
import { removeTimeZone } from "./handleDates";

const IncomeForm = ({ handleClose, month, year, editIncome, loadIncomes }) => {
  const { user } = useAuth0();
  const { authToken } = useContext(AuthContext);

  const [income, setIncome] = useState(
    editIncome || {
      user_id: user.sub,
      amount: "",
      date: "",
      month: month,
      year: year,
    }
  );

  const handleChange = (field, value) => {
    if (field === "amount") value = Math.round(value * 100) / 100;
    setIncome({ ...income, [field]: value });
  };

  //A function to handle the post request
  async function addIncome() {
    await fetch("http://localhost:8080/incomes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(income),
    })
      .then((response) => {
        console.log("Response from post method ", response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // reload expenses to show changes made
        loadIncomes();
      });
  }

  //A function to handle the put request
  async function editIncomeDB() {
    console.log(income);
    await fetch(`http://localhost:8080/income/${income.income_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(income),
    })
      .then((response) => {
        console.log("Response from put method ", response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        loadIncomes();
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIncome && editIncome.income_id) editIncomeDB();
    else addIncome();
    handleClose();
  };

  return (
    authToken && (
      <Form className="form-students" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Income</Form.Label>
          <input
            type="text"
            id="add-income"
            placeholder="Income Received From"
            required
            value={income.income_name || ""}
            onChange={(event) =>
              handleChange("income_name", event.target.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount: </Form.Label>
          <input
            type="number"
            id="add-income-amount"
            placeholder="Amount"
            required
            value={income.amount || ""}
            onChange={(event) => handleChange("amount", event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date Received: </Form.Label>
          <input
            type="Date"
            id="add-date-received"
            min={`${year}-MM-01`}
            max={`${year}-${getMonthNum(month)}-${getDayNum(month)}`}
            value={income.date ? removeTimeZone(income.date) : ""}
            onChange={(event) => handleChange("date", event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          {editIncome ? (
            <Button type="submit" variant="success">
              Edit Income
            </Button>
          ) : (
            <Button type="submit" variant="outline-success">
              Add Income
            </Button>
          )}
        </Form.Group>
      </Form>
    )
  );
};

export default IncomeForm;
