import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SeatCountSelector from "../components/SeatCountSelector";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const SeatCountModal = ({ show, onHide, showId }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      data-bs-theme="dark"
    >
      <Modal.Header closeButton className="bg-dark ">
        <Modal.Title id="contained-modal-title-vcenter" className="text-white">
          How many Seats?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Stack>
          <SeatCountSelector />
          <div className="ms-auto p-2">
            {/*enter show id to the route */}
            <Button as={Link} to={`/seats/${showId}`} onClick={onHide}>
              Select Seats
            </Button>
          </div>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default SeatCountModal;
