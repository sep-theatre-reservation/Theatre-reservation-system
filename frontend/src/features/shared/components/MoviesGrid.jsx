
import MovieCard from "./MovieCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function MoviesGrid({movieList}) {
  return (
    <>
          <Row xs={1} md={2} lg={4} xl={5} className="g-4">
            {movieList.map((movie, idx) => (
              <Col key={idx } >
                {movie && <MovieCard key={movie.id} movie={movie}  />}
              </Col>
            ))}
          </Row>
    </>
  );
}

export default MoviesGrid;
