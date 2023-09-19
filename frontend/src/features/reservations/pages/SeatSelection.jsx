//import Seat from "../components/Seat";
import "./SeatSelection.css";
import { useContext, useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import useSeatRows from "../../shared/hooks/seat-layout-hook";
import ErrorModal from "../../shared/components/ErrorModal";

const SeatSelection = () => {
  const auth = useContext(AuthContext);
  const { sendRequest: sendShowRequest } = useHttpClient();
  const {
    error: reserveError,
    sendRequest: sendReserveRequest,
    clearError: clearReserveError,
  } = useHttpClient();

  const [selected, setSelected] = useState([]);
  const [selectedShow, setSelectedShow] = useState();

  const [rows, setRows] = useState(null);
  const [cols, setCols] = useState(null);
  const [SEATS, setSeats] = useState(null);

  const [bookingId, setBookingId] = useState(null);

  const navigate = useNavigate();

  const { showId, seatCount } = useParams();

  useEffect(() => {
    const fetchShow = async () => {
      try {
        console.log(`http://localhost:3000/api/shows/${showId}`);
        const responseData = await sendShowRequest(
          `http://localhost:3000/api/shows/${showId}`
        );
        setSelectedShow(responseData.show);
        setRows(responseData.show.theatre.rows);
        setCols(responseData.show.theatre.cols);
        setSeats(responseData.show.showSeats);
      } catch (err) {
        /* */
      }
    };

    fetchShow();

    //console.log(loadedShowtimes);
  }, [sendShowRequest, showId]);

  const handleSelect = (selectedId, remove) => {
    if (!remove) {
      setSelected((selectedList) => [...selectedList, selectedId]);
    } else {
      setSelected((selectedList) =>
        selectedList.filter((seat) => seat != selectedId)
      );
    }
  };

  //side effect updating...
  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const reserveSeats = async () => {
    try {
      const responseData = await sendReserveRequest(
        `http://localhost:3000/api/shows/${showId}`,
        "PATCH",
        JSON.stringify({
          selectedSeats: selected,
          user: auth.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      setBookingId(responseData.bookingId);
    } catch (err) {
      /* */
    }
  };

  useEffect(() => {
    if (bookingId !== null) {
      navigate(`/payment/${bookingId}`);
    }
  }, [bookingId, navigate]);

  const btnContinueHandler = async () => {
    reserveSeats();
  };

  const rowAr = useSeatRows(cols, rows, SEATS, handleSelect);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (selected.length == seatCount) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [selected, seatCount]);

  return (
    <>
      <ErrorModal
        error={reserveError}
        onClear={() => {
          clearReserveError();
          window.location.reload();
        }}
      />

      <Container className="pt-4">
        <Stack>
          <h1>{selectedShow && selectedShow.theatre.theatreName}</h1>
          <div className="m-auto mt-3 py-5">
            <table>
              <tbody>{rowAr}</tbody>
            </table>
          </div>
          <div className="screen mb-4">screen</div>
          <hr className="container" />
          <Stack direction="horizontal" gap={3} className="m-auto">
            <Button as={Link} to="/booking" variant="secondary">
              Back
            </Button>

            {isButtonEnabled ? (
              <Button variant="primary" onClick={btnContinueHandler}>
                Continue
              </Button>
            ) : (
              <Button disabled variant="primary">
                Continue
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default SeatSelection;
