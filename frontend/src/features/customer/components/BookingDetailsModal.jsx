import { Button, Col, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const BookingDetailsModal = ({ show, onHide, booking }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <p>
              <strong>Booking ID:</strong> {booking.id}
            </p>
            <p>
              <strong>Showtime:</strong>{" "}
              {new Date(booking.date).toLocaleString()}
            </p>
          </Col>
          <Col md={6}>
            <p>
              <strong>Theatre:</strong> {booking.theatre}
            </p>
            <p>
              <strong>Reserved Seats:</strong> {booking.seats.join(", ")}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  booking.status === "Confirmed"
                    ? "text-success"
                    : booking.status === "Cancelled"
                    ? "text-danger"
                    : "text-primary"
                }
              >
                {booking.status}
              </span>
            </p>
          </Col>
        </Row>
        <Row>
          <p>
            <strong>Movie:</strong> {booking.movie}
          </p>
        </Row>
      </Modal.Body>
      <Modal.Footer className="bg-primary">
        <Button variant="warning" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

BookingDetailsModal.propTypes = {
  show: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
};

export default BookingDetailsModal;
