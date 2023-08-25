import Movie from '../../shared/components/Movie'
import { Container } from 'react-bootstrap'

function NowShowing() {
  return (
    <Container fluid className="bg-light" style={{ paddingLeft: "100px", paddingRight: "100px" }}>
      <h2 className="py-5">Movies(Now Showing)</h2>
      <Movie />
    </Container>
  )
}

export default NowShowing