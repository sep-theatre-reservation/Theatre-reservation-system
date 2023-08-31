import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

function MovieTrailerSection({ movie }) {
  return (
    <Container fluid className="p-0">
      <div>
        <iframe
          title="YouTube Video"
          className="ratio ratio-4x3"
          src={movie.trailerLink}
          allowFullScreen
          style={{ height: "60vh" }}
        ></iframe>
      </div>
    </Container>
  );
}

MovieTrailerSection.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieTrailerSection;
