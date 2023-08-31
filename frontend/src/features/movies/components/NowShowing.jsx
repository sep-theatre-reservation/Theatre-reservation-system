import React, { useEffect, useState } from "react";
import Movie from "../../shared/components/Movie";
import { Container } from "react-bootstrap";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingOverlay from "../../shared/components/LoadingOverlay";

function NowShowing() {
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
      <Container
        fluid
        className="bg-light"
        style={{ paddingLeft: "100px", paddingRight: "100px" }}
      >
        <h2 className="py-5">Movies(Now Showing)</h2>
        {loadedMovies && loadedMovies[0] && <Movie movie={loadedMovies[0]} />}
      </Container>
    </React.Fragment>
  );
}

export default NowShowing;
