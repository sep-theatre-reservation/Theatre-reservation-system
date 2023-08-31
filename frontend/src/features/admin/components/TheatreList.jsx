import PropTypes from "prop-types";
import TheatreItem from "./TheatreItem";

const TheatreList = ({ theatres, onDeleteTheatre }) => {
  return (
    <>
      {theatres.map((theatre) => (
        <TheatreItem
          key={theatre.id}
          id={theatre.id}
          theatre={theatre}
          onDelete={onDeleteTheatre}
        ></TheatreItem>
      ))}
    </>
  );
};

TheatreList.propTypes = {
  theatres: PropTypes.array,
  onDeleteTheatre: PropTypes.func,
};

export default TheatreList;
