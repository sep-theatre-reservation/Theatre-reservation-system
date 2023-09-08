import React, { useEffect, useState } from 'react'
import OrderSummary from '../components/OrderSummary'
import ContactDetails from '../components/ContactDetails'
import { Container, Stack, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Paypal from '../components/Paypal'

function PaymentPage() {
  const { bookingId } = useParams()
  const { sendRequest : sendBookingRequest } = useHttpClient();
  const {  sendRequest : sendEmailRequest } = useHttpClient();
  const [booking, setBooking] = useState();

  useEffect(() => { fetchBooking(); }, [sendBookingRequest]);

  const fetchBooking = async () => {
    try {
      const responseData = await sendBookingRequest(
        `http://localhost:3000/api/bookings/${bookingId}`
      );
      setBooking(responseData.booking);
    } catch (err) {
      /* */
    }
  };

  const sendTicketEmail=async()=>{
    try {
      const responseData = await sendEmailRequest(
        `http://localhost:3000/api/email`,
        "POST",
        JSON.stringify({
          to: "ipjayawick@gmail.com",
          subject:"movie tickets",
          text:"here is the ticket"
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      /* */
    }
  }

  const confirmBooking = async () => {
    try {
      const responseData = await sendBookingRequest(
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
    sendTicketEmail()
  };

  const cancelBooking = async () => {
    try {
      const responseData = await sendBookingRequest(
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
    <Container className='pt-5'>
      <Row>
        <Col lg={6}>
          <ContactDetails />
        </Col>
        <Col lg={6}>
          <Stack className='w-75'>
            <OrderSummary/>
            <Stack direction='horizontal'>
              <h5>Confirm Payment</h5>
              <Paypal onPaymentConfirm={sendTicketEmail} bookingId={bookingId} onPaymentFail={cancelBooking}/>
            </Stack>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentPage