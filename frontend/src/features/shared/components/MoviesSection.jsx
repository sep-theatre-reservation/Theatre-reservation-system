import Movie from "./Movie"
import Container from 'react-bootstrap/Container';

function MoviesSection() {
    return (
        <div>
            <Container fluid className="bg-light" style={{padding:"100px"}}>
                <h2 className="my-5">Movies</h2>
                <Movie />
            </Container>
        </div>
    )
}

export default MoviesSection