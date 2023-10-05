import React from "react";
import MovieList from "./MovieList";
import { Card, Stack } from "react-bootstrap";
import LoadingOverlay from "../../../shared/components/LoadingOverlay";
import PropTypes from "prop-types";

function ShowMoviesComponent({ moviesList, isLoading, showSchedule }) {
  return (
    <React.Fragment>
      {isLoading && <LoadingOverlay asOverlay />}
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title style={{fontWeight:"bold"}}>Movies List</Card.Title>
          <Card.Text>
            <Stack gap={2}>
              {!isLoading && moviesList && (
                <MovieList showSchedule={showSchedule} />
                // movies={moviesList}
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
