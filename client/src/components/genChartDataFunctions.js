import { convertToNumber } from "./handleStringNumbers";
import { monthStringToNumber } from "./dateHelperFunctions";

/**
 * Generates the data needed for the donut chart by iterating through the expense array
 * and summing the total of each expense tag.
 * @param {array} expenseArray - Array of expense objects for the month and year selected
 * @returns an array of subarrays with categories + total amount spent on each category
 * formatted for the chart data
 */
export function generateData(expenseArray) {
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
  let chartData = [["Expenses", "Dollars"], ...expenseData];
  return chartData;
}

/**
 * Gets the total income or expenses for each month of the selected year
 * @param {*} data - income or expense object for the entire year
 * @returns - an array of length 12 that holds the total spending or
 * income earned for each month
 */
export function generateYearlyData(data) {
  // create an array of length 12 (each index represents each month) and set
  // default value to 0 in cases where the month has no spendings/income earned
  const result = Array(12).fill(0);

  if (data.length === 0) return result;

  data.forEach((obj) => {
    // get the numeric value of the month to add to its according spot
    const index = Number(monthStringToNumber(obj.month));
    result[index] += convertToNumber(obj.amount);
  });

  return result;
}

/**
 * Generates the data for the line/combo chart based on the income
 * and expenses.
 * @param {*} expensesData - expenses for the selected year
 * @param {*} incomeData - income for the selected year
 * @returns generated line/combo chart data
 */
export function generateLineChartData(expensesData, incomeData) {
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

  // generate data for expenses and incomes
  let expenses = generateYearlyData(expensesData);
  let incomes = generateYearlyData(incomeData);

  let formatData = [];
  // format the data to be in the format of the line chart requirements
  months.forEach((currMonth, index) =>
    formatData.push([
      currMonth,
      incomes[index],
      expenses[index],
      // line data that will represent the month left over or overspent
      incomes[index] - expenses[index],
    ])
  );

  let chartData = [
    ["Month", "Income", "Expenses", "Money Left"],
    ...formatData,
  ];
  return chartData;
}
