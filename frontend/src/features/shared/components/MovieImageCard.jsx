import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

function MovieImageCard({ className, size }) {
  return (
    <Card style={{ width: `${size || 18}rem` }} className={className}>
      <Card.Img
        variant=""
        src="https://lk-aps.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/oppenheimer-et00004979-23-06-2023-02-14-08.jpg"
        alt="Movie Poster"
      />
    </Card>
  );
}

MovieImageCard.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
};

export default MovieImageCard;
