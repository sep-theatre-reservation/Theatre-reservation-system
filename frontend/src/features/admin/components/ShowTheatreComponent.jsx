import React, { useEffect, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import PropTypes from "prop-types";
import TheatreList from "./TheatreList";
//import ErrorModal from "../../shared/components/ErrorModal";

function ShowTheatreComponent({ shouldUpdate }) {
  const { isLoading, sendRequest } = useHttpClient();
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
              {/* <Stack direction="horizontal" gap={3}>
                <span className="mb-0 me-auto">
                  <FaMapMarkerAlt size={20} className="mb-2" />
                  LIBERTY BY SCOPE CINEMAS
                </span>
                <Button variant="warning"> Edit</Button>
                <Button variant="danger">Remove</Button>
              </Stack> */}
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
