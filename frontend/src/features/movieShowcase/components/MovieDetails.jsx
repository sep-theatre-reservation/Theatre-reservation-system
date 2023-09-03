import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieImageCard from "./MovieImageCard";
import CharacterIcon from "./CharacterIcon";
import PropTypes from "prop-types";

function MovieDetails({ movie }) {
  return (
    <Container fluid className="p-5">
      <Row>
        <Col lg={3} className="d-none d-xl-block">
          <MovieImageCard />
        </Col>
        <Col lg={9}>
          <Stack gap={5}>
            <h1>{movie.title}</h1>
            <Stack direction="horizontal" gap={3}>
              <div>
                <Stack gap={2}>
                  <h4>Now Showing At</h4>
                  <Stack direction="horizontal">
                    <p className="lead me-4">Scope cinema</p>
                    <p className="lead me-4">Scope cinema</p>
                    <p className="lead me-4">Scope cinema</p>
                  </Stack>
                </Stack>
              </div>
              <Button
                as={Link}
                to="/booking"
                variant="primary"
                className=" m-auto"
              >
                Book Tickets
              </Button>
            </Stack>
            <Row>
              <Col md={7}>
                <div>
                  <h3>Story Line</h3>
                  <p>{movie.description}</p>
                </div>
              </Col>
              <Col lg={5}>
                <div>
                  <h3>Genress</h3>
                  <Stack direction="horizontal" gap={3}>
                    <p className="lead">action</p>
                    <p className="lead">action</p>
                    <p className="lead">action</p>
                  </Stack>
                </div>
              </Col>
            </Row>
            <Stack>
              <h3>Cast</h3>
              <Stack direction="horizontal" gap={5} className="pt-3">
                {movie.cast.map((character) => (
                  <CharacterIcon
                    key={character.name}
                    title={character.name}
                    subtitle="J. Robert"
                    imgUrl={character.imageUrl}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack>
              <h3>Team</h3>
              <Stack direction="horizontal" gap={5} className="pt-3">
                <CharacterIcon
                  key={movie.director.name}
                  title={movie.director.name}
                  subtitle="Director"
                  imgUrl={movie.director.imageUrl}
                />
              </Stack>
            </Stack>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieDetails;
