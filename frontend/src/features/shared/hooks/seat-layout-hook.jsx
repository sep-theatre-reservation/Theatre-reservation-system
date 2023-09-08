import Seat from "../../reservations/components/Seat";

const useSeatRows = (cols, rows, SEATS, handleSelect) => {
  let rowAr = []; // row array
  let Sid = 0;
  let sec1 = Math.ceil(cols / 2);
  let sec2 = Math.floor(cols / 2);

  // Creation of the row array
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

  return rowAr;
};

export default useSeatRows;
