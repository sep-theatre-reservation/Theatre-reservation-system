import { Container, Col, Row } from "react-bootstrap";
import AddMovieComponent from "../components/AddMovieComponent";
import ShowMoviesComponent from "../components/ShowMoviesComponent";
import { useState } from "react";

function MovieManagerPage() {
  const [updateShowMovies, setUpdateShowMovies] = useState(false);

  const handleAddMovie = () => {
    // Toggle the updateShowTheatres state to trigger a re-render
    setUpdateShowMovies((prevValue) => !prevValue);
  };
  return (
    <Container className="pt-5  ">
      <Row>
        <Col lg={6}>
          <AddMovieComponent onAddMovie={handleAddMovie} />
        </Col>
        <Col lg={6}>
          <ShowMoviesComponent shouldUpdate={updateShowMovies} />
        </Col>
      </Row>
    </Container>
  );
}

export default MovieManagerPage;
