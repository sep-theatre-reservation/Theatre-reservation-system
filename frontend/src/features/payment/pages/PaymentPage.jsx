import React, { useEffect, useState } from 'react'
import OrderSummary from '../components/OrderSummary'
import ContactDetails from '../components/ContactDetails'
import { Container, Stack, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Paypal from '../components/Paypal'

function PaymentPage() {
  const { bookingId } = useParams()
  const { isLoading, sendRequest } = useHttpClient();
  const [booking, setBooking] = useState();

  useEffect(() => { fetchBooking(); }, [sendRequest]);

  const fetchBooking = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3000/api/bookings/${bookingId}`
      );
      setBooking(responseData.booking);
    } catch (err) {
      /* */
    }
  };

  const confirmBooking = async () => {
    try {
      const responseData = await sendRequest(
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
  };

  const cancelBooking = async () => {
    try {
      const responseData = await sendRequest(
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
              <Paypal onPaymentConfirm={confirmBooking} bookingId={bookingId} onPaymentFail={cancelBooking}/>
            </Stack>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentPage