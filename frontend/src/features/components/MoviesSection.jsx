import Movie from "./Movie"
import Container from 'react-bootstrap/Container';

function MoviesSection() {
    return (
        <div>
            <Container className="p-3 bg-light">
                <h2 className="my-5">Movies</h2>
                <Movie />
            </Container>
        </div>
    )
}

export default MoviesSection