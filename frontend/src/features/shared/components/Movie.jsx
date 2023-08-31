import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Movie({ movie }) {
  //"https://lk-aps.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/oppenheimer-et00004979-23-06-2023-02-14-08.jpg"
  return (
    <Row xs={1} md={2} lg={4} className="g-5">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Link to="/movies/movie1">
            <Card>
              <Card.Img variant="top" src={movie.poster_url} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

Movie.propTypes = {
  movie: PropTypes.object,
};

export default Movie;
