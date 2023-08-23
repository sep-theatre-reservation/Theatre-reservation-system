import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Stack } from 'react-bootstrap';
function AddTheaterComponent() {
    return (
        <Card style={{ width: '30rem' }}>
            <Card.Body>
                <Card.Title>Add Theatre</Card.Title>
                <Form>
                    <Form.Group controlId="cardName" className='mb-2'>
                        <Form.Label>Theatre Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Theatre Name" />
                    </Form.Group>
                    <Stack direction='horizontal' gap={3}>
                        <Form.Group controlId="cardNumber" className='mb-2'>
                            <Form.Label>Rows</Form.Label>
                            <Form.Control type="text" placeholder="Enter Row Count" />
                        </Form.Group>
                        <Form.Group controlId="cardNumber" className='mb-2'>
                            <Form.Label>Columns</Form.Label>
                            <Form.Control type="text" placeholder="Enter Column Count" />
                        </Form.Group>
                    </Stack>
                    <Button variant="primary" type="submit" className='mt-2 float-end me-3'>
                        Add
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddTheaterComponent