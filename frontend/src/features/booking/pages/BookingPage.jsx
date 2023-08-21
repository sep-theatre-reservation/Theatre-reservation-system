import React from 'react'
import UpcomingWeekSelect from '../components/UpcomingWeekDropdown'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import MovieImageCard from '../../shared/components/MovieImageCard'
import SeatCountModal from '../components/SeatCountModal';
import ShowTimes from '../components/ShowTimes';

function BookingPage() {

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container >
      <SeatCountModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
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
              <ShowTimes/>
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