import { useContext, useEffect, useState } from "react";
import OrderSummary from "../components/OrderSummary";
import { Container, Stack, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Paypal from "../components/Paypal";
import GuestModal from "../../reservations/components/GuestModal";
import { AuthContext } from "../../shared/context/auth-context";
import { FaCalendarAlt, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";

function PaymentPage() {
  const auth = useContext(AuthContext);
  const { bookingId } = useParams();
  const { sendRequest: sendBookingFetchRequest } = useHttpClient();
  const { sendRequest: sendBookingConfirmRequest } = useHttpClient();
  const { sendRequest: sendEmailRequest } = useHttpClient();
  const { sendRequest: sendCreatePaymentDataRequest } = useHttpClient();
  const [booking, setBooking] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showGuestModal, setShowGuestModal] = useState(true);

  useEffect(() => {
    if (booking !== null) {
      console.log(booking);
      setOrderDetails({
        id: booking.id,
        ticketPrice: booking.show.theatre.ticketPrice,
        ticketsCount: booking.seats.length,
      });
    }
  }, [booking]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const responseData = await sendBookingFetchRequest(
          import.meta.env.VITE_REACT_APP_BASE_URL + `/bookings/${bookingId}`
        );
        setBooking(responseData.booking);
      } catch (err) {
        // Handle errors if needed
        console.log(err);
      }
    };
    fetchBooking();
  }, [sendBookingFetchRequest, bookingId]);

  const sendTicketEmail = async () => {
    console.log(auth.isLoggedIn);
    const email = auth.isLoggedIn ? auth.user.email : auth.guestEmail;
    console.log(auth.user.email);
    console.log(auth.guestEmail);
    try {
      const responseData = await sendEmailRequest(
        import.meta.env.VITE_REACT_APP_BASE_URL + `/email`,

        "POST",
        JSON.stringify({
          to: email,
          subject: "Booking.Lk You Ticket",
          text: `We're thrilled to confirm your upcoming movie experience! Here are the details of your booked tickets:

          Booking ID: ${bookingId}. Seats: ODC - ${booking.seats.join(
            ", "
          )} seat(s) for ${booking.show.movie.title}  on ${`${new Date(
            booking.show.showtime
          ).getFullYear()}-${
            new Date(booking.show.showtime).getMonth() + 1
          }-${new Date(booking.show.showtime).getDate()}`} at ${
            booking.show.theatre.theatreName
          }.`
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

  const createPaymentData = async (paymentData) => {
    try {
      // console.log(paymentData)
      const responseData = await sendCreatePaymentDataRequest(
        import.meta.env.VITE_REACT_APP_BASE_URL + `/payment`,

        "POST",
        JSON.stringify({
          booking: bookingId,
          paypalPayment: paymentData,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmBooking = async (paymentData) => {
    try {
      const responseData = await sendBookingConfirmRequest(
        import.meta.env.VITE_REACT_APP_BASE_URL + `/bookings/${bookingId}`,

        "PATCH",
        JSON.stringify({
          status: "Confirmed",
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
    } catch (err) {
      /* */
    }
    createPaymentData(paymentData);
    sendTicketEmail();
  };

  function formatDateToTime(inputDateStr) {
    const inputDate = new Date(inputDateStr);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return inputDate.toLocaleTimeString([], options);
  }
  return (
    <>
      {!auth.isLoggedIn && (
        <GuestModal
          bookingId={bookingId}
          show={showGuestModal}
          onHide={() => {
            setShowGuestModal(false);
          }}
        />
      )}
      <Container className="py-5" style={{ minHeight: "80vh" }}>
        <Row>
          {booking && booking.show && (
            <h1
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                marginRight: "50px",
                marginBottom: "0px",
              }}
            >
              {booking.show.movie.title}
            </h1>
          )}
          <div className="w-50">
            <hr />
          </div>
          <Stack direction="horizontal" gap={4} className="mb-5">
            {/* {console.log(booking.show)} */}
            {/* Conditional rendering based on the existence of booking.show */}
            {booking && booking.show && (
              <div>
                <FaMapMarkerAlt size={20} className="me-2 mb-2" />
                {booking.show.theatre.theatreName}
              </div>
            )}
            {booking && booking.show && (
              <div>
                <FaCalendarAlt size={20} className="me-2 mb-2" />
                {`${new Date(booking.show.showtime).getFullYear()}-${
                  new Date(booking.show.showtime).getMonth() + 1
                }-${new Date(booking.show.showtime).getDate()}`}
              </div>
            )}
            {booking && booking.show && (
              <div>
                <FaRegClock size={20} className="me-2 mb-2" />
                {formatDateToTime(booking.show.showtime)}
              </div>
            )}
          </Stack>
          <Col lg={6}>
            <Stack className="w-75">
              <OrderSummary />
              <Stack direction="horizontal">
                <h5 style={{ fontWeight: "bold" }}>Confirm Payment</h5>
                {orderDetails && (
                  <Paypal
                    onPaymentConfirm={confirmBooking}
                    orderDetails={orderDetails}
                  />
                )}
              </Stack>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PaymentPage;
