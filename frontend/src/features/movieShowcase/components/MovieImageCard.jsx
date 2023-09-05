import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

function MovieImageCard({ className, size, img }) {
  return (
    <Card style={{ width: `${size || 18}rem` }} className={className}>
      <Card.Img variant="" src={img} alt="Movie Poster" />
    </Card>
  );
}

MovieImageCard.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  img: PropTypes.string,
};

export default MovieImageCard;
