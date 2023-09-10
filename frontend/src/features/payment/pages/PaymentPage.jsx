import React, { useContext, useEffect, useState } from 'react'
import OrderSummary from '../components/OrderSummary'
import ContactDetails from '../components/ContactDetails'
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
    try {
      const responseData = await sendEmailRequest(
        `http://localhost:3000/api/email`,
        "POST",
        JSON.stringify({
          to: "ipjayawick@gmail.com",
          subject: "Movie Ticket",
          text: "here is the ticket"
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      /* */
    }
  }

  const createPaymentData = async (dateTime, amount) => {
    try {
      const responseData = await sendCreatePaymentDataRequest(
        `http://localhost:3000/api/payment`,
        "POST",
        JSON.stringify({
          booking: bookingId,
          dateTime: dateTime,
          amount: amount
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err)
    }
  }

  const confirmBooking = async () => {
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
    // sendTicketEmail()
    // createPaymentData()
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
      {/* <GuestModal
        bookingId={bookingId}
        show={showGuestModal}
        onHide={() => setShowGuestModal(false)}
      /> */}
      < Container className='pt-5' >
        <Row>
          {/* <Col lg={6}>
            <ContactDetails />
          </Col> */}
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