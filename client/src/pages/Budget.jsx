import { React, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import LoadBudget from "../components/LoadBudget";
import MonthDropDown from "../components/YearMonthDropDown";
import "../styles/Budget.css";

const Budget = () => {
  // keeps track of the month / year that is being added to
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  return (
    <>
      <NavigationBar />
      <div id="BudgetPageOuterDiv">
        <h1 id="BudgetTitle">Budget Tracking</h1>
        <MonthDropDown
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
        {month && year ? (
          <>
            <LoadBudget month={month} year={year} />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Budget;
