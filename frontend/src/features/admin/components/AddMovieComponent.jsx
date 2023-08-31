import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker"; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles

import React, { useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/ErrorModal";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import PropTypes from "prop-types";

function AddMovieComponent({ onAddMovie }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    trailerLink: "",
    releaseDate: null,
    directorName: "",
    directorImageUrl: "",
    cast: [
      { name: "", imageUrl: "" },
      { name: "", imageUrl: "" },
      { name: "", imageUrl: "" },
      { name: "", imageUrl: "" },
    ],
  });

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, releaseDate: date }));
  };

  const handleCastChange = (event, index) => {
    const { name, value } = event.target;
    const updatedCast = [...formData.cast];
    updatedCast[index][name] = value;
    setFormData((prevData) => ({ ...prevData, cast: updatedCast }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:3000/api/movies",
        "POST",
        JSON.stringify({
          title: formData.title,
          release_date: formData.releaseDate,
          poster_url: formData.imageUrl,
          trailerLink: formData.trailerLink,
          description: formData.description,
          director: {
            name: formData.directorName,
            imageUrl: formData.directorImageUrl,
          },
          cast: formData.cast,
        }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        trailerLink: "",
        releaseDate: null,
        directorName: "",
        directorImageUrl: "",
        cast: [
          { name: "", imageUrl: "" },
          { name: "", imageUrl: "" },
          { name: "", imageUrl: "" },
          { name: "", imageUrl: "" },
        ],
      });
      onAddMovie();
    } catch (err) {
      /* */
    }
    //console.log("Form Data:", formData);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card style={{ width: "30rem" }}>
        {isLoading && <LoadingOverlay asOverlay />}
        <Card.Body>
          <Card.Title>Add Movie</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title" className="mb-2">
              <Form.Label>Movie Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter Title"
              />
            </Form.Group>

            <Form.Group controlId="description" className="mb-2">
              <Form.Label>Movie Description</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter Description"
              />
            </Form.Group>

            <Form.Group controlId="imageUrl" className="mb-2">
              <Form.Label>Movie Image Url</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter Source Url"
              />
            </Form.Group>

            <Form.Group controlId="trailerLink" className="mb-2">
              <Form.Label>Movie Trailer Link</Form.Label>
              <Form.Control
                type="text"
                name="trailerLink"
                value={formData.trailerLink}
                onChange={handleInputChange}
                placeholder="Enter Trailer Link"
              />
            </Form.Group>

            <Form.Group controlId="releaseDate" className="mb-2">
              <Form.Label>Release Date</Form.Label>
              <br />
              <DatePicker
                selected={formData.releaseDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
              />
            </Form.Group>
            <Form.Group controlId="directorName" className="mb-2">
              <Form.Label>Director Name</Form.Label>
              <Form.Control
                type="text"
                name="directorName"
                value={formData.directorName}
                onChange={handleInputChange}
                placeholder="Enter Director Name"
              />
            </Form.Group>
            <Form.Group controlId="directorImageUrl" className="mb-2">
              <Form.Label>Director Image Url</Form.Label>
              <Form.Control
                type="text"
                name="directorImageUrl"
                value={formData.directorImageUrl}
                onChange={handleInputChange}
                placeholder="Enter Director Image Url"
              />
            </Form.Group>
            <Form.Group controlId="cast" className="mb-2">
              <Form.Label>Cast Members</Form.Label>
              {formData.cast.map((castMember, index) => (
                <div key={index}>
                  <Form.Label>Cast {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={castMember.name}
                    onChange={(e) => handleCastChange(e, index)}
                    placeholder="Enter Cast Member Name"
                  />
                  <Form.Control
                    type="text"
                    name="imageUrl"
                    value={castMember.imageUrl}
                    onChange={(e) => handleCastChange(e, index)}
                    placeholder="Enter Cast Member Image Url"
                  />
                </div>
              ))}
            </Form.Group>
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

AddMovieComponent.propTypes = {
  onAddMovie: PropTypes.func,
};

export default AddMovieComponent;
