import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

function MovieTrailerSection({ movie }) {
  return (
      <div>
        <iframe
          title="YouTube Video"
          className="ratio ratio-4x3"
          src={movie.trailerLink}
          allowFullScreen
          style={{ height: "60vh" }}
        ></iframe>
      </div>
  );
}

MovieTrailerSection.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieTrailerSection;