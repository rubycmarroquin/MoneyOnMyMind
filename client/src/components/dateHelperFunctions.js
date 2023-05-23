/**
 * Converts the given month string (full month name - e.g., January)
 * into its numeric JS representation (e.g., 0: January, ...)
 * @param {string} monthName - the full month name
 * @returns
 */
export function monthStringToNumber(monthName) {
  return new Date(`${monthName} 1, 2023`).getMonth();
}

/**
 * Gets the last day of the month of the given year.
 * Helps take leap year into consideration.
 * @param {string} month - selected month
 * @param {string} year - selected year
 * @returns date object with the last day of the given month/year
 */
export function getLastDayOfMonth(month, year) {
  let date = new Date(Number(year), monthStringToNumber(month) + 1, 0);
  date.setUTCHours(8);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  return date;
}

/**
 * Converts the given month and year into a date object for the first day
 * of the given month/year
 * @param {string} month - selected month
 * @param {string} year - selected year
 * @returns date object for the first day of the given month/year
 */
export function getFirstDayOfMonth(month, year) {
  let date = new Date(Number(year), monthStringToNumber(month), 1);
  date.setUTCHours(8);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  return date;
}

/**
 * Takes date and converts it to a human-readable date
 * @param {date} expenseDate
 * @returns empty string or date as a string
 */
export function parseDate(expenseDate) {
  if (expenseDate === null) return "";
  let date = new Date(expenseDate);
  date.setUTCHours(8);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  return date.toDateString();
}
