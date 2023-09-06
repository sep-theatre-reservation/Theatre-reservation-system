import { useState } from 'react';
import { ButtonToolbar, ToggleButton } from 'react-bootstrap'

function SeatCountSelector() {
  const [radioValue, setRadioValue] = useState('0');

  const radios = [
    { value: '1' },
    { value: '2' },
    { value: '3' },
  ];

  return (
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
          onChange={(e) => setRadioValue(e.currentTarget.value)
          }
          className='mx-2'
        >
          {radio.value}
        </ToggleButton>
      ))}
    </ButtonToolbar>
  )
}

export default SeatCountSelector