import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Stack } from 'react-bootstrap'
import { FaFacebookSquare,FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa'
function Footer() {
    return (
        <div className=' text-light pt-5 pb-2' style={{ backgroundColor: '#05011a' }}>
            <Container>
                <Row>
                    <Col md={6}>
                        <h4 className='mb-4 fw-bold'>Contact Us</h4>
                        <div>Email: info@theatresystem.com</div>
                        <div>Phone: (+94) 11-123-985</div>
                    </Col>
                    <Col md={6}>
                        <h4 className='mb-4 fw-bold'>Follow Us On</h4>
                        <Stack direction='horizontal' gap={4}>
                            <div>
                                <FaFacebookSquare size={20} className="mb-2 me-1" />
                                <span className="mb-0 lead">Facebook</span>
                            </div>
                            <div>
                                <FaInstagramSquare size={20} className="mb-2 me-1" />
                                <span className="mb-0 lead">Instagram</span>
                            </div>
                            <div>
                                <FaTwitterSquare size={20} className="mb-2 me-1" />
                                <span className="mb-0 lead">Twitter</span>
                            </div>
                        </Stack>
                    </Col>
                </Row>
            </Container>
            <div className="text-center mt-4" style={{backgroundColor:'#0a042e'}}>
                <p className=' m-0 py-1'>© 2023 Theatre Reservation System</p>
            </div>
        </div>
    )
}

export default Footer