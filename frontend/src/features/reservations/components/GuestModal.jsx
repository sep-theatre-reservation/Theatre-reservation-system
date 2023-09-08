import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useHttpClient } from "../../shared/hooks/http-hook";

const GuestModal = ({ show, onHide, booking }) => {
  // State to store the email input value
  const [email, setEmail] = useState("");
  const { sendRequest: sendAddGuestReq } = useHttpClient();

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendAddGuestReq(
        "http://localhost:3000/api/shows",
        "POST",
        JSON.stringify({ email }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
    } catch (error) {
      /* */
    }
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

export default GuestModal;
