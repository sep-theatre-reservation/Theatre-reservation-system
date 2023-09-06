import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const CustomErrorModal = ({ show, onClose }) => {
  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>An Error Occured!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please Select a Date first</Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Okay</Button>
      </Modal.Footer>
    </Modal>
  );
};


export default CustomErrorModal;
