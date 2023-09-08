import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const GuestModal = ({ show, onHide, booking, reserve }) => {
  // State to store the email input value
  const [email, setEmail] = useState("");
  const [guest, setGuest] = useState(null);
  const { sendRequest: sendAddGuestReq } = useHttpClient();
  const { sendRequest: sendAddBookingRequest } = useHttpClient();
  const [bookingId, setBookingId] = useState(null);

  const navigate = useNavigate();

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const addGuest = async () => {
    try {
      const responseData = await sendAddGuestReq(
        "http://localhost:3000/api/guests",
        "POST",
        JSON.stringify({ email }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
      setGuest(responseData.guest._id);
    } catch (error) {
      /* */
    }
  };

  const createBooking = async () => {
    try {
      const responseData = await sendAddBookingRequest(
        "http://localhost:3000/api/bookings",
        "POST",
        JSON.stringify({
          ...booking,
          guest: guest,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setBookingId(responseData.booking._id);
    } catch (err) {
      /* */
    }
  };

  useEffect(() => {
    if (guest !== null) {
      createBooking(); // Create the booking once the guest is set
    }
  }, [guest]);

  useEffect(() => {
    if (bookingId !== null) {
      navigate(`/payment/${bookingId}`);
    }
  }, [bookingId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    addGuest();
    reserve();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Email Subscription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="mb-3"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Proceed
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

GuestModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
  reserve: PropTypes.func.isRequired,
};

export default GuestModal;
