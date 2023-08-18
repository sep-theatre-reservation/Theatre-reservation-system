import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

function Movie() {
  return (
    <Row xs={1} md={2} lg={4} className="g-5">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
        <Link to="/movies/movie1">
          <Card>
            <Card.Img variant="top" src="https://lk-aps.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/oppenheimer-et00004979-23-06-2023-02-14-08.jpg" />
            <Card.Body>
              <Card.Title>Oppenheimer</Card.Title>
            </Card.Body>
          </Card>
        </Link>
        </Col>
      ))}
    </Row>
  )
}

export default Movie