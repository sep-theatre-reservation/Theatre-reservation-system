import React, { useState } from 'react';
import { Form, Button, Card, Container, Stack } from 'react-bootstrap';
import ContactDetails from './ContactDetails';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <Container className='pt-5'>
      <Stack direction='horizontal' gap={5}>
        <Card className='w-50 mb-auto'>
          <Card.Body>
            <Card.Title>
              <h3 style={{ fontWeight: 'bold' }}>Contact Us</h3>
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className='mb-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="email" className='mb-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className='mt-3 float-end'>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <ContactDetails className='mb-auto'></ContactDetails>
      </Stack>
    </Container>
  );
}

export default ContactUsPage;
