import PropTypes from "prop-types";
import MovieItem from "./MovieItem";

const MovieList = ({ movies }) => {
  return (
    <>
      {movies.map((movie) => (
        <MovieItem key={movie.id} id={movie.id} movie={movie}></MovieItem>
      ))}
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieList;
