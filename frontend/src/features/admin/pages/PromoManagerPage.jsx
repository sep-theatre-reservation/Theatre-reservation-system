import { Container, Stack, Col, Row } from 'react-bootstrap'
import AddPromoComponent from '../components/Promotion/AddPromoComponent'
import ShowPromoComponent from '../components/Promotion/ShowPromoComponent'

function PromoManagerPage() {
  return (
        <Container className='pt-5  '>
          <Row >
            <Col lg={6}>
                  <AddPromoComponent />
            </Col>
            <Col lg={6}>
                <ShowPromoComponent/>
            </Col>
          </Row>
        </Container>
  )
}

export default PromoManagerPage