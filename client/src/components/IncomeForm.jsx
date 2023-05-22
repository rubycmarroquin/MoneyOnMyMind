import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "./AuthContext";
import { getMonthNum, getDayNum, removeTimeZone } from "./handleDates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMoneyBill,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

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

  const apiCall = async (url, method) => {
    const requestData = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(income),
    };

    await fetch(url, requestData)
      .then((response) => response.json())
      .then((data) => loadIncomes());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url, method;

    // makes a put request if income is being edited, else makes a post
    if (editIncome && editIncome.income_id) {
      url = `/api/incomes/${income.income_id}`;
      method = "PUT";
    } else {
      url = `/api/incomes`;
      method = "POST";
    }

    await apiCall(url, method);
    handleClose();
  };

  return (
    <>
      authToken && (
      <Form className="form-students" onSubmit={handleSubmit}>
        <Form.Group className="FormOption">
          <Form.Label>
            <FontAwesomeIcon icon={faUser} /> Received From
          </Form.Label>
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
        <Form.Group className="FormOption">
          <Form.Label>
            <FontAwesomeIcon icon={faMoneyBill} /> Amount:
          </Form.Label>
          <input
            type="number"
            id="add-income-amount"
            placeholder="Amount"
            required
            value={income.amount || ""}
            onChange={(event) => handleChange("amount", event.target.value)}
          />
        </Form.Group>
        <Form.Group className="FormOption">
          <Form.Label>
            <FontAwesomeIcon icon={faCalendar} /> Date Received:
          </Form.Label>
          <input
            type="Date"
            id="add-date-received"
            min={`${year}-MM-01`}
            max={`${year}-${getMonthNum(month)}-${getDayNum(month)}`}
            value={income.date ? removeTimeZone(income.date) : ""}
            onChange={(event) => handleChange("date", event.target.value)}
          />
        </Form.Group>
        <Form.Group className="FormOption">
          {editIncome ? (
            <Button type="submit" variant="success" className="EditButton">
              Edit Income
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outline-success"
              className="ButtonTheme"
            >
              Add Income
            </Button>
          )}
        </Form.Group>
      </Form>
      )
    </>
  );
};

export default IncomeForm;
