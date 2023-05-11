import { useEffect, useState } from "react";
import MonthDropDown from "./YearMonthDropDown";
import { Chart } from "react-google-charts";
import { convertToNumber } from "./handleStringNumbers";

const GenerateCharts = ({ expenses, month, setMonth, year, setYear }) => {
  const [chartData, setChartData] = useState(null);

  const options = {
    title: "Spending Habits",
    pieHole: 0.4,
    is3D: false,
  };

  useEffect(() => {
    if (expenses) setChartData(generateData(expenses));
  }, [expenses, month, year]);

  return (
    <div>
      <h1>Viewing</h1>
      <MonthDropDown
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />
      {expenses ? (
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />
      ) : (
        <h2>Nothing to Show</h2>
      )}
    </div>
  );
};

export default GenerateCharts;

/**
 * Generates the data needed for the Charts by iterating through the expense array
 * and summing the total of each expense tag.
 * @param {array} expenseArray - Array of expense objects for the month + year selected
 * @returns an array of sub arrays
 */
function generateData(expenseArray) {
  // object to hold the total of users spending by category
  const dataObj = {};
  expenseArray.forEach((expenseObj) => {
    // store the current cateogry
    let category = expenseObj["tags"];
    // checks to see if the category has already been saved to either add or
    // create a new key-value in data obj
    if (dataObj.hasOwnProperty(category) === true) {
      dataObj[category] += convertToNumber(expenseObj.amount);
    } else {
      dataObj[category] = convertToNumber(expenseObj.amount);
    }
  });
  // returns as an array of sub-arrays made from data obj
  const expenseData = Object.entries(dataObj);
  // append the chart data to the beginning of array
  expenseData.unshift(["Expenses", "Dollars"]);
  return expenseData;
}
