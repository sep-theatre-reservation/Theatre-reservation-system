import {  Form, Stack } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

function UpcomingWeekSelect({ onDateSelect }) {
  const getUpcomingWeekDates = () => {
    const today = new Date();
    const daysInWeek = 7;
    const upcomingWeekDates = [];

    for (let i = 0; i < daysInWeek; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      upcomingWeekDates.push(date);
    }

    return upcomingWeekDates;
  };

  const handleDateChange = (event) => {
    const selectedValue = event.target.value;
    console.log("Selected Value:", selectedValue);
    const selectedDate = new Date(selectedValue);
    selectedDate.setMinutes(
      selectedDate.getMinutes() + selectedDate.getTimezoneOffset()
    );
    const isoString = selectedDate.toISOString();

    console.log("Adjusted ISO String:", isoString);
    onDateSelect(selectedValue);
  };

  const upcomingWeekDates = getUpcomingWeekDates();

  return (
    <div>
      <Stack direction="horizontal">
        <FaCalendarAlt size={30} />
        <Form.Select
          aria-label="Select a Date"
          onChange={handleDateChange}
          style={{ backgroundColor:"gray", color:"black", width: "180px", marginLeft: "10px"}} 
        >
          <option className={"d-none"} >Select a Date</option>
          {upcomingWeekDates.map((date, index) => (
            <option key={index} value={date.toISOString()}  >
              {date.toDateString()}
            </option>
          ))}
        </Form.Select>

      </Stack>
    </div>
  );
}

export default UpcomingWeekSelect;
