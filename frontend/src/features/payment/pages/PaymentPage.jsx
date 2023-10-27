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
  const { sendRequest: sendBookingCancelRequest } = useHttpClient();
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
  }, []);

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
          text: "Hi , Booking ID: AAMM0000010052. Seats: ODC - C6, C7, 2 seat(s) for Oppenheimer  on Sat, 22 Jul, 2023 09:15pm at Amity Lite 3D Cinema: Maharagama(SCREEN1)."
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

  const cancelBooking = async () => {
    try {
      const responseData = await sendBookingCancelRequest(
        import.meta.env.VITE_REACT_APP_BASE_URL + `/bookings/${bookingId}`,

        "PATCH",
        JSON.stringify({
          status: "Cancelled",
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
          <h1
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
              marginRight: "50px",
              marginBottom: "0px",
            }}
          >
            EXPEN4BLES
          </h1>
          <div className="w-50">
            <hr />
          </div>
          <Stack direction="horizontal" gap={4} className="mb-5">
            {/* {console.log(booking.show)} */}
            <div>
              <FaMapMarkerAlt size={20} className="me-2 mb-2" />
              Majestic Cineplex: Colombo
            </div>
            <div>
              <FaCalendarAlt size={20} className="me-2 mb-2" />
              25/10/2023
            </div>
            <div>
              <FaRegClock size={20} className="me-2 mb-2" />
              6.30 P.M.
            </div>
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
