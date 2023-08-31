import { Container, Col, Row } from "react-bootstrap";
import AddTheaterComponent from "../components/AddTheaterComponent";
import ShowTheatreComponent from "../components/ShowTheatreComponent";
import { useState } from "react";

function TheatreManagePage() {
  const [updateShowTheatres, setUpdateShowTheatres] = useState(false);

  const handleAddTheatre = () => {
    // Toggle the updateShowTheatres state to trigger a re-render
    setUpdateShowTheatres((prevValue) => !prevValue);
  };

  return (
    <Container className="pt-5  ">
      <Row>
        <Col lg={6}>
          <AddTheaterComponent onAddTheatre={handleAddTheatre} />
        </Col>
        <Col lg={6}>
          <ShowTheatreComponent shouldUpdate={updateShowTheatres} />
        </Col>
      </Row>
    </Container>
  );
}

export default TheatreManagePage;
