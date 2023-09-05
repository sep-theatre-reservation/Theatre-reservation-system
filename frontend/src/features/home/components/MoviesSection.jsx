import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Container from "react-bootstrap/Container";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import MoviesGrid from "../../shared/components/MoviesGrid";
function MoviesSection() {
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
        <>
            {isLoading && <LoadingOverlay asOverlay />}
            <div>
                <Container
                    fluid
                    className="bg-light"
                    style={{ paddingLeft: "100px", paddingRight: "100px" }}
                >
                    <h2 className="py-5">Movies</h2>
                <MoviesGrid movieList={movieList}/>
                </Container>
            </div>
        </>
    )
}

export default MoviesSection