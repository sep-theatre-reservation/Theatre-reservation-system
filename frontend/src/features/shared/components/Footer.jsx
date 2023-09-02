import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
    return (
        <div className='bg-dark text-light pt-5'    >
            <Container>
                <Row>
                    <Col md={6}>
                        <h4>Contact Us</h4>
                        <p>Email: info@theatresystem.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </Col>
                    <Col md={6}>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/" style={{}}>Home</a></li>
                            <li><a href="/movies" style={{}}>Movies</a></li>
                            <li><a href="/schedule" style={{}}>Schedule</a></li>
                            <li><a href="/booking" style={{}}>Booking</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className="text-center mt-3">
                <p className='lead'>© 2023 Theatre Reservation System</p>className='lead'
            </div>
        </div>
    )
}

export default Footer