import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import IncomeForm from "./IncomeForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

const IncomeModal = ({ month, year, editIncome, loadIncomes }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className={!editIncome ? "AddButton" : "EditButton"}
        variant="primary"
        onClick={handleShow}
      >
        {!editIncome ? (
          <>
            <FontAwesomeIcon icon={faPlus} /> Add Income
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faEdit} />
          </>
        )}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="TitleModal" closeButton>
          <Modal.Title>
            {!editIncome ? "Add Income" : "Edit Income"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="IncomeModal">
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
