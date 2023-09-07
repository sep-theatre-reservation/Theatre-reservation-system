import Card from 'react-bootstrap/Card';
import Paypal from './Paypal';

function OrderSummary() {
    return (
        <Card style={{ width: '30rem' }}>
            <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <hr />
            </Card.Body>
            <Card.Footer>Amount Payable</Card.Footer>
            <Paypal/>
        </Card>
    )
}

export default OrderSummary