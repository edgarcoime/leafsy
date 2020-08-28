import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Order from "./OrderForm.component";
import Recommendation from "./RecommendationForm.component";
import EditOrder from "./EditOrder.component";
import EditRecommendation from "./EditRecommendation.component";
import './modal.css'


function ModalButton(props) {
  const {
    modalHeader,
    modalBody,
    addOrder,
    addRequest,
    modalShow,
    openModal,
    closeModal,
    currentEdit,
    editOrder,
    submitEditOrder,
    editRecommendation,
    submitEditReco,
    customGenres,
  } = props;

  return (
    <>
      <Modal
        show={modalShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalHeader}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form row">
            {modalBody === "addOrderForm" && (
              <Order
                closeModal={closeModal}
                openModal={openModal}
                addOrder={addOrder}
              />
            )}

            {modalBody === "addRequestForm" && (
              <Recommendation
                closeModal={closeModal}
                openModal={openModal}
                addRequest={addRequest}
                customGenres={customGenres}
              />
            )}

            {modalBody === "editOrderForm" && (
              <EditOrder
                closeModal={closeModal}
                openModal={openModal}
                currentEdit={currentEdit}
                editOrder={editOrder}
                submitEditOrder={submitEditOrder}
              />
            )}

            {modalBody === "editRecommendation" && (
              <EditRecommendation
                closeModal={closeModal}
                openModal={openModal}
                currentEdit={currentEdit}
                editRecommendation={editRecommendation}
                submitEditReco={submitEditReco}
                customGenres={customGenres}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalButton;
