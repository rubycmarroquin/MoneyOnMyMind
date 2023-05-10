  export function getMonthNum(monthName) {
    let monthNum = new Date(`${monthName} 1, 2023`).getMonth() + 1;
    return monthNum > 10 ? monthNum : `0${monthNum}`;
  }

  export function getDayNum(month) {
    const date = new Date(2023, getMonthNum(month), 0);
    return date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  }