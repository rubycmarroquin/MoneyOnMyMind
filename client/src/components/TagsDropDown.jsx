import { Dropdown } from "react-bootstrap";

const TagsDropDown = ({ expense, setExpense }) => {
  return (
    <div id="TagsDropDown">
      <div>
        <Dropdown
          variant="secondary"
          id="dropdown-basic"
          onSelect={(e) => setExpense({ ...expense, ["tags"]: e })}
        >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {expense.tags ? expense.tags : "Select Type of Expense"}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ overflowY: "scroll", height: "200px" }}>
            <Dropdown.Item eventKey="Housing">Housing</Dropdown.Item>
            <Dropdown.Item eventKey="Transportation">
              Transportation
            </Dropdown.Item>
            <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
            <Dropdown.Item eventKey="Insurance">Insurance</Dropdown.Item>
            <Dropdown.Item eventKey="Utilities">Utilities</Dropdown.Item>
            <Dropdown.Item eventKey="Medical">
              Medical & Healthcare
            </Dropdown.Item>
            <Dropdown.Item eventKey="SIDP">
              Saving, Investing, & Debt Payments
            </Dropdown.Item>
            <Dropdown.Item eventKey="Personal">
              Personal Spendings
            </Dropdown.Item>
            <Dropdown.Item eventKey="Subscriptions">
              Monthly Subscription
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TagsDropDown;
