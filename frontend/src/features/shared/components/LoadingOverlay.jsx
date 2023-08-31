import PropTypes from "prop-types";

import { Spinner } from "react-bootstrap";

const LoadingOverlay = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading.....</span>
      </Spinner>
    </div>
  );
};

LoadingOverlay.propTypes = {
  asOverlay: PropTypes.bool,
};

export default LoadingOverlay;
