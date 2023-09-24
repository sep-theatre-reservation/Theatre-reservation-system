import { Container, Row, Col } from "react-bootstrap";
import CarouselManager from "../components/CarouselManager";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";

const rowStyle = {
  marginBottom: "20px", // Add space between rows
};

function DashboardPage() {
  return (
    <Container className="pb-5">
      <Row style={rowStyle}>
        <Col>
          <CarouselManager />
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col>
          <PieChart />
        </Col>
        <Col>
          <LineChart />
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;
