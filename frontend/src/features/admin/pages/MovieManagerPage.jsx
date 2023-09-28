import { Container, Col, Row } from "react-bootstrap";
import AddMovieComponent from "../components/Movie/AddMovieComponent";
import ShowMoviesComponent from "../components/Movie/ShowMoviesComponent";
import { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/ErrorModal";
import ScheduleMovieModal from "../components/Movie/ScheduleMovieModal";

function MovieManagerPage() {
  const [moviesList, setMoviesList] = useState();

  const [updateShowMovies, setUpdateShowMovies] = useState(false);
  const {
    isLoading: isAddMovieLoading,
    error,
    sendRequest: sendAddMovieRequest,
    clearError,
  } = useHttpClient();
  const { isLoading: isShowMoviesLoading, sendRequest: sendShowMoviesRequest } =
    useHttpClient();

  const { sendRequest: sendAddShowRequest } = useHttpClient();
  const {
    isLoading: isShowTheatreLoading,
    sendRequest: sendShowTheatreRequest,
  } = useHttpClient();

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleMovieId, setScheduleMovieId] = useState(null);
  const [theatreList, setTheatreList] = useState();

  useEffect(() => {
    getMovies();
  }, [updateShowMovies, sendShowMoviesRequest]);

  const getMovies = async () => {
    try {
      const responseData = await sendShowMoviesRequest(
        "http://localhost:3000/api/movies"
      );
      setMoviesList(responseData.movies);
    } catch (err) {
      /* */
    }
  };

  useEffect(() => {
    const getTheatres = async () => {
      try {
        const responseData = await sendShowTheatreRequest(
          "http://localhost:3000/api/theatres"
        );
        setTheatreList(responseData.theatres);
      } catch (err) {
        /* */
      }
    };
    getTheatres();
  }, [sendShowTheatreRequest]);

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
      /* */
    }
  };

  const scheduleMovie = async (theatreId, date) => {
    try {
      console.log(date);
      const responseData = await sendAddShowRequest(
        "http://localhost:3000/api/shows",
        "POST",
        JSON.stringify({
          movie: scheduleMovieId,
          theatre: theatreId,
          showtime: date,
        }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
    } catch (error) {
      /* */
    }
  };

  const onShowSchedule = (movieId) => {
    setScheduleMovieId(movieId);
    setShowScheduleModal(true);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isShowTheatreLoading && theatreList && (
        <ScheduleMovieModal
          show={showScheduleModal}
          onHide={() => setShowScheduleModal(false)}
          onSchedule={scheduleMovie}
          theatres={theatreList}
        />
      )}
      <Container className="py-5">
        <Row>
          <Col lg={6}>
            <AddMovieComponent
              onAddMovie={addMovie}
              isLoading={isAddMovieLoading}
            />
          </Col>
          <Col lg={6}>
            <ShowMoviesComponent
              moviesList={moviesList}
              isLoading={isShowMoviesLoading}
              showSchedule={onShowSchedule}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MovieManagerPage;
