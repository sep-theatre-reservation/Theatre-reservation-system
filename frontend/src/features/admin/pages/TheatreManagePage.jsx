import { Container, Stack, Col, Row } from 'react-bootstrap'
import AddTheaterComponent from '../components/AddTheaterComponent'
import ShowTheatreComponent from '../components/ShowTheatreComponent'

function TheatreManagePage() {
  return (
    <Container className='pt-5  '>
      <Row >
        <Col lg={6}>
              <AddTheaterComponent />
        </Col>
        <Col lg={6}>
            <ShowTheatreComponent />
        </Col>
      </Row>
    </Container>
  )
}

export default TheatreManagePage