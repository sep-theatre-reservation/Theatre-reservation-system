//import Seat from "../components/Seat";
import "./SeatSelection.css";
import { useContext, useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import useSeatRows from "../../shared/hooks/seat-layout-hook";
import ErrorModal from "../../shared/components/ErrorModal";
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa";

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
        //console.log(import.meta.env.VITE_REACT_APP_BASE_URL +`/shows/${showId}`);
        const responseData = await sendShowRequest(
          import.meta.env.VITE_REACT_APP_BASE_URL + `/shows/${showId}`

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
        import.meta.env.VITE_REACT_APP_BASE_URL + `/shows/${showId}`,

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
      navigate(`/payment/${bookingId}`, { replace: true });
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
      <div className="custom-background4"></div>
      <Container style={{ paddingBottom: "150px", paddingTop: "50px" }}>
        <Stack>
          <Stack direction="horizontal">
            <FaMapMarkerAlt size={30} className="me-2 mb-2" />
            <h2
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                marginRight: "50px",
              }}
            >
              {selectedShow && selectedShow.theatre.theatreName}
            </h2>
            <FaRegClock size={30} className="me-2 mb-2" />
            {selectedShow && (
              <h2 style={{ fontWeight: "bold" }}>
                {new Date(selectedShow.showtime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </h2>
            )}
          </Stack>
          <div className="m-auto mt-5 py-5">
            <table>
              <tbody>{rowAr}</tbody>
            </table>
          </div>
          <div className="screen mb-4">screen</div>
          <hr className="container" />
          <Stack direction="horizontal" gap={3} className="m-auto">
            <Button onClick={() => navigate(-1)} variant="dark">
              Back
            </Button>
            {isButtonEnabled ? (
              <Button variant="success" onClick={btnContinueHandler}>
                Continue
              </Button>
            ) : (
              <Button disabled variant="success">
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
