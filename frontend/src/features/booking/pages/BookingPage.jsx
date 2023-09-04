<<<<<<< HEAD
import React from 'react'
import UpcomingWeekSelect from '../components/UpcomingWeekDropdown'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import MovieImageCard from '../../movieShowcase/components/MovieImageCard';
import SeatCountModal from '../components/SeatCountModal';
import ShowTimes from '../components/ShowTimes';
=======
import { useEffect, useState } from "react";
import UpcomingWeekSelect from "../components/UpcomingWeekDropdown";
import { Col, Container, Row, Stack } from "react-bootstrap";
import MovieImageCard from "../../shared/components/MovieImageCard";
import SeatCountModal from "../components/SeatCountModal";
import ShowTimes from "../components/ShowTimes";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
>>>>>>> e23b284 (Seat Selection partially implemented)

const BookingPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedMovie, setLoadedMovie] = useState();
  const [loadedShowtimes, setLoadedShowtimes] = useState();

  const movieId = useParams().movieId;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/movies/${movieId}`
        );
        setLoadedMovie(responseData.movie);
      } catch (err) {
        /* */
      }
    };

    fetchMovies();
  }, [sendRequest, movieId]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/shows/movie/${movieId}`
        );
        setLoadedShowtimes(responseData.shows);
      } catch (err) {
        /* */
      }
    };

    fetchShows();
    //console.log(loadedShowtimes);
  }, [sendRequest, movieId]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    //console.log(selectedDate);
  };

  return (
    <Container>
      <SeatCountModal show={modalShow} onHide={() => setModalShow(false)} />
      <Stack gap={4} direction="horizontal" className="mt-5">
        <h2>Buy Tickets</h2>
        <UpcomingWeekSelect onDateSelect={handleDateSelect} />
      </Stack>
      <Row className="pt-5">
        <Col>
          <Stack gap={3}>
            <h3>{!isLoading && loadedMovie && loadedMovie.title}</h3>
            <Col className="d-md-none">
              <MovieImageCard size={10} />
            </Col>
            <h4 className="my-3">Show Times</h4>
            <Stack gap={5}>
              {!isLoading && loadedShowtimes && (
                <ShowTimes
                  setModalShow={setModalShow}
                  showTimes={loadedShowtimes}
                />
              )}
            </Stack>
          </Stack>
        </Col>
        <Col className="d-none d-md-block">
          {!isLoading && loadedMovie && (
            <MovieImageCard img={loadedMovie.poster_url} className="m-auto" />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookingPage;
