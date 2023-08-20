import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CardDetails() {
  return (
    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>Payment Details</Card.Title>
        <Form>
          <Form.Group controlId="cardNumber" className='mb-2'>
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="Enter card number" />
          </Form.Group>

          <Form.Group controlId="cardName" className='mb-2'>
            <Form.Label>Cardholder Name</Form.Label>
            <Form.Control type="text" placeholder="Enter cardholder name" />
          </Form.Group>

          <Form.Group controlId="expirationDate" className='mb-2'>
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control type="text" placeholder="MM/YY" />
          </Form.Group>

          <Form.Group controlId="cvv" className='mb-2'>
            <Form.Label>CVV</Form.Label>
            <Form.Control type="text" placeholder="Enter CVV" />
          </Form.Group>

          <Button variant="primary" type="submit" className='mt-2'>
            Pay Now
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default CardDetails