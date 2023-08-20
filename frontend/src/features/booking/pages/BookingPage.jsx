import React from 'react'
import UpcomingWeekSelect from '../components/UpcomingWeekDropdown'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import MovieImageCard from '../../shared/components/MovieImageCard'
import { FaMapMarkerAlt } from 'react-icons/fa';
function BookingPage() {
  return (
    <Container className='pt-5'>
      <Stack gap={3}>
        <h2>Buy Tickets</h2>
        <UpcomingWeekSelect />
        <h3>Oppenheimer</h3>
        <Row>
          <Col className='d-md-none'>
            <MovieImageCard size={10} />
          </Col>
          <Col md={6}>
            <h4 className='mb-4'>Show Times</h4>
            <Stack gap={5}>
              <Stack >
                <div>
                  <FaMapMarkerAlt size={20} className='mb-2'/>
                  <span className='mb-0 lead'>LIBERTY BY SCOPE CINEMAS</span>
                  <hr className="mt-0" />
                </div>
                <Stack direction='horizontal' gap={3}>
                  <Button variant="outline-secondary">5.30 PM</Button>
                  <Button variant="outline-secondary">7.30 PM</Button>
                  <Button variant="outline-secondary">9.30 PM</Button>
                </Stack>
              </Stack>
              <Stack >
                <div>
                  <FaMapMarkerAlt size={20} className='mb-2'/>
                  <span className='mb-0 lead'>LIBERTY BY SCOPE CINEMAS</span>
                  <hr className="mt-0" />
                </div>
                <Stack direction='horizontal' gap={3}>
                  <Button variant="outline-secondary">5.30 PM</Button>
                  <Button variant="outline-secondary">7.30 PM</Button>
                  <Button variant="outline-secondary">9.30 PM</Button>
                </Stack>
              </Stack>


            </Stack>
          </Col>
          <Col className='d-none d-md-block'>
            <MovieImageCard className="m-auto" />
          </Col>
        </Row>
      </Stack>
    </Container>
  )
}

export default BookingPage