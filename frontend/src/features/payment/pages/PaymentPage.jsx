import React from 'react'
import OrderSummary from '../components/OrderSummary'
import ContactDetails from '../components/ContactDetails'
import { Container, Stack, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function PaymentPage() {
  const { bookingId } = useParams()
  return (
    <Container className='pt-5  '>
      <Row >
        <Col md={6}>
          <Stack gap={4} className='mr-0'>
            <div className='d-lg-none'>
              <OrderSummary />
            </div>
            <ContactDetails />
          </Stack>
        </Col>
        <Col md={6}>
          <div className='d-none d-lg-block'>
            <OrderSummary />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentPage