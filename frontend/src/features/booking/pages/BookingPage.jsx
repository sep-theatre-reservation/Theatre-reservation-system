import { useEffect, useState } from "react";
import UpcomingWeekSelect from "../components/UpcomingWeekDropdown";
import { Col, Container, Row, Stack } from "react-bootstrap";
import MovieImageCard from "../../movieShowcase/components/MovieImageCard";
import SeatCountModal from "../components/SeatCountModal";
import ShowTimes from "../components/ShowTimes";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/ErrorModal"
const BookingPage = () => {

  const [dateSelectionError, setDateSelectionError] = useState(null)
  const [seatCountModalShow, setSeatCountModalShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedMovie, setLoadedMovie] = useState();
  const [loadedShowtimes, setLoadedShowtimes] = useState();
  const [filteredShowtimes, setFilteredShowtimes] = useState([]); // New state for filtered showtimes

  const movieId = useParams().movieId;

  useEffect(() => {
    const fetchMovies = async () => {3
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/movies/${movieId}`
        );
        setMovie(responseData.movie);
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
        setShowtimes(responseData.shows);
      } catch (err) {
        /* */
      }
    };

    fetchShows();
  }, [sendRequest, movieId]);

  useEffect(() => {
    if (loadedShowtimes) {
      // Filter the showtimes based on selectedDate
      if (selectedDate) {
        //console.log(selectedDate);
        const selectedDateObject = new Date(selectedDate);
        const formattedSelectedDate = selectedDateObject
          .toISOString()
          .split("T")[0];
        const filtered = loadedShowtimes.filter((showtime) => {
          const formattedShowtime = new Date(showtime.showtime)
            .toISOString()
            .split("T")[0];
          return formattedShowtime === formattedSelectedDate;
        });
        setFilteredShowtimes(filtered);
      } else {
        setFilteredShowtimes([]);
      }
    }
  }, [selectedDate, loadedShowtimes]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    //console.log(selectedDate);
    // Reset selected showtime when a new date is selected
    setSelectedShowtime(null);
  };

  // Callback function to handle showtime selection
  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
  };

  const handleShowTimeSelect = (showTime) => {
    if (!selectedDate) {
      setDateSelectionError("Please Select a Date first")
    } else {
      setSelectedShowTime(showTime)
      setSeatCountModalShow(true)
    }
  }


  return (
    <Container>
      {selectedShowtime && (
        <SeatCountModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          showId={selectedShowtime.id}
        />
      )}
      <Stack gap={4} direction="horizontal" className="mt-5">
        <h2>Buy Tickets</h2>
        <UpcomingWeekSelect onDateSelect={handleDateSelect} />
      </Stack>
      <Row className="pt-5">
        <Col>
          <Stack gap={3}>
            <h3>{!isLoading && loadedMovie && loadedMovie.title}</h3>
            {/* <Col className="d-md-none">
              <MovieImageCard size={10} />
            </Col> */}
            <h4 className="my-3">Show Times</h4>
            <Stack gap={5}>
              {!isLoading && showTimeList && (
                <ShowTimes
                  setModalShow={setModalShow}
                  showTimes={filteredShowtimes}
                  onSelect={handleShowtimeSelect} // Pass the callback function
                  //selectedShowtime={selectedShowtime} // Pass the selected showtime
                />
              )}
            </Stack>
          </Stack>
        </Col>
        <Col className="d-none d-md-block">
          {!isLoading && movie && (
            <MovieImageCard img={movie.poster_url} className="m-auto" />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookingPage;
