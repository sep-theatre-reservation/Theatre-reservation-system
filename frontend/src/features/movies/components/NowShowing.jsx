import React, { useEffect, useState } from "react";
import MoviesGrid from "../../shared/components/MoviesGrid";
import { Container } from "react-bootstrap";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingOverlay from "../../shared/components/LoadingOverlay";

function NowShowing() {
  const { isLoading, sendRequest } = useHttpClient();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseData = await sendRequest(
          "/movies/nowShowing"
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
        // className="bg-light"
        // style={{
        //   paddingLeft: "100px",
        //   paddingRight: "100px",
        //   paddingTop: "50px",
        // }}
      >
        <MoviesGrid movieList={movieList} />
      </Container>
    </React.Fragment>
  );
}

export default NowShowing;
