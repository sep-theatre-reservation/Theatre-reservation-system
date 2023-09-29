import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingOverlay from "../../../shared/components/LoadingOverlay";
import MovieFilter from "./MovieFilter";

const MovieList = ({ showSchedule }) => {
  // State to manage the selected filter
  const [selectedFilter, setSelectedFilter] = useState(
    "Show All Except Finished"
  );
  const [movies, setMovies] = useState([]);

  // State to store the filtered movies
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const { isLoading: isShowMoviesLoading, sendRequest: sendShowMoviesRequest } =
    useHttpClient();

  // This useEffect runs only on component mount
  useEffect(() => {
    const getMovies = async () => {
      try {
        const responseData = await sendShowMoviesRequest(
          "/movies"
        );
        setMovies(responseData.movies);
      } catch (err) {
        /* */
      }
    };

    getMovies();
  }, [sendShowMoviesRequest, selectedFilter]);

  // Use useEffect to update filteredMovies whenever selectedFilter changes
  useEffect(() => {
    if (selectedFilter === "Show All Except Finished") {
      setFilteredMovies(movies.filter((movie) => movie.status != "finished"));
    } else if (selectedFilter === "Finished") {
      setFilteredMovies(movies.filter((movie) => movie.status === "finished"));
    } else {
      // Handle other filter options if needed
      setFilteredMovies(movies);
    }
  }, [selectedFilter, movies]);

  // Callback function to update status in the movies array
  const handleStatusChange = (movieId, newStatus) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, status: newStatus } : movie
      )
    );
  };

  return (
    <React.Fragment>
      {/* Filter dropdown */}
      {isShowMoviesLoading && <LoadingOverlay asOverlay />}

      <MovieFilter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      {/* Movie list */}
      {filteredMovies.map((movie) => (
        <MovieItem
          key={movie.id}
          id={movie.id}
          movie={movie}
          showSchedule={showSchedule}
          onStatusChange={handleStatusChange} // Pass the callback function
        ></MovieItem>
      ))}
    </React.Fragment>
  );
};

MovieList.propTypes = {
  //movies: PropTypes.array.isRequired,
  showSchedule: PropTypes.func,
};

export default MovieList;
