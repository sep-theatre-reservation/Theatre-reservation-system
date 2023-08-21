import PropTypes from "prop-types";
import "./Seat.css";

const Seat = ({ id, onSelect, available }) => {
  const seatClicked = (event) => {
    const clickedButton = event.target;
    const clickedId = clickedButton.id;

    const deselect = clickedButton.classList.contains("selected")
      ? true
      : false;
    clickedButton.classList.toggle("selected");
    onSelect(clickedId, deselect);
  };

  return (
    <button
      className={`${available ? "seat" : "unavailable"}`}
      id={id}
      onClick={(e) => seatClicked(e)}
      disabled={!available}
    >
      {id}
    </button>
  );
};

Seat.propTypes = {
  id: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  available: PropTypes.bool.isRequired,
};

export default Seat;
