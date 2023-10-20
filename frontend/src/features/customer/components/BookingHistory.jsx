import PropTypes from "prop-types";
import { Button, Col, ListGroup, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "../../shared/components/LoadingOverlay";

const BookingHistory = ({ userBookings, handleShowModal, onCancellation }) => {
  const {
    isLoading: isCancelBookingLoading,
    sendRequest: sendBookingCancelRequest,
  } = useHttpClient();
  const [cancelledBooking, setCancelledBooking] = useState(null);
  const [isCancellingBooking, setIsCancellingBooking] = useState(false); // Track the cancellation request state
  const [showCancelModal, setShowCancelModal] = useState(false); // State for the cancellation confirmation modal

  useEffect(() => {
    const cancelBooking = async () => {
      try {
        const responseData = await sendBookingCancelRequest(
          import.meta.env.VITE_REACT_APP_BASE_URL +
            `/bookings/${cancelledBooking}`,
          "PATCH",
          JSON.stringify({
            status: "Cancelled",
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(responseData);

        onCancellation(cancelledBooking);
      } catch (err) {
        /* */
      } finally {
        setCancelledBooking(null);
        setIsCancellingBooking(false);
      }
    };
    if (isCancellingBooking) {
      cancelBooking();
    }
  }, [
    isCancellingBooking,
    sendBookingCancelRequest,
    onCancellation,
    cancelledBooking,
  ]);

  // Get the current date and time in ISO format
  const currentDateTime = new Date().toISOString();

  // Function to open the cancellation confirmation modal
  const handleOpenCancelModal = (bookingId) => {
    setCancelledBooking(bookingId);
    setShowCancelModal(true);
  };

  // Function to close the cancellation confirmation modal
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  return (
    <React.Fragment>
      {isCancelBookingLoading && <LoadingOverlay asOverlay />}
      <ListGroup>
        {userBookings.map((booking) => (
          <ListGroup.Item key={booking.id}>
            <Row>
              <Col md={6}>
                <p>Date: {new Date(booking.date).toLocaleString()}</p>
                <p>Movie: {booking.movie}</p>
              </Col>
              <Col md={6}>
                <p>Status: {booking.status}</p>
                <Stack direction="horizontal" gap={3}>
                  {new Date(booking.date) > new Date(currentDateTime) && (
                    <>
                      {booking.status === "Pending" && (
                        <Button
                          as={Link}
                          to={`/payment/${booking.id}`}
                          variant="success"
                        >
                          Confirm
                        </Button>
                      )}
                      {booking.status !== "Cancelled" && (
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleOpenCancelModal(booking.id);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </>
                  )}
                  <Button
                    variant="info"
                    onClick={() => {
                      handleShowModal(booking);
                    }}
                  >
                    View Details
                  </Button>
                </Stack>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Cancellation Confirmation Modal */}
      <Modal show={showCancelModal} onHide={handleCloseCancelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this booking?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancelModal}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleCloseCancelModal(); // Close the modal
              setIsCancellingBooking(true);
            }}
          >
            Cancel Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

BookingHistory.propTypes = {
  userBookings: PropTypes.array,
  handleShowModal: PropTypes.func,
  onCancellation: PropTypes.func,
};

export default BookingHistory;
