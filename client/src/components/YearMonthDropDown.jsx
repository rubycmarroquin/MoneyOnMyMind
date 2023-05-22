import { Dropdown } from "react-bootstrap";

const MonthDropDown = ({ month, setMonth, year, setYear }) => {
  const currYear = new Date().getFullYear();
  const years = Array.from(new Array(20), (val, index) =>
    index <= 5 ? currYear - index : index + currYear
  ).sort((a, b) => a - b);

  const months = [
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

  return (
    <div id="MYDropOuterDiv">
      <h3>Select Month and Year:</h3>
      <div id="MonthYearDD">
        <div>
          <Dropdown
            variant="secondary"
            id="dropdown-basic"
            onSelect={(e) => setMonth(e)}
          >
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="MDDropDown"
            >
              {month ? month : "Select Month"}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ overflowY: "scroll", height: "200px" }}>
              {months.map((currMonth) => {
                return (
                  <Dropdown.Item key={currMonth} eventKey={currMonth}>
                    {currMonth}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {month && (
          <div>
            <Dropdown
              variant="secondary"
              id="dropdown-basic"
              onSelect={(e) => setYear(e)}
            >
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                className="MDDropDown"
              >
                {year ? year : "Select Year"}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ overflowY: "scroll", height: "200px" }}>
                {years.map((currentYear) => (
                  <Dropdown.Item
                    key={`Year+${currentYear}`}
                    eventKey={`${currentYear}`}
                  >
                    {currentYear}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthDropDown;
