import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Container from "react-bootstrap/Container";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import MoviesGrid from "../../shared/components/MoviesGrid";
import "../components/bg.css"
function MoviesSection() {
  const { isLoading, sendRequest } = useHttpClient();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => { fetchMovies(); }, [sendRequest]);

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

  return (
    <>
      {isLoading && <LoadingOverlay asOverlay />}
      <div className="custom-background">
        <Container
          fluid
          style={{ paddingLeft: "100px", paddingRight: "100px" ,paddingBottom:"100px"}}
        >
          <h1 className="py-5 text-white">Movies</h1>
          <MoviesGrid movieList={movieList} />
        </Container>
      </div>
    </>
  )
}

export default MoviesSection