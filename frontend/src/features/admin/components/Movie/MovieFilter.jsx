import { FaFilter } from "react-icons/fa";
import { Dropdown, DropdownButton } from "react-bootstrap";
import PropTypes from "prop-types";

const MovieFilter = ({ selectedFilter, setSelectedFilter }) => {
  return (
    <DropdownButton
      id="filter-dropdown"
      title={
        <>
          <FaFilter className="mr-2" /> {selectedFilter}
        </>
      }
      onSelect={(eventKey) => setSelectedFilter(eventKey)}
    >
      <Dropdown.Item eventKey="Show All Except Finished">
        Show All Except Finished
      </Dropdown.Item>
      <Dropdown.Item eventKey="Finished">Finished</Dropdown.Item>
    </DropdownButton>
  );
};

MovieFilter.propTypes = {
  selectedFilter: PropTypes.string,
  setSelectedFilter: PropTypes.func,
};

export default MovieFilter;
