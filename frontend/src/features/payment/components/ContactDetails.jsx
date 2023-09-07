import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ContactDetails() {
    return (
        <Card className='w-75 mb-4'>
            <Card.Body>
                <Card.Title>Contact Details</Card.Title>
                <Form>
                    <Form.Group controlId="formEmail" className='mb-2'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPhoneNumber" className='mb-2'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                        />
                    </Form.Group>
                    <Button variant="primary" className='mt-2' >
                        Continue
                    </Button>
                </Form>
            </Card.Body>
        </Card>


    )
}

export default ContactDetails