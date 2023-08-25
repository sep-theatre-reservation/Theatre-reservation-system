import { Container, Stack, Col, Row } from 'react-bootstrap'
import AddTheaterComponent from '../components/AddTheaterComponent'
import ShowTheatreComponent from '../components/ShowTheatreComponent'
import AddPromo from '../components/AddPromo'
import ShowPromoComponent from '../components/ShowPromoComponent'

function PromoManagerPage() {
  return (
        <Container className='pt-5  '>
          <Row >
            <Col lg={6}>
                  <AddPromo />
            </Col>
            <Col lg={6}>
                <ShowPromoComponent/>
            </Col>
          </Row>
        </Container>
  )
}

export default PromoManagerPage