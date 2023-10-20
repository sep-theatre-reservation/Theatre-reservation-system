import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieImageCard from "./MovieImageCard";
import CharacterIcon from "./CharacterIcon";
import PropTypes from "prop-types";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useEffect, useState } from "react";

function MovieDetails({ movie }) {
  const [loadedTheatres, setLoadedTheatres] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_REACT_APP_BASE_URL + `/shows/movie/${movie.id}`

        );

        setLoadedTheatres([
          ...new Set(
            responseData.shows.map((show) => show.theatre.theatreName)
          ),
        ]);
      } catch (err) {
        /* */
      }
    };

    fetchShows();
  }, [sendRequest, movie.id]);

  return (
    <Container fluid className="p-5 custom-background2">
      <style>
        {`
          h3 {
            font-weight: bold;
          }
        `}
      </style>
      <Row>
        <Col lg={3} className="d-none d-xl-block">
          <MovieImageCard img={movie.poster_url} />
        </Col>
        <Col lg={9}>
          <Stack gap={5}>
            <h1 style={{ fontSize: "3.5rem", fontWeight: "bold" }}>
              {movie.title}
            </h1>
            <Stack direction="horizontal" gap={3}>
              <div>
                <Stack gap={2}>
                  <h3>Now Showing At</h3>
                  <Stack direction="horizontal">
                    {!isLoading &&
                      loadedTheatres &&
                      loadedTheatres.map((theatre) => (
                        <p key={theatre} className="lead me-4">
                          {theatre}
                        </p>
                      ))}
                  </Stack>
                </Stack>
              </div>
              {movie.status == "nowShowing" && (
                <Button
                  as={Link}
                  to={`/booking/${movie.id}`}
                  variant="primary"
                  className=" m-auto"
                >
                  Book Tickets
                </Button>
              )}
            </Stack>
            <Row>
              <Col md={7}>
                <div>
                  <h3>Story Line</h3>
                  <p>{movie.description}</p>
                </div>
              </Col>
              {/* <Col lg={5}>
                <div>
                  <h3>Genress</h3>
                  <Stack direction="horizontal" gap={3}>
                    <p className="lead">action</p>
                    <p className="lead">action</p>
                    <p className="lead">action</p>
                  </Stack>
                </div>
              </Col> */}
            </Row>
            <Stack>
              <h3>Cast</h3>
              <Stack direction="horizontal" gap={5} className="pt-3">
                {movie.cast.map((character) => (
                  <CharacterIcon
                    key={character.name}
                    title={character.name}
                    // subtitle="J. Robert"
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
