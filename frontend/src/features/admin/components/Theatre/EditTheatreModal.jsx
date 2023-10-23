import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";

const EditTheatreModal = ({ show, onHide}) => {
  // Initialize state variables for hour, minute, and added times
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  
  const [addedTimes, setAddedTimes] = useState([]);

  const handleHourChange = (e) => {
    setHour(e.target.value);
  };

  // Handle minute input change
  const handleMinuteChange = (e) => {
    setMinute(e.target.value);
  };

  // Function to add a showtime
  const addShowtime = (theatre) => {
    if (hour && minute) {
      const newTime = `${hour}:${minute}`;
      setAddedTimes([...addedTimes, newTime]);
      // Clear the hour and minute for the next input
      setHour("");
      setMinute("");
    }
  };

  // Function to remove a showtime
  const removeShowtime = (index) => {
    const updatedTimes = addedTimes.filter((_, i) => i !== index);
    setAddedTimes(updatedTimes);
  };

  const onCloseClick = (theater, ) => {
    // Call the scheduling function with addedTimes
    // onSchedule(addedTimes);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add or Remove Showtimes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
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
            <Col>
              <Button
                variant="primary"
                type="button"
                className="mt-4 float-end me-3"
                onClick={addShowtime}

              >
                Add
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table borderless>
                <tbody>
                  {addedTimes.map((time, index) => (
                    <tr key={index}>
                      <td>{time}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeShowtime(index)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseClick}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTheatreModal;
