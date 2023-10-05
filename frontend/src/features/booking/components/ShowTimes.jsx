import { FaMapMarkerAlt } from "react-icons/fa";
import { Button, Stack } from "react-bootstrap";
import React from "react";

function formatDateToTime(inputDateStr) {
  const inputDate = new Date(inputDateStr);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  return inputDate.toLocaleTimeString([], options);
  
}

function ShowTimes({ setModalShow, showTimes, onSelect }) {
  const groupedByTheatre = showTimes.reduce((groups, obj) => {
    const groupId = obj.theatre.id;

    // Check if a group with this ID already exists
    const existingGroup = groups.find(
      (group) => group[0].theatre.id === groupId
    );

    if (existingGroup) {
      // If a group with this ID exists, add the object to it
      existingGroup.push(obj);
    } else {
      // If no group with this ID exists, create a new group and add the object to it
      groups.push([obj]);
    }

    return groups;
  }, []);

  return (
    <React.Fragment>
      {groupedByTheatre.map((group) => (
        <Stack key={group[0].theatre.id}>
          <div>
            <FaMapMarkerAlt size={20} className="mb-2" />
            <span className="mb-0 lead">{group[0].theatre.theatreName}</span>
            <hr className="mt-0" />
          </div>
          <Stack direction="horizontal" gap={3}>
            {group.map((show) => (
              <Button
                key={show.id}
                variant="outline-secondary"
                onClick={() => {
                  onSelect(show); 
                  setModalShow(true);
                }}
              >
                {formatDateToTime(show.showtime)}
              </Button>
            ))}
          </Stack>
        </Stack>
      ))}
    </React.Fragment>
  );
}

export default ShowTimes;
