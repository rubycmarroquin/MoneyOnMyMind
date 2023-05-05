import { Dropdown } from "react-bootstrap";

const MonthDropDown = ({ month, setMonth }) => {
  return (
    <div>
      <h2>Select Month</h2>
      <Dropdown
        variant="secondary"
        id="dropdown-basic"
        onSelect={(e) => setMonth(e)}
      >
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {month ? month : "Select Month"}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ overflowY: "scroll" }}>
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
  );
};

export default MonthDropDown;
