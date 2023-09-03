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
            <Stack gap={2}>
              {!isShowTheatreLoading && theatreList && (
                <TheatreList
                  theatreList={theatreList}
                  onDeleteTheatre={onDeleteTheatre}
                  isLoading={isDeleteTheatreLoading}
                />
              )}
            </Stack>
        </Card.Body>
      </Card>
      </>
  );
}



export default ShowTheatreComponent;
