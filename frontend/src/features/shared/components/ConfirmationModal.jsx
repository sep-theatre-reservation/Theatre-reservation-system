import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function ConfirmationModal({ show, onClose, onConfirm, text }) {
    return (
        <Modal
            show={show}
            onHide={onClose}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title >Are you Sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {text}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    CANCEL
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal