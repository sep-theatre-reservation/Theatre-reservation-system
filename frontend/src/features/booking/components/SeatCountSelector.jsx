import { useEffect, useState } from "react";
import { ButtonToolbar, ToggleButton } from "react-bootstrap";
import PropTypes from "prop-types";

function SeatCountSelector({ setCount, availability }) {
  const [radioValue, setRadioValue] = useState("0");
  useEffect(() => {
    setCount(radioValue);
  }, [radioValue, setCount]);

  // const radios = [
  //   { value: '1' },
  //   { value: '2' },
  //   { value: '3' },
  // ];

  const radios =
    availability >= 10
      ? new Array(10)
          .fill(null)
          .map((_, idx) => ({ value: (idx + 1).toString() }))
      : new Array(availability)
          .fill(null)
          .map((_, idx) => ({ value: (idx + 1).toString() }));

  return (
    <>
      <ButtonToolbar>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="outline-dark"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value);
            }}
            //className="mx-2"
            style={{ margin: "2px" }}
          >
            {radio.value}
          </ToggleButton>
        ))}
      </ButtonToolbar>
    </>
  );
}

SeatCountSelector.propTypes = {
  setCount: PropTypes.func,
  availability: PropTypes.number,
};

export default SeatCountSelector;
