import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";
import { Card, Stack } from "react-bootstrap";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import { useHttpClient } from "../../shared/hooks/http-hook";
import PropTypes from "prop-types";

function ShowMoviesComponent({ shouldUpdate }) {
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
  }, [shouldUpdate, sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoadingOverlay asOverlay />}
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Movies List</Card.Title>
          <Card.Text>
            <Stack gap={2}>
              {!isLoading && loadedMovies && (
                <MovieList movies={loadedMovies} />
              )}
            </Stack>
          </Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

ShowMoviesComponent.propTypes = {
  shouldUpdate: PropTypes.bool,
};
export default ShowMoviesComponent;
