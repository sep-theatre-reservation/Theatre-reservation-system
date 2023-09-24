import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SeatCountSelector from "../components/SeatCountSelector";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const SeatCountModal = ({ show, onHide, showId }) => {
  const [seatCount, setSeatCount] = useState()
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
          <SeatCountSelector setCount={(count) => setSeatCount(count)} />
          <div className="ms-auto p-2">
            {seatCount == "0" ? (
              (<Button disabled variant="outline-primary">
                Select Seats
              </Button>)
            ) :
              <Button as={Link} to={`/seats/${showId}/${seatCount}`} onClick={onHide} variant="outline-primary">
                Select Seats
              </Button>
            }

          </div>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default SeatCountModal;
