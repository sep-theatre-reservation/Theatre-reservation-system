import { FaMapMarkerAlt } from "react-icons/fa";
import { Button, Stack } from "react-bootstrap";

function formatDateToTime(inputDateStr) {
  const inputDate = new Date(inputDateStr);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  return inputDate.toLocaleTimeString([], options);
}

function ShowTimes({ setModalShow, showTimes, onSelect, selectedShowtime }) {
  return (
    <Stack>
      <div>
        <FaMapMarkerAlt size={20} className="mb-2" />
        <span className="mb-0 lead">LIBERTY BY SCOPE CINEMAS</span>
        <hr className="mt-0" />
      </div>
      <Stack direction="horizontal" gap={3}>
        {showTimes.map((show) => (
          <Button
            key={show.id}
            variant="outline-secondary"
            onClick={() => {
              onSelect(show); // Call the callback function with the selected showtime
              setModalShow(true);
            }}
          >
            {formatDateToTime(show.showtime)}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}

export default ShowTimes;
