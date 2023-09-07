import Card from 'react-bootstrap/Card';

function OrderSummary() {
    return (
        <Card  className='mb-3'>
            <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <hr />
            </Card.Body>
            <Card.Footer>
                <h5>Amount Payable</h5>
            </Card.Footer>
        </Card>
    )
}

export default OrderSummary