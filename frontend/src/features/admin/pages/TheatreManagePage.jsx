import { Container, Col, Row } from "react-bootstrap";
import AddTheaterComponent from "../components/Theatre/AddTheaterComponent";
import ShowTheatreComponent from "../components/Theatre/ShowTheatreComponent";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/ErrorModal";

function TheatreManagePage() {

  const [updateShowTheatres, setUpdateShowTheatres] = useState(false);
  const [theatreList, setTheatreList] = useState();

  const { isLoading: isAddTheatreLoading, sendRequest: sendAddTheatreRequest } = useHttpClient();
  const { isLoading: isShowTheatreLoading, sendRequest: sendShowTheatreRequest } = useHttpClient();
  const { isLoading: isDeleteTheatreLoading, error, sendRequest: sendDeleteTheatreRequest, clearError } = useHttpClient();

  useEffect(() => { getTheatres() }, [updateShowTheatres, sendShowTheatreRequest]);

  const getTheatres = async () => {
    try {
      const responseData = await sendShowTheatreRequest(
        "http://localhost:3000/api/theatres"
      );
      setTheatreList(responseData.theatres);
    } catch (err) {
    }
  };

  const addTheatre = async (formData) => {
    try {
      const responseData = await sendAddTheatreRequest(
        "http://localhost:3000/api/theatres",
        "POST",
        JSON.stringify({
          theatreName: formData.theatreName,
          rows: parseInt(formData.rows),
          cols: parseInt(formData.cols),
        }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);

      setUpdateShowTheatres((prevValue) => !prevValue);
    } catch (err) {
      /* */
    }
  };

  const deleteTheatre = async (deletedTheatreId) => {
    setTheatreList((prevTheatres) =>
      prevTheatres.filter((theatre) => theatre.id != deletedTheatreId)
    );

    try {
      await sendDeleteTheatreRequest(
        `http://localhost:3000/api/theatres/${deletedTheatreId}`,
        "DELETE"
      );
    } catch (err) {
    }
  };


  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Container className="pt-5  ">
        <Row>
          <Col lg={6}>
            <AddTheaterComponent onAddTheatre={addTheatre} isLoading={isAddTheatreLoading} />
          </Col>
          <Col lg={6}>
            <ShowTheatreComponent isShowTheatreLoading={isShowTheatreLoading} isDeleteTheatreLoading={isDeleteTheatreLoading} theatreList={theatreList} onDeleteTheatre={deleteTheatre} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TheatreManagePage;
