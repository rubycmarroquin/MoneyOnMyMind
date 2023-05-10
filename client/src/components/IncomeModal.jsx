import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import IncomeForm from "./IncomeForm";

const IncomeModal = ({ month, year, editIncome, loadIncomes }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {!editIncome ? "Add Income" : "Edit"}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!editIncome ? "Add Income" : "Edit Income"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IncomeForm
            editIncome={editIncome}
            month={month}
            year={year}
            handleClose={handleClose}
            loadIncomes={loadIncomes}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default IncomeModal;
