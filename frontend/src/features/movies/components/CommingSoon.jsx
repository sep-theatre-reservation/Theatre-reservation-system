import MoviesGrid from "../../shared/components/MoviesGrid";
import { Container } from "react-bootstrap";
import { useHttpClient } from "../../shared/hooks/http-hook";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
function CommingSoon() {
  const { isLoading, sendRequest } = useHttpClient();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/api/movies"
        );
        setMovieList(responseData.movies);
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
        <h2 className="py-5">Movies(CommingSoon)</h2>
        <MoviesGrid movieList={movieList} />
      </Container>
    </React.Fragment>
  );
}

export default CommingSoon;
