import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Stack } from "react-bootstrap";
import React, { useState } from "react";
import PropTypes from "prop-types";
import LoadingOverlay from "../../../shared/components/LoadingOverlay";

function AddTheaterComponent({ onAddTheatre, isLoading }) {
  const [formData, setFormData] = useState({
    theatreName: "",
    rows: "",
    cols: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddTheatre = (event) => {
    event.preventDefault();
    onAddTheatre(formData);
    console.log(formData);
    setFormData({
      theatreName: "",
      rows: "",
      cols: "",
    });
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
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      <Card style={{ width: "30rem" }}>
        {isLoading && <LoadingOverlay asOverlay />}
        <Card.Body>
          <Card.Title>Add Theatre</Card.Title>
          <Form onSubmit={handleAddTheatre}>
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
