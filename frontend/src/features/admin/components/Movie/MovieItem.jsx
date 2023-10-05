import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Stack } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaFilm } from "react-icons/fa";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const MovieItem = ({ movie, showSchedule, onStatusChange }) => {
  const auth = useContext(AuthContext);

  // State to manage the selected status
  const [selectedStatus, setSelectedStatus] = useState(movie.status);
  const { sendRequest } = useHttpClient();

  const onSchedule = () => {
    showSchedule(movie.id);
  };

  // Use useEffect to watch for changes in selectedStatus
  useEffect(() => {
    const updateMovieStatus = async () => {
      try {
        const responseData = await sendRequest(
          `/movies/${movie.id}`,
          "PATCH",
          JSON.stringify({
            status: selectedStatus,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        console.log(responseData);
        // Call the parent callback function to update the status in the movies array
        onStatusChange(movie.id, selectedStatus);
      } catch (err) {
        /* */
      }
    };

    if (selectedStatus !== movie.status) {
      updateMovieStatus();
    }
  }, [
    selectedStatus,
    movie.status,
    movie.id,
    sendRequest,
    onStatusChange,
    auth.token,
  ]);

  // Function to handle status change
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  return (
    <React.Fragment>
      <Stack key={movie.id} id={movie.id} direction="horizontal" gap={3}>
        {/* {isLoading && <LoadingOverlay asOverlay />} */}
        <span className="mb-0 me-auto">
          <FaFilm size={20} className="me-2 mb-1" />
          {movie.title}
        </span>

        <Dropdown data-bs-theme="dark">
          <Dropdown.Toggle
            style={{
              backgroundColor:
                selectedStatus === "finished"
                  ? "#dc3545" // Danger variant (red)
                  : selectedStatus === "nowShowing"
                  ? "#28a745" // Success variant (green)
                  : "#17a2b8", // Info variant (blue)
            }}
            id="dropdown-basic"
          >
            {selectedStatus}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleStatusChange("nowShowing")}>
              nowShowing
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleStatusChange("comingSoon")}>
              comingSoon
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleStatusChange("finished")}>
              finished
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {selectedStatus !== "finished" && (
          <Button variant="warning" onClick={onSchedule}>
            Schedule
          </Button>
        )}
      </Stack>
    </React.Fragment>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  showSchedule: PropTypes.func,
  onStatusChange: PropTypes.func,
};

export default MovieItem;
