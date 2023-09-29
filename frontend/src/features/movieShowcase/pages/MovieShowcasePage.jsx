import { useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";
import MovieTrailerSection from "../components/MovieTrailerSection";
import { useHttpClient } from "../../shared/hooks/http-hook";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "../../shared/components/LoadingOverlay";

function MovieShowcasePage() {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedMovie, setLoadedMovie] = useState();
  const movieId = useParams().movieId;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseData = await sendRequest(
          `/movies/${movieId}`
        );
        setLoadedMovie(responseData.movie);
      } catch (err) {
        /* */
      }
    };
    fetchMovies();
  }, [sendRequest, movieId]);

  return (
    <>
      {isLoading && <LoadingOverlay asOverlay />}
      {!isLoading && loadedMovie && <MovieTrailerSection movie={loadedMovie} />}
      {!isLoading && loadedMovie && <MovieDetails movie={loadedMovie} />}
    </>
  );
}

export default MovieShowcasePage;
