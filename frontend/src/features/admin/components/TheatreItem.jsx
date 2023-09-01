import { FaMapMarkerAlt } from "react-icons/fa";
import { Stack, Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useHttpClient } from "../../shared/hooks/http-hook"; 

import React, { useState } from "react";
import ErrorModal from "../../shared/components/ErrorModal";
import LoadingOverlay from "../../shared/components/LoadingOverlay";

const TheatreItem = ({ theatre, onDelete }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelRemoveHandler = () => {
    setShowConfirmModal(false);
  };

  const ConfirmRemoveHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:3000/api/theatres/${theatre.id}`,
        "DELETE"
      );
      onDelete(theatre.id);
    } catch (err) {
      /** */
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onHide={cancelRemoveHandler}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id={theatre.id}>Are you Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to proceed and remove this theatre? Please note that, this
          action cannot be reverted.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelRemoveHandler}>
            CANCEL
          </Button>
          <Button variant="danger" onClick={ConfirmRemoveHandler}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
      <ErrorModal error={error} onClear={clearError} />
      <Stack key={theatre.id} id={theatre.id} direction="horizontal" gap={3}>
        {isLoading && <LoadingOverlay asOverlay />}
        <span className="mb-0 me-auto">
          <FaMapMarkerAlt size={20} className="mb-2" />
          {theatre.theatreName}
        </span>
        <Button variant="warning"> Edit</Button>
        <Button variant="danger" onClick={showDeleteWarningHandler}>
          Remove
        </Button>
      </Stack>
    </React.Fragment>
  );
};

TheatreItem.propTypes = {
  theatre: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

export default TheatreItem;
