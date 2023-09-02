import { FaMapMarkerAlt } from "react-icons/fa";
import { Stack, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingOverlay from "../../shared/components/LoadingOverlay";

const TheatreItem = ({ theatre, onDeleteClick,isLoading }) => {
  const handleDeleteClick = () => {
    onDeleteClick(theatre.id);
  };
  return (
    <>
      <Stack key={theatre.id} id={theatre.id} direction="horizontal" gap={3}>
        {isLoading && <LoadingOverlay asOverlay />}
        <span className="mb-0 me-auto">
          <FaMapMarkerAlt size={20} className="mb-2" />
          {theatre.theatreName}
        </span>
        <Button variant="warning"> Edit</Button>
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
