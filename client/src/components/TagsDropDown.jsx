import { Dropdown } from "react-bootstrap";

const TagsDropDown = ({ expense, setExpense }) => {
  const listOfTags = [
    ["Housing", "Housing"],
    ["Transportation", "Transportation"],
    ["Food", "Food"],
    ["Insurance", "Insurance"],
    ["Utilities", "Utilities"],
    ["Medical", " Medical & Healthcare"],
    ["SIDP", "Saving, Investing, & Debt Payments"],
    ["Personal", "Personal Spendings"],
    ["Subscriptions", "Monthly Subscription"],
  ];

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
            {listOfTags.map((currTag) => {
              return (
                <Dropdown.Item key={currTag[0]} eventKey={currTag[0]}>
                  {currTag[1]}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TagsDropDown;
