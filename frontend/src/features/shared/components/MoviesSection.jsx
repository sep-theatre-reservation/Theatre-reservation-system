import React, { useEffect, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import Movie from "./Movie";
import Container from "react-bootstrap/Container";
import LoadingOverlay from "./LoadingOverlay";

function MoviesSection() {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedMovies, setLoadedMovies] = useState();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/api/movies"
        );
        setLoadedMovies(responseData.movies);
      } catch (err) {
        /* */
      }
    };

    fetchMovies();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoadingOverlay asOverlay />}
      <div>
        <Container
          fluid
          className="bg-light"
          style={{ paddingLeft: "100px", paddingRight: "100px" }}
        >
          <h2 className="py-5">Movies</h2>
          {loadedMovies && loadedMovies[0] && <Movie movie={loadedMovies[0]} />}
        </Container>
      </div>
    </React.Fragment>
  );
}

export default MoviesSection;
