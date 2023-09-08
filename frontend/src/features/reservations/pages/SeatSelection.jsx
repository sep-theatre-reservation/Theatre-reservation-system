import Seat from "../components/Seat";
import "./SeatSelection.css";
import { useContext, useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const SeatSelection = () => {
  const [selected, setSelected] = useState([]);
  const { sendRequest } = useHttpClient();
  const [selectedShow, setSelectedShow] = useState();

  const [rows, setRows] = useState(null);
  const [cols, setCols] = useState(null);
  const [SEATS, setSeats] = useState(null);

  const { showId, seatCount } = useParams();
  const [selectedSeatCount, setSelectedSeatCount] = useState(0);
  //const showId = "64f50afcb3c21042568e874d";
  let bookingId = 1;
  const createBooking = async () => {
    try {
      const responseData = await sendAddBookingRequest(
        "http://localhost:3000/api/bookings",
        "POST",
        JSON.stringify({
          show: showId,
          seatCount: seatCount,
          customer: auth.user,
          status: "Pending",
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      bookingId = responseData.id;
    } catch (err) {
      /* */
    }
  };

  useEffect(() => {
    const fetchShow = async () => {
      try {
        console.log(`http://localhost:3000/api/shows/${showId}`);
        const responseData = await sendRequest(
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
  }, [sendRequest, showId]);

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

  const btnContinueHandler = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3000/api/shows/${showId}`,
        "PATCH",
        JSON.stringify({
          selectedSeats: selected,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
    } catch (err) {
      /* */
    }
  };

  let rowAr = [];
  let Sid = 0;
  let sec1 = Math.ceil(cols / 2);
  let sec2 = Math.floor(cols / 2);

  //putting seatId to rows
  for (let row = 0; row < rows; row++) {
    let secAr1 = [];
    let secAr2 = [];

    for (let i = 0; i < sec1; i++) {
      secAr1.push(
        <Seat
          key={SEATS[Sid].id}
          id={SEATS[Sid].id}
          onSelect={handleSelect}
          available={SEATS[Sid].availability}
        />
      );
      Sid++;
    }
    for (let i = 0; i < sec2; i++) {
      secAr2.push(
        <Seat
          key={SEATS[Sid].id}
          id={SEATS[Sid].id}
          onSelect={handleSelect}
          available={SEATS[Sid].availability}
        />
      );
      Sid++;
    }
    rowAr.push(
      <tr key={row}>
        <td key="sec1">{secAr1}</td>
        <td key="sec2">{secAr2}</td>
      </tr>
    );
  }

  return (
    <>
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
            {/* {selectedSeatCount == seatCount ? */}
            {true ? (
              <Button
                as={Link}
                to={`/payment/${bookingId}`}
                variant="primary"
                onClick={btnContinueHandler}
              >
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
