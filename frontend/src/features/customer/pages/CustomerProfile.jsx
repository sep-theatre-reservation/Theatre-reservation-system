import { Container, Row, Col, Image } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import BookingDetailsModal from "../components/BookingDetailsModal";
import BookingHistory from "../components/BookingHistory";

const UserProfilePage = () => {
  const auth = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();
  const [showModal, setShowModal] = useState(false);
  const [viewedBooking, setViewedBooking] = useState(null);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_REACT_APP_BASE_URL +
            `/bookings/user/${auth.userId}`
        );
        setBookings(responseData.bookings);
      } catch (err) {
        /* */
      }
    };
    getBookings();
  }, [auth.userId, sendRequest]);

  const handleShowModal = (booking) => {
    setViewedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setViewedBooking(null);
    setShowModal(false);
  };

  // Callback function to update status in the movies array
  const handleCancellation = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking
      )
    );
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingOverlay asOverlay />}
      {viewedBooking && (
        <BookingDetailsModal
          show={showModal}
          onHide={handleCloseModal}
          booking={viewedBooking}
        />
      )}

      <Container className="mt-5">
        <Row>
          <Col md={4}>
            <Image src={auth.user.picture} alt="User Profile" fluid />
          </Col>
          <Col md={8}>
            <h2>{auth.user.name}</h2>
            <p>Email: {auth.user.email}</p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h3>Booking History</h3>
            {!isLoading && bookings && (
              <BookingHistory
                userBookings={bookings}
                handleShowModal={handleShowModal}
                onCancellation={handleCancellation}
              />
            )}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default UserProfilePage;
