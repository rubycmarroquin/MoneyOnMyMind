import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BudgetForm from "./BudgetForm";

const BudgetModal = ({ month, editExpense, loadExpenses }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Expense
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add / Edit Expense </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BudgetForm
            editExpense={editExpense}
            month={month}
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
