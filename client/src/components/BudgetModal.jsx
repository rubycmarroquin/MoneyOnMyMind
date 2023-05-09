import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BudgetForm from "./BudgetForm";

const BudgetModal = ({ month, year, editExpense, loadExpenses }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {!editExpense ? "Add Expense" : "Edit"}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!editExpense ? "Add Expense" : "Edit Expense"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BudgetForm
            editExpense={editExpense}
            month={month}
            year={year}
            handleClose={handleClose}
            loadExpenses={loadExpenses}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default BudgetModal;
