export function monthStringToNumber(monthName) {
  return new Date(`${monthName} 1, 2023`).getMonth();
}

export function getLastDayOfMonth(month, year) {
  return new Date(Number(year), monthStringToNumber(month) + 1, 0);
}

export function getFirstDayOfMonth(month, year) {
  return new Date(Number(year), monthStringToNumber(month), 1);
}

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