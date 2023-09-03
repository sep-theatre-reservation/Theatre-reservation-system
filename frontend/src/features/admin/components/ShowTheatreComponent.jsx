import React, { useEffect, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import PropTypes from "prop-types";
import TheatreList from "./TheatreList";

function ShowTheatreComponent({ shouldUpdate }) {
  const { isLoading, sendRequest } = useHttpClient(); //errorModal not working check later
  const [loadedTheatres, setLoadedTheatres] = useState();

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/api/theatres"
        );
        setLoadedTheatres(responseData.theatres);
      } catch (err) {
        /* */
      }
    };

    fetchTheatres();
  }, [shouldUpdate, sendRequest]);

  const theatreDeletedHandler = (deletedTheatreId) => {
    setLoadedTheatres((prevTheatres) =>
      prevTheatres.filter((theatre) => theatre.id != deletedTheatreId)
    );
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingOverlay asOverlay />}
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Theatre List</Card.Title>
          <Card.Text>
            <Stack gap={2}>
              {!isLoading && loadedTheatres && (
                <TheatreList
                  theatres={loadedTheatres}
                  onDeleteTheatre={theatreDeletedHandler}
                />
              )}
            </Stack>
          </Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

ShowTheatreComponent.propTypes = {
  shouldUpdate: PropTypes.bool,
};

export default ShowTheatreComponent;
