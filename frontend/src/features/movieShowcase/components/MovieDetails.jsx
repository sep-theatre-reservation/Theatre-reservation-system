import { Container, Card, Row, Col, Stack, Button } from "react-bootstrap"
import { Link } from 'react-router-dom';

function MovieDetails() {
    return (
        <Container fluid className="p-5">
            <Row>
                <Col lg={3} className="d-none d-xl-block">
                    <Card style={{ width: '18rem' }} >
                        <Card.Img
                            variant=""
                            src="https://lk-aps.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/oppenheimer-et00004979-23-06-2023-02-14-08.jpg"
                            alt="Movie Poster"
                        />
                    </Card>
                </Col>
                <Col lg={9}>
                    <Stack gap={5}>
                        <h1>OPPENHEIMER</h1>
                        <Stack direction="horizontal" gap={3}>
                            <div>
                                <Stack gap={2}>
                                    <h4>Now Showing At</h4>
                                    <Stack direction="horizontal">
                                        <p className="lead me-4">Scope cinema</p>
                                        <p className="lead me-4">Scope cinema</p>
                                        <p className="lead me-4">Scope cinema</p>
                                    </Stack>
                                </Stack>
                            </div>
                            <Button as={Link} to="/another-page" variant="primary" className=" m-auto">
                                Book Tickets
                            </Button>
                        </Stack>
                        <Row>
                            <Col md={7} >
                                <div>
                                    <h3>Story Line</h3>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima laboriosam neque quibusdam dolores sit ad sint itaque at! Explicabo, ipsum?</p>
                                </div>
                            </Col>
                            <Col lg={5} >
                                <div>
                                    <h3>Genress</h3>
                                    <Stack direction="horizontal" gap={3}>
                                        <p className="lead">action</p>
                                        <p className="lead">action</p>
                                        <p className="lead">action</p>
                                    </Stack>
                                </div>
                            </Col>
                        </Row>
                        <Stack>
                            <h3>Cast</h3>
                            <Stack direction="horizontal" gap={5} className="pt-3">
                                <div className="circular-image-container">
                                    <div className="circular-image">
                                        <img src='https://static.standard.co.uk/2023/05/11/14/newFile.jpg?width=1200&height=1200&fit=crop' alt="Circular Image" />
                                    </div>
                                    <h6>Lillian Murphy</h6>
                                </div>
                            </Stack>
                        </Stack>
                        <Stack>
                            <h3>Team</h3>
                            <Stack direction="horizontal" gap={5} className="pt-3">
                            <div className="circular-image-container">
                                <div className="circular-image">
                                    <img src='https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/07/29/16906452894987.jpg' alt="Circular Image" />
                                </div>
                                <h6>Chrisoper Nolan</h6>
                                <p>Director</p>
                            </div>
                            </Stack>
                        </Stack>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}

export default MovieDetails