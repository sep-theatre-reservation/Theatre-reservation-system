import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";

const ScheduleMovieModal = ({ show, onHide, onSchedule, theatres }) => {
  // Initialize state variables for date, time, and ISO string
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [theater, setTheater] = useState(null);
  const [isoString, setISOString] = useState(null);

  // Handle date input change
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // Handle hour input change
  const handleHourChange = (e) => {
    setHour(e.target.value);
  };

  // Handle minute input change
  const handleMinuteChange = (e) => {
    setMinute(e.target.value);
  };

  const handleTheaterChange = (e) => {
    setTheater(e.target.value);
  };

  // Function to generate ISO string from date and time
  const generateISOString = () => {
    if (date && hour && minute) {
      // Combine date, hour, and minute strings, then parse them as a Date object
      const dateTime = new Date(`${date}T${hour}:${minute}`);
      // Check if the parsing was successful and generate ISO string
      if (!isNaN(dateTime.getTime())) {
        setISOString(dateTime.toISOString());
      } else {
        setISOString("");
      }
    } else {
      setISOString("");
    }
  };

  useEffect(() => {
    // Generate ISO string when date, hour, or minute changes
    generateISOString();
  }, [date, hour, minute]);

  const onScheduleClick = () => {
    // Generate ISO string when the "Schedule" button is clicked
    generateISOString();

    // Call the scheduling function if isoString is not empty
    if (isoString) {
      onSchedule(theater, isoString);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Schedule a Showtime</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Time:</Form.Label>
                <Form.Control
                  as="select"
                  value={hour}
                  onChange={handleHourChange}
                >
                  <option value="">Hour</option>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i.toString().padStart(2, "0")}>
                      {i.toString().padStart(2, "0")}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>&nbsp;</Form.Label>
                <Form.Control
                  as="select"
                  value={minute}
                  onChange={handleMinuteChange}
                >
                  <option value="">Minute</option>
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i.toString().padStart(2, "0")}>
                      {i.toString().padStart(2, "0")}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Theater:</Form.Label>
                <Form.Control
                  as="select"
                  value={theater}
                  onChange={handleTheaterChange}
                >
                  <option value="">Select a Theater</option>
                  {theatres.map((theatreItem) => (
                    <option key={theatreItem.id} value={theatreItem.id}>
                      {theatreItem.theatreName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="secondary" onClick={onScheduleClick}>
          Schedule
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScheduleMovieModal;
