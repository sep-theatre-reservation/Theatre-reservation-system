import Movie from '../../shared/components/Movie'
import {Container} from 'react-bootstrap'
function CommingSoon() {
  return (
    <Container fluid className="bg-light" style={{ paddingLeft: "100px", paddingRight: "100px" }}>
      <h2 className="py-5">Movies(CommingSoon)</h2>
      <Movie />
    </Container>
  )
}

export default CommingSoon