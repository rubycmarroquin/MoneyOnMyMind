/**
 * Takes in a month as a string and converts it to its numeric JS value.
 * Prepends months that are one digit with a 0 to ensure result has two 
 * digits
 * @param {string} monthName - string month name 
 * @returns month's numeric value as two digit number 
 */
export function getMonthNum(monthName) {
  let monthNum = new Date(`${monthName} 1, 2023`).getMonth() + 1;
  return monthNum > 10 ? monthNum : `0${monthNum}`;
}

/**
 * Gets the total number of days in the month that is passed in. Prepends
 * days that are not two digits with a 0 to ensure result has two digits.
 * @param {string} month - Month string 
 * @returns day 
 */
export function getDayNum(month) {
  const date = new Date(2023, getMonthNum(month), 0);
  return date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
}

/**
 * Removes timezone from date object 
 * @param {object} dateObj 
 * @returns date without the timezone 
 */
export const removeTimeZone = (dateObj) => dateObj.substring(0, 10);

/**
 * Takes date and converts it to a human-readable date 
 * @param {date} expenseDate 
 * @returns empty string or date as a string 
 */
export function parseDate(expenseDate) {
  if (expenseDate === null) return "";
  let date = new Date(expenseDate);
  return date.toDateString();
}