import { Container, Col, Row } from "react-bootstrap";
import AddTheaterComponent from "../components/Theatre/AddTheaterComponent";
import ShowTheatreComponent from "../components/Theatre/ShowTheatreComponent";
import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

function TheatreManagePage() {
  const auth = useContext(AuthContext);

  const [updateShowTheatres, setUpdateShowTheatres] = useState(false);
  const [theatreList, setTheatreList] = useState();

  const {
    isLoading: isAddTheatreLoading,
    sendRequest: sendAddTheatreRequest,
    error: addError,
    clearError: clearAddError,
  } = useHttpClient();
  const {
    isLoading: isShowTheatreLoading,
    sendRequest: sendShowTheatreRequest,
  } = useHttpClient();
  const {
    isLoading: isDeleteTheatreLoading,
    sendRequest: sendDeleteTheatreRequest,
    error: deleteError,
    clearError: clearDeleteError,
  } = useHttpClient();

  useEffect(() => {
    const getTheatres = async () => {
      try {
        const responseData = await sendShowTheatreRequest(
          import.meta.env.VITE_REACT_APP_BASE_URL + "/theatres"

        );
        setTheatreList(responseData.theatres);
      } catch (err) {
        /* */
      }
    };
    getTheatres();
  }, [updateShowTheatres, sendShowTheatreRequest]);

  const addTheatre = async (formData) => {
    try {
      const responseData = await sendAddTheatreRequest(
        import.meta.env.VITE_REACT_APP_BASE_URL + "/theatres",

        "POST",
        JSON.stringify({
          theatreName: formData.theatreName,
          rows: parseInt(formData.rows),
          cols: parseInt(formData.cols),
          ticketPrice: parseFloat(formData.ticketPrice),
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
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
        import.meta.env.VITE_REACT_APP_BASE_URL +
          `/theatres/${deletedTheatreId}`,

        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
    } catch (err) {
      /* */
    }
  };

  return (
    <>
      <ErrorModal error={addError} onClear={clearAddError} />
      {/* <ErrorModal error={showError} onClear={clearShowError} /> */}
      <ErrorModal error={deleteError} onClear={clearDeleteError} />
      <Container className="py-5" style={{ minHeight: "62vh" }}>

        <Row>
          <Col lg={6}>
            <AddTheaterComponent
              onAddTheatre={addTheatre}
              isLoading={isAddTheatreLoading}
            />
          </Col>
          <Col lg={6}>
            <ShowTheatreComponent
              isShowTheatreLoading={isShowTheatreLoading}
              isDeleteTheatreLoading={isDeleteTheatreLoading}
              theatreList={theatreList}
              onDeleteTheatre={deleteTheatre}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TheatreManagePage;
