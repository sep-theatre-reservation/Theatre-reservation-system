import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ErrorModal = ({ error, onClear }) => {
  return (
    <Modal onHide={onClear} show={!!error} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>An Error Occured!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{error}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onClear}>Okay</Button>
      </Modal.Footer>
    </Modal>
  );
};

ErrorModal.propTypes = {
  error: PropTypes.string,
  onClear: PropTypes.func.isRequired,
};

export default ErrorModal;
