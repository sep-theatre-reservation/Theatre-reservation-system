import Movie from "./Movie"
import Container from 'react-bootstrap/Container';

function MoviesSection() {
    return (
        <div>
            <Container fluid className="bg-light" style={{paddingLeft:"100px",paddingRight:"100px"}}>
                <h2 className="py-5">Movies</h2>
                <Movie />
            </Container>
        </div>
    )
}

export default MoviesSection