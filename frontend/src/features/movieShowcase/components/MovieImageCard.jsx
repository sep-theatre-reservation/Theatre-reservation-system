import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

function MovieImageCard({ className, size, img }) {
  return (
    <Card style={{ width: `${size || 18}rem`, backgroundColor:'none', border:'none', boxShadow:'0 8px 16px rgba(0, 0, 0, 0.5)' }} className={className}>
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
