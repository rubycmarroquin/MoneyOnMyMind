import Profile from "../components/UserProfile";
import NavigationBar from "../components/NavigationBar";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "../components/AuthContext";
import GenerateCharts from "../components/GenerateCharts";
import { convertToNumber } from "../components/handleStringNumbers";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [viewMonth, setViewMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [yearlyExpenses, setYearlyExpenses] = useState(null);
  const [yearlyIncome, setYearlyIncome] = useState(null);
  const { user } = useAuth0();
  const { authToken } = useContext(AuthContext);

  // load total amount of expenses for viewing month
  async function loadTotalExpenses() {
    const response = await fetch(
      `http://localhost:8080/expenses/${user.sub}&${viewMonth}&${viewYear}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const json = await response.json();
    setExpenses(json);
    if (json.length !== 0) {
      setTotalExpenses(
        json
          .reduce(
            (total, currAmount) =>
              (total += convertToNumber(currAmount.amount)),
            0
          )
          .toFixed(2)
      );
    } else {
      setTotalExpenses(0);
    }
  }

  // load total amount of income for viewing month
  async function loadTotalIncome() {
    const response = await fetch(
      `http://localhost:8080/incomes/${user.sub}&${viewMonth}&${viewYear}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const json = await response.json();
    if (json.length > 0) {
      setTotalIncome(
        json
          .reduce(
            (total, currAmount) =>
              (total += convertToNumber(currAmount.amount)),
            0
          )
          .toFixed(2)
      );
    } else {
      setTotalIncome(0);
    }
  }

  // load total amount of income for viewing month
  async function loadYearIncome() {
    const response = await fetch(
      `http://localhost:8080/yearly/income/${user.sub}&${viewYear}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const json = await response.json();
    setYearlyIncome(json);
    console.log(json);
  }

  // load total amount of income for viewing month
  async function loadYearExpenses() {
    const response = await fetch(
      `http://localhost:8080/yearly/expenses/${user.sub}&${viewYear}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const json = await response.json();
    setYearlyExpenses(json);
    console.log(json);
  }

  useEffect(() => {
    if (authToken) {
      loadTotalExpenses();
      loadTotalIncome();
      loadYearExpenses();
      loadYearIncome();
    }
  }, [authToken, viewMonth, viewYear]);

  return (
    <div id="DashBoardOuterDiv">
      <NavigationBar />
      <Profile />
      <div className="GenerateSpendingsDiv">
        <div id="AmountRemaining">
          <h2 id="RemainingText">
            Amount Remaining:{" "}
            <span
              style={{
                color:
                  convertToNumber(totalIncome - totalExpenses) <= 0
                    ? "red"
                    : "green",
              }}
            >
              ${convertToNumber(totalIncome - totalExpenses)}
            </span>
          </h2>
        </div>
        <GenerateCharts
          yearExpenses={yearlyExpenses}
          yearIncome={yearlyIncome}
          expenses={expenses}
          month={viewMonth}
          setMonth={setViewMonth}
          year={viewYear}
          setYear={setViewYear}
        />
      </div>
    </div>
  );
};

export default Dashboard;
