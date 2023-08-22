import Seat from "../components/Seat";
import "./SeatSelection.css";
import { useEffect, useState } from "react";
import Stack from 'react-bootstrap/Stack';

const rows = 4;
const cols = 7;
const SEATS = [
  { id: "A1", availability: true },
  { id: "A2", availability: true },
  { id: "A3", availability: true },
  { id: "A4", availability: true },
  { id: "A5", availability: true },
  { id: "A6", availability: true },
  { id: "A7", availability: true },
  { id: "B1", availability: true },
  { id: "B2", availability: true },
  { id: "B3", availability: true },
  { id: "B4", availability: false },
  { id: "B5", availability: true },
  { id: "B6", availability: true },
  { id: "B7", availability: true },
  { id: "C1", availability: true },
  { id: "C2", availability: false },
  { id: "C3", availability: true },
  { id: "C4", availability: true },
  { id: "C5", availability: true },
  { id: "C6", availability: true },
  { id: "C7", availability: true },
  { id: "D1", availability: true },
  { id: "D2", availability: false },
  { id: "D3", availability: true },
  { id: "D4", availability: true },
  { id: "D5", availability: true },
  { id: "D6", availability: true },
  { id: "D7", availability: true },
];

const SeatSelection = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (selectedId, remove) => {
    if (!remove) {
      setSelected((selectedList) => [...selectedList, selectedId]);
    } else {
      setSelected((selectedList) =>
        selectedList.filter((seat) => seat != selectedId)
      );
    }
  };

  //side effect updating...
  useEffect(() => {
    console.log(selected);
  }, [selected]);

  let rowAr = [];
  let Sid = 0;
  let sec1 = Math.ceil(cols / 2);
  let sec2 = Math.floor(cols / 2);

  //putting seatId to rows
  for (let row = 0; row < rows; row++) {
    let secAr1 = [];
    let secAr2 = [];

    for (let i = 0; i < sec1; i++) {
      secAr1.push(
        <Seat
          key={SEATS[Sid].id}
          id={SEATS[Sid].id}
          onSelect={handleSelect}
          available={SEATS[Sid].availability}
        />
      );
      Sid++;
    }
    for (let i = 0; i < sec2; i++) {
      secAr2.push(
        <Seat
          key={SEATS[Sid].id}
          id={SEATS[Sid].id}
          onSelect={handleSelect}
          available={SEATS[Sid].availability}
        />
      );
      Sid++;
    }
    rowAr.push(
      <tr key={row}>
        <td key="sec1">{secAr1}</td>
        <td key="sec2">{secAr2}</td>
      </tr>
    );
  }

  return (
    <>
    <Stack>
      <div className="m-auto mt-5">
        <table>
          <tbody>{rowAr}</tbody>
        </table>
      </div>
      <div className="screen">screen</div>
    </Stack>
    </>
  );
};

export default SeatSelection;
