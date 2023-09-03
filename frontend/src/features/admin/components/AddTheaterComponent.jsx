import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Stack } from "react-bootstrap";

import { useHttpClient } from "../../shared/hooks/http-hook";
import React, { useContext, useState } from "react";
import ErrorModal from "../../shared/components/ErrorModal";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import PropTypes from "prop-types";
import { AuthContext } from "../../shared/context/auth-context";

function AddTheaterComponent({ onAddTheatre }) {
  const [formData, setFormData] = useState({
    theatreName: "",
    rows: "",
    cols: "",
  });

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addTheatreSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:3000/api/theatres",
        "POST",
        JSON.stringify({
          theatreName: formData.theatreName,
          rows: parseInt(formData.rows),
          cols: parseInt(formData.cols),
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(responseData);
      setFormData({
        theatreName: "",
        rows: "",
        cols: "",
      });
      onAddTheatre();
    } catch (err) {
      /* */
    }
  };

  const generateIntegerOptions = () => {
    const maxNumber = 25; // You can adjust the maximum number of rows and columns
    const options = [];

    for (let i = 0; i <= maxNumber; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card style={{ width: "30rem" }}>
        {isLoading && <LoadingOverlay asOverlay />}
        <Card.Body>
          <Card.Title>Add Theatre</Card.Title>
          <Form onSubmit={addTheatreSubmitHandler}>
            <Form.Group controlId="cardName" className="mb-2">
              <Form.Label>Theatre Name</Form.Label>
              <Form.Control
                type="text"
                name="theatreName"
                value={formData.theatreName}
                placeholder="Enter Theatre Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Stack direction="horizontal" gap={3}>
              <Form.Group controlId="rows" className="mb-2">
                <Form.Label>Rows</Form.Label>
                <Form.Select
                  name="rows"
                  value={formData.rows}
                  onChange={handleChange}
                >
                  {generateIntegerOptions()}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="cols" className="mb-2">
                <Form.Label>Columns</Form.Label>
                <Form.Select
                  name="cols"
                  value={formData.cols}
                  onChange={handleChange}
                >
                  {generateIntegerOptions()}
                </Form.Select>
              </Form.Group>
            </Stack>
            <Button
              variant="primary"
              type="submit"
              className="mt-2 float-end me-3"
            >
              Add
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

AddTheaterComponent.propTypes = {
  onAddTheatre: PropTypes.func,
};

export default AddTheaterComponent;
