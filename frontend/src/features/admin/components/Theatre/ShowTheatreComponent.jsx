import { Card, Stack } from "react-bootstrap";
import LoadingOverlay from "../../../shared/components/LoadingOverlay";
import TheatreList from "./TheatreList";

function ShowTheatreComponent({ isShowTheatreLoading,isDeleteTheatreLoading,theatreList,onDeleteTheatre }) {
  return (
    <>
      {isShowTheatreLoading && <LoadingOverlay asOverlay />}
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Theatre List</Card.Title>
          <Card.Text>
            <Stack gap={2}>
              {!isShowTheatreLoading && theatreList && (
                <TheatreList
                  theatreList={theatreList}
                  onDeleteTheatre={onDeleteTheatre}
                  isLoading={isDeleteTheatreLoading}
                />
              )}
            </Stack>
          </Card.Text>
        </Card.Body>
      </Card>
      </>
  );
}



export default ShowTheatreComponent;
