import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

const ContactCard = ({ title, contactInfo }) => (
  <Card className='mb-3'>
    <Card.Header style={{fontWeight:'bold'}}>{title}</Card.Header>
    <Card.Body>
      <Card.Text>
        {contactInfo.map((info, index) => (
          <div key={index} className='mb-2'>{info}</div>
        ))}
      </Card.Text>
    </Card.Body>
  </Card>
);

function ContactDetails() {
  const marketingAndAdvertisingInfo = [
    'Phone: 011-5698452 - Anushka',
    'Email: anushka@booking.com',
  ];

  const helpDeskInfo = [
    'Help Desk: (09.00 am - 06.00 pm Monday - Friday)',
    'Phone: 011-8965421',
    'Email: helpdesk@bookingz.com',
  ];

  return (
    <div className='mb-auto'>
      <ContactCard title="Marketing & Advertising" contactInfo={marketingAndAdvertisingInfo} />
      <ContactCard title="Help Desk" contactInfo={helpDeskInfo} />
    </div>
  );
}

export default ContactDetails;
