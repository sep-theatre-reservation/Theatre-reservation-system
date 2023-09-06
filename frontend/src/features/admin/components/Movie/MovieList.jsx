import PropTypes from "prop-types";
import MovieItem from "./MovieItem";

const MovieList = ({ movies, showSchedule }) => {
  return (
    <>
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          id={movie.id}
          movie={movie}
          showSchedule={showSchedule}
        ></MovieItem>
      ))}
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieList;
