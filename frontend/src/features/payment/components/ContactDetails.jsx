import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ContactDetails() {
    return (
        <Card style={{ width: '30rem' }}>
            <Card.Header as="h5">Contact Details</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                        />
                    </Form.Group>

                    <Button variant="primary" >
                        Continue
                    </Button>
                </Form>
            </Card.Body>
        </Card>


    )
}

export default ContactDetails