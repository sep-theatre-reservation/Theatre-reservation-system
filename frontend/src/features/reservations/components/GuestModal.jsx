import { useContext, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Stack } from "react-bootstrap";
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from "../../shared/context/auth-context";

const GuestModal = ({ show, onHide, bookingId }) => {
  const auth=useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [guest, setGuest] = useState(null);
  const { sendRequest: sendAddGuestReqest } = useHttpClient()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const addGuest = async () => {
    try {
      const responseData = await sendAddGuestReqest(
        "/guests",
        "POST",
        JSON.stringify({ email, bookingId }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
      setGuest(responseData.guest._id);
    } catch (error) {
      console.log(error)   
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    auth.guestEmail=email;
    addGuest();
    onHide()
  };


  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton={false}>
        <Modal.Title>But first, Login or Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack>
          <Form onSubmit={handleGuestLogin}>
            <Form.Group>
              <Form.Label>Enter your Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="mb-3"
                placeholder="name@example.com"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="float-end">
              Continue as a Guest
            </Button>
          </Form>
          <Container className="text-center">
            <Row direction="horizontal">
              <Col>
                <hr></hr>
              </Col>
              <Col xs={1}>
                <p className="fw-bold pt-1 m-0">OR</p>
              </Col>
              <Col>
                <hr></hr>
              </Col>
            </Row>
            <Container>
              {<div id="signUpDiv2" className="d-flex justify-content-around" ></div>}
            </Container>
          </Container>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default GuestModal;
