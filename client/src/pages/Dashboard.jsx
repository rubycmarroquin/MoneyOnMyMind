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
  async function loadTotalData(type) {
    const response = await fetch(
      `/api/${type}/${user.sub}&${viewMonth}&${viewYear}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const json = await response.json();
    let amount =
      json.length !== 0
        ? json.reduce(
            (total, currAmount) =>
              (total += convertToNumber(currAmount.amount)),
            0
          )
        : 0;

    if (type === "expenses") {
      setExpenses(json);
      setTotalExpenses(amount);
    } else {
      setTotalIncome(amount);
    }
  }

  async function loadYearData(type) {
    const response = await fetch(
      `/api/yearly/${type}/${user.sub}&${viewYear}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const json = await response.json();
    type === "expenses" ? setYearlyExpenses(json) : setYearlyIncome(json);
  }

  useEffect(() => {
    if (authToken) {
      loadYearData("expenses");
      loadYearData("incomes");
      loadTotalData("expenses");
      loadTotalData("incomes");
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
