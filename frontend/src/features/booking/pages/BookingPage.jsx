import React from 'react'
import UpcomingWeekSelect from '../components/UpcomingWeekDropdown'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import MovieImageCard from '../../shared/components/MovieImageCard'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function BookingPage() {
  return (
    <Container >
      <Stack gap={4} direction='horizontal' className='mt-5'>
        <h2>Buy Tickets</h2>
        <UpcomingWeekSelect />
      </Stack>
      <Row className='pt-5'>
        <Col>
          <Stack gap={3}>
            <h3>Oppenheimer</h3>
            <Col className='d-md-none'>
              <MovieImageCard size={10} />
            </Col>
            <h4 className='my-3'>Show Times</h4>
            <Stack gap={5}>
              <Stack >
                <div>
                  <FaMapMarkerAlt size={20} className='mb-2' />
                  <span className='mb-0 lead'>LIBERTY BY SCOPE CINEMAS</span>
                  <hr className="mt-0" />
                </div>
                <Stack direction='horizontal' gap={3}>
                  <Button as={Link} to="/payment" variant="outline-secondary" link>5.30 PM</Button>
                  <Button as={Link} to="/payment" variant="outline-secondary">7.30 PM</Button>
                  <Button as={Link} to="/payment" variant="outline-secondary">9.30 PM</Button>
                </Stack>
              </Stack>
              <Stack >
                <div>
                  <FaMapMarkerAlt size={20} className='mb-2' />
                  <span className='mb-0 lead'>LIBERTY BY SCOPE CINEMAS</span>
                  <hr className="mt-0" />
                </div>
                <Stack direction='horizontal' gap={3}>
                  <Button as={Link} to="/payment" variant="outline-secondary" link>5.30 PM</Button>
                  <Button as={Link} to="/payment" variant="outline-secondary">7.30 PM</Button>
                  <Button as={Link} to="/payment" variant="outline-secondary">9.30 PM</Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Col>
        <Col className='d-none d-md-block'>
          <MovieImageCard className="m-auto" />
        </Col>
      </Row>
    </Container>
  )
}

export default BookingPage