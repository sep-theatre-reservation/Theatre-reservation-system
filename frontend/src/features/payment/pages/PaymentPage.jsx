import React, { useContext, useEffect, useState } from 'react'
import OrderSummary from '../components/OrderSummary'
import { Container, Stack, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Paypal from '../components/Paypal'
import GuestModal from '../../reservations/components/GuestModal'
import { AuthContext } from "../../shared/context/auth-context";

function PaymentPage() {
  const auth = useContext(AuthContext);
  const { bookingId } = useParams()
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
      console.log(booking)
      setOrderDetails({
        id: booking.id,
        ticketPrice: booking.show.theatre.ticketPrice,
        ticketsCount: booking.seats.length
      });
    }
  }, [booking]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const responseData = await sendBookingFetchRequest(
          `http://localhost:3000/api/bookings/${bookingId}`
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
    console.log(auth.isLoggedIn)  
    const email = auth.isLoggedIn ? auth.user.email : auth.guestEmail;
    console.log(auth.user.email)
    console.log(auth.guestEmail)
    try {
      const responseData = await sendEmailRequest(
        `http://localhost:3000/api/email`,
        "POST",
        JSON.stringify({
          to: email,
          subject: "Movie ticket",
          text: "heres the ticket"
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      /* */
    }
  }

  const createPaymentData = async (paymentData) => {
    try {
      // console.log(paymentData)
      const responseData = await sendCreatePaymentDataRequest(
        `http://localhost:3000/api/payment`,
        "POST",
        JSON.stringify({
          booking: bookingId,
          paypalPayment: paymentData
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData)
    } catch (err) {
      console.log(err)
    }
  }

  const confirmBooking = async (paymentData) => {
    try {
      const responseData = await sendBookingConfirmRequest(
        `http://localhost:3000/api/bookings/${bookingId}`,
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
    createPaymentData(paymentData)
    sendTicketEmail()
  };

  const cancelBooking = async () => {
    try {
      const responseData = await sendBookingCancelRequest(
        `http://localhost:3000/api/bookings/${bookingId}`,
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
          onHide={() => {setShowGuestModal(false)}}
          />
      )}
      < Container className='pt-5' >
        <Row>
          <Col lg={6}>
            <Stack className='w-75'>
              <OrderSummary />
              <Stack direction='horizontal'>
                <h5>Confirm Payment</h5>
                {orderDetails && (
                  <Paypal onPaymentConfirm={confirmBooking} orderDetails={orderDetails} />
                )}
              </Stack>
            </Stack>
          </Col>
        </Row>
      </Container >
    </>
  )
}

export default PaymentPage