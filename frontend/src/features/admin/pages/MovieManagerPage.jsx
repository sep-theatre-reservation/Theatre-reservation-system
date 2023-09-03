import { Container, Col, Row } from "react-bootstrap";
import AddMovieComponent from "../components/Movie/AddMovieComponent";
import ShowMoviesComponent from "../components/Movie/ShowMoviesComponent";
import { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/ErrorModal";

function MovieManagerPage() {
  const [moviesList, setMoviesList] = useState();

  const [updateShowMovies, setUpdateShowMovies] = useState(false);
  const { isLoading: isAddMovieLoading, error, sendRequest: sendAddMovieRequest, clearError } = useHttpClient();
  const { isLoading: isShowMoviesLoading, sendRequest: sendShowMoviesRequest } = useHttpClient();

  useEffect(() => { getMovies(); }, [updateShowMovies, sendShowMoviesRequest]);

  const getMovies = async () => {
    try {
      const responseData = await sendShowMoviesRequest(
        "http://localhost:3000/api/movies"
      );
      setMoviesList(responseData.movies);
    } catch (err) {
      /* */
    }
  }

  const addMovie = async (formData) => {
    try {
      const responseData = await sendAddMovieRequest(
        "http://localhost:3000/api/movies",
        "POST",
        JSON.stringify({
          title: formData.title,
          release_date: formData.releaseDate,
          poster_url: formData.imageUrl,
          trailerLink: formData.trailerLink,
          description: formData.description,
          director: {
            name: formData.directorName,
            imageUrl: formData.directorImageUrl,
          },
          cast: formData.cast,
        }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
      setUpdateShowMovies((prevValue) => !prevValue);
    } catch (error) {

    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Container className="pt-5  ">
        <Row>
          <Col lg={6}>
            <AddMovieComponent onAddMovie={addMovie} isLoading={isAddMovieLoading} />
          </Col>
          <Col lg={6}>
            <ShowMoviesComponent moviesList={moviesList} isLoading={isShowMoviesLoading} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MovieManagerPage;
