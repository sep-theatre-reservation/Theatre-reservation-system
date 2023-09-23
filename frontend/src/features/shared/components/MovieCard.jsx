import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MovieCard({ movie }) {
  return (
          <Link to={`/movies/${movie.id}`}>
            <Card className="bg-black text-light">
              <Card.Img variant="top" src={movie.poster_url} />
              <Card.Body>
                <Card.Title style={{fontWeight:'bold'}}>{movie.title}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object,
};

export default MovieCard;
