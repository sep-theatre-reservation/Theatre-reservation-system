import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const ScheduleMovieModal = ({ show, onHide, onSchedule, theatres, movie }) => {
  // Initialize state variables for date, time, and ISO string
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const [showtime, setShowtime] = useState(null);

  const [theater, setTheater] = useState(null);
  const [isoString, setISOString] = useState(null);

  const [showTimeArray, setShowTimeArray] = useState([]);

  // Handle date input change
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTheaterChange = async (e) => {
    setTheater(e.target.value);
    const selectedTheaterId = e.target.value;

    // Perform other actions if needed
    try {
      const responseData = await fetch(
        import.meta.env.VITE_REACT_APP_BASE_URL +
          `/theatres/showtimes/${selectedTheaterId}`
      );
      const data = await responseData.json();
      // console.log(data.showtimes);
      setShowTimeArray(data.showtimes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowtimeChange = (e) => {
    setShowtime(e.target.value);
    // Split the time string into hours and minutes
    const [hours, minutes] = e.target.value.split(":");

    // Call the setHour and setMinute functions
    setHour(hours);
    setMinute(minutes);

    console.log(hours, minutes);
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
        <Modal.Title>
          {"Schedule a Showtime for "}{" "}
          <span style={{ fontWeight: "bold", color: "blue" }}>
            {movie.title}
          </span>
        </Modal.Title>
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

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Select a Showtime:</Form.Label>
                <Form.Control
                  as="select"
                  value={showtime}
                  onChange={handleShowtimeChange}
                >
                  <option value="">Select a Showtime</option>
                  {showTimeArray.map((showtimeItem) => (
                    <option key={showtimeItem.id} value={showtimeItem.id}>
                      {showtimeItem}
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

ScheduleMovieModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onSchedule: PropTypes.func,
  theatres: PropTypes.array,
  movie: PropTypes.object,
};

export default ScheduleMovieModal;
