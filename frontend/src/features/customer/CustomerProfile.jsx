import { Container, Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import { AuthContext } from "../shared/context/auth-context";
import { useContext } from "react";

const UserProfilePage = () => {
  const auth = useContext(AuthContext);

  // Sample user data
  const userData = {
    username: auth.user.name,
    email: auth.user.email,
    profilePicture: auth.user.picture, // Replace with the actual URL of the profile picture
    bookings: [
      {
        id: 1,
        date: "2023-09-22T14:00:00", // Booking date in ISO format
        movie: "Movie Title 1",
        status: "Confirmed",
      },
      {
        id: 2,
        date: "2023-10-05T16:30:00", // Booking date in ISO format
        movie: "Movie Title 2",
        status: "Pending",
      },
      {
        id: 3,
        date: "2023-09-15T10:00:00", // Booking date in ISO format
        movie: "Movie Title 3",
        status: "Confirmed",
      },
      {
        id: 4,
        date: "2023-08-30T18:45:00", // Booking date in ISO format
        movie: "Movie Title 4",
        status: "Cancelled",
      },
      {
        id: 5,
        date: "2023-10-12T20:15:00", // Booking date in ISO format
        movie: "Movie Title 5",
        status: "Confirmed",
      },
    ],
  };

  // Get the current date and time in ISO format
  const currentDateTime = new Date().toISOString();

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Image src={userData.profilePicture} alt="User Profile" fluid />
        </Col>
        <Col md={8}>
          <h2>{userData.username}</h2>
          <p>Email: {userData.email}</p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>Booking History</h3>
          <ListGroup>
            {userData.bookings.map((booking) => (
              <ListGroup.Item key={booking.id}>
                <Row>
                  <Col md={6}>
                    <p>Date: {new Date(booking.date).toLocaleString()}</p>
                    <p>Movie: {booking.movie}</p>
                  </Col>
                  <Col md={6}>
                    <p>Status: {booking.status}</p>
                    {new Date(booking.date) > new Date(currentDateTime) && (
                      <>
                        {booking.status === "Pending" && (
                          <Button variant="success" className="mr-2">
                            Confirm
                          </Button>
                        )}
                        <Button variant="danger">Cancel</Button>
                      </>
                    )}
                    <Button variant="info" className="ml-2">
                      View Details
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
