import PropTypes from "prop-types";
import { useState } from "react";
import TheatreItem from "./TheatreItem";
import ErrorModal from "../../shared/components/ErrorModal";
import ConfirmationModal from "../../shared/components/ConfirmationModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const TheatreList = ({ theatres, onDeleteTheatre }) => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [id, setId] = useState(null);

  const showDeleteWarningHandler = (id) => {
    setShowConfirmModal(true);
    setId(id)
  };
  const cancelRemoveHandler = () => {
    setShowConfirmModal(false);
  };

  const ConfirmRemoveHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:3000/api/theatres/${id}`,
        "DELETE"
      );
      onDeleteTheatre(id);
    } catch (err) {
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <ConfirmationModal
        show={showConfirmModal}
        onClose={cancelRemoveHandler}
        onConfirm={ConfirmRemoveHandler}
        text={'Do you want to proceed and remove this theatre? Please note that, this action cannot be reverted'}
      />
      {theatres.map((theatre) => (
        <TheatreItem
          key={theatre.id}
          isLoading={id===theatre.id ? isLoading : false}
          theatre={theatre}
          onDeleteClick={showDeleteWarningHandler}
        ></TheatreItem>
      ))}
    </>
  );
};

TheatreList.propTypes = {
  theatres: PropTypes.array,
  onDeleteTheatre: PropTypes.func,
};

export default TheatreList;
