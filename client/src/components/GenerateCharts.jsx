import { useEffect, useState } from "react";
import MonthDropDown from "./YearMonthDropDown";
import { Chart } from "react-google-charts";
import { convertToNumber } from "./handleStringNumbers";
import GenerateTables from "./GenTable";
import { getMonthNum } from "./handleDates";

const GenerateCharts = ({
  expenses,
  month,
  setMonth,
  year,
  setYear,
  yearExpenses,
  yearIncome,
}) => {
  const [chartData, setChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);

  const donutOptions = {
    title: `Spending Habits (${month} ${year})`,
    pieHole: 0.4,
    is3D: false,
    colors: [
      "#e60049",
      "#0bb4ff",
      "#50e991",
      "#e6d800",
      "#9b19f5",
      "#ffa300",
      "#dc0ab4",
      "#b3d4ff",
      "#00bfa0",
    ],
  };

  const columnChartOptions = {
    title: `Monthly Spendings and Income (${year})`,
    vAxis: { title: "in Dollars (USD)" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
    colors: ["#00bfa0", "#e60049"],
    chartArea: {
      backgroundColor: {
        fill: "#F4F4F4",
        opacity: 100,
      },
    },
  };

  useEffect(() => {
    if (expenses) setChartData(generateData(expenses));
    if (yearExpenses && yearIncome)
      setLineChartData(generateLineChartData(yearExpenses, yearIncome));
  }, [expenses, month, year, yearExpenses, yearIncome]);

  return (
    <div className="GenCharts">
      <h3>
        Viewing {month}, {year}
      </h3>
      <MonthDropDown
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />
      {expenses && lineChartData ? (
        <div id="GeneratedContentsDiv">
          <div id="HoldsCharts">
            <div id="DonutChart">
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={chartData}
                options={donutOptions}
              />
            </div>
            <div id="LineChart">
              <Chart
                chartType="ComboChart"
                width="100%"
                height="100%"
                data={lineChartData}
                options={columnChartOptions}
              />
            </div>
          </div>
          <div id="GenTableOnly">
            <GenerateTables expenses={expenses} />
          </div>
        </div>
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

function generateYearlyData(data) {
  const result = Array(12).fill(0);
  if (data.length === 0) return result;

  data.forEach((obj) => {
    const index = Number(getMonthNum(obj.month)) - 1;
    result[index] += convertToNumber(obj.amount);
  });

  return result;
}

function generateLineChartData(expensesData, incomeData) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let expenses = generateYearlyData(expensesData);
  let incomes = generateYearlyData(incomeData);

  let dataRotated = [];
  months.forEach((currMonth, index) =>
    dataRotated.push([currMonth, incomes[index], expenses[index]])
  );

  dataRotated.unshift(["Month", "Income", "Expenses"]);
  return dataRotated;
}
