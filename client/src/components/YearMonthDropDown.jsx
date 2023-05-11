import { Dropdown } from "react-bootstrap";

const MonthDropDown = ({ month, setMonth, year, setYear }) => {
  // create drop down of years
  const currYear = new Date().getFullYear();

  // create array of years for drop down
  const years = Array.from(new Array(20), (val, index) =>
    index <= 5 ? currYear - index : index + currYear
  ).sort((a, b) => a - b);

  return (
    <div id="MonthYearDD">
      <div>
        <Dropdown
          variant="secondary"
          id="dropdown-basic"
          onSelect={(e) => setMonth(e)}
        >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {month ? month : "Select Month"}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ overflowY: "scroll", height: "200px" }}>
            <Dropdown.Item eventKey="January">January</Dropdown.Item>
            <Dropdown.Item eventKey="Feburary">February</Dropdown.Item>
            <Dropdown.Item eventKey="March">March</Dropdown.Item>
            <Dropdown.Item eventKey="April">April</Dropdown.Item>
            <Dropdown.Item eventKey="May">May</Dropdown.Item>
            <Dropdown.Item eventKey="June">June</Dropdown.Item>
            <Dropdown.Item eventKey="July">July</Dropdown.Item>
            <Dropdown.Item eventKey="August">August</Dropdown.Item>
            <Dropdown.Item eventKey="September">September</Dropdown.Item>
            <Dropdown.Item eventKey="October">October</Dropdown.Item>
            <Dropdown.Item eventKey="November">November</Dropdown.Item>
            <Dropdown.Item eventKey="December">December</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {month ? (
        <div>
          <Dropdown
            variant="secondary"
            id="dropdown-basic"
            onSelect={(e) => setYear(e)}
          >
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
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
      ) : null}
    </div>
  );
};

export default MonthDropDown;
