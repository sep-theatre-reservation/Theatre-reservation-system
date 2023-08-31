import { Container, Col, Row } from 'react-bootstrap'
import AddMovieComponent from '../components/AddMovieComponent'
import ShowMoviesComponent from '../components/ShowMoviesComponent'

function MovieManagerPage() {
    return (
        <Container className='pt-5  '>
            <Row >
                <Col lg={6}>
                    <AddMovieComponent />
                </Col>
                <Col lg={6}>
                    <ShowMoviesComponent/>
                </Col>
            </Row>
        </Container>
    )
}

export default MovieManagerPage