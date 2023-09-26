import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Stack,
} from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import BookingDetailsModal from "../components/BookingDetailsModal";

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
          `http://localhost:3000/api/bookings/user/${auth.userId}`
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

  // Get the current date and time in ISO format
  const currentDateTime = new Date().toISOString();

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
              <ListGroup>
                {bookings.map((booking) => (
                  <ListGroup.Item key={booking.id}>
                    <Row>
                      <Col md={6}>
                        <p>Date: {new Date(booking.date).toLocaleString()}</p>
                        <p>Movie: {booking.movie}</p>
                      </Col>
                      <Col md={6}>
                        <p>Status: {booking.status}</p>
                        <Stack direction="horizontal" gap={3}>
                          {new Date(booking.date) >
                            new Date(currentDateTime) && (
                            <>
                              {booking.status === "Pending" && (
                                <Button variant="success">Confirm</Button>
                              )}
                              {booking.status !== "Cancelled" && (
                                <Button variant="danger">Cancel</Button>
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
            )}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default UserProfilePage;
