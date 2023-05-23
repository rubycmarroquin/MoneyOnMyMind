import { Table } from "react-bootstrap";
import { parseDate } from "./dateHelperFunctions";

const GenerateTables = ({ expenses }) => {
  return expenses && expenses.length ? (
    <>
      <h2>Spendings</h2>
      <Table bordered hover>
        <thead className="GenTableCols">
          <tr>
            <th>Expense</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Date Paid</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            return (
              <tr className="GenTableRows" key={index}>
                <td>{expense.expense_name}</td>
                <td>{expense.amount}</td>
                <td>{parseDate(expense.duedate)}</td>
                <td>{parseDate(expense.datepaid)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  ) : (
    <h2> No Spendings to Show </h2>
  );
};
export default GenerateTables;
