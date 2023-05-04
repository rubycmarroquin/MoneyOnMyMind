import { React, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import LoadBudget from "../components/LoadBudget";
import MonthDropDown from "../components/MonthDropDown";

const Budget = () => {
  // keep track of the month that is being added to
  const [month, setMonth] = useState(null);

  return (
    <>
      <NavigationBar />
      <div id="BudgetPageOuterDiv">
        <h1>Budget Plans</h1>
        <MonthDropDown month={month} setMonth={setMonth} />
        {month ? <LoadBudget month={month} /> : null}
      </div>
    </>
  );
};

export default Budget;
