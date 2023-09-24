import { Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function OrderSummary() {
    return (
        <Card className='mb-3 bg-light'>
            <Card.Body>
                <Card.Title style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Purchase Summary</Card.Title>
                <hr />
                <Card.Text>
                    <Stack direction='horizontal'>
                        <div>
                            Adult Tickets x 2
                        </div>
                        <div className='ms-auto'>
                            800 LKR
                        </div>
                    </Stack>
                    <Stack direction='horizontal' className='mt-2'>
                        <div>
                            Promotions
                        </div>
                        <div className='ms-auto'>
                            200 LKR
                        </div>
                    </Stack>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Stack direction='horizontal'>

                <h5>Amount Payable</h5>
                <h6 className='ms-auto fw-bold'>600 LKR</h6>
                </Stack>
            </Card.Footer>
        </Card>
    )
}

export default OrderSummary