import PropTypes from "prop-types";

function CharacterIcon({ title, subtitle, imgUrl }) {
  return (
    <div className="circular-image-container">
      <div className="circular-image">
        <img src={imgUrl} alt="Circular Image" />
      </div>
      <h6 className="mb-0">{title}</h6>
      <p>{subtitle}</p>
    </div>
  );
}

CharacterIcon.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default CharacterIcon;
