import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BudgetForm from "./BudgetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

const BudgetModal = ({ month, year, editExpense, loadData }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className={!editExpense ? "AddButton" : "EditButton"}
      >
        {!editExpense ? (
          <>
            <FontAwesomeIcon icon={faPlus} /> Add Expense
          </>
        ) : (
          <FontAwesomeIcon icon={faEdit} />
        )}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="TitleModal" closeButton>
          <Modal.Title>
            {!editExpense ? "Add Expense" : "Edit Expense"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BudgetForm
            editExpense={editExpense}
            month={month}
            year={year}
            handleClose={handleClose}
            loadData={loadData}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BudgetModal;
