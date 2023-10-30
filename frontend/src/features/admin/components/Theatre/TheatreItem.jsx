import { FaMapMarkerAlt } from "react-icons/fa";
import { Stack, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingOverlay from "../../../shared/components/LoadingOverlay";
import ConfirmationModal from "../../../shared/components/ConfirmationModal";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const TheatreItem = ({
  theatre,
  isLoading,
  onDeleteTheatre,
  onEditTheatre,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showTimeArray, setShowTimeArray] = useState(null);
  const {  sendRequest } =useHttpClient();


  const getTheatreShowTimes = async () => {
    try {
      const responseData = await sendRequest(
        import.meta.env.VITE_REACT_APP_BASE_URL + `/theatres/showtimes/${theatre.id}`
      );
      setShowTimeArray(responseData.showtimes);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(showTimeArray){
    onEditTheatre(theatre.id, showTimeArray);
    }
  }, [showTimeArray]); 
  
  const handleShowtimesClick = async () => {
    try {
      await getTheatreShowTimes();
      //onEditTheatre(theatre.id,showTimeArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmationModal(true);
  };

  const cancelDeletion = () => {
    setShowConfirmationModal(false);
  };

  const ConfirmDeletion = async () => {
    setShowConfirmationModal(false);
    onDeleteTheatre(theatre.id);
  };

  return (
    <>
      <ConfirmationModal
        show={showConfirmationModal}
        onClose={cancelDeletion}
        onConfirm={ConfirmDeletion}
        text={
          "Do you want to proceed and remove this theatre? Please note that, this action cannot be reverted"
        }
      />
      <Stack key={theatre.id} id={theatre.id} direction="horizontal" gap={3}>
        {isLoading && <LoadingOverlay asOverlay />}
        <span className="mb-0 me-auto">
          <FaMapMarkerAlt size={20} className="mb-2" />
          {theatre.theatreName}
        </span>
        <Button variant="warning" onClick={handleShowtimesClick}>
          Showtimes
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          Remove
        </Button>
      </Stack>
    </>
  );
};

TheatreItem.propTypes = {
  theatre: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

export default TheatreItem;
