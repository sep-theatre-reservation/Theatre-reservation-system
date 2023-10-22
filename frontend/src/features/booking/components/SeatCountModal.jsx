import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SeatCountSelector from "../components/SeatCountSelector";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import PropTypes from "prop-types";

const SeatCountModal = ({ show, onHide, showId }) => {
  const [seatCount, setSeatCount] = useState("0");
  const [availability, setAvailability] = useState(null);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const getAvailability = async () => {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_REACT_APP_BASE_URL + `/shows/seats/${showId}`
        );
        setAvailability(responseData.availableSeats);
      } catch (err) {
        /* */
      }
    };
    getAvailability();
  }, [sendRequest, showId]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      data-bs-theme="dark"
    >
      <Modal.Header closeButton className="bg-dark ">
        <Modal.Title id="contained-modal-title-vcenter" className="text-white">
          How many Seats?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Stack>
          {isLoading && <LoadingOverlay asOverlay />}

          {!isLoading && availability > 0 && (
            <SeatCountSelector
              setCount={(count) => setSeatCount(count)}
              availability={availability}
            />
          )}
          {availability == 0 && (
            <div
              style={{
                color: "red",
                fontSize: "18px",
              }}
            >
              Sorry all seats are booked..!!
            </div>
          )}
          <div className="ms-auto p-2">
            {seatCount == "0" ? (
              <Button disabled variant="outline-primary">
                Select Seats
              </Button>
            ) : (
              <Button
                as={Link}
                to={`/seats/${showId}/${seatCount}`}
                onClick={onHide}
                variant="outline-primary"
              >
                Select Seats
              </Button>
            )}
          </div>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

SeatCountModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  showId: PropTypes.string,
};

export default SeatCountModal;
