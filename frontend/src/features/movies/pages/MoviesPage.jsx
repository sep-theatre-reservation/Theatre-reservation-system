import Stack from "react-bootstrap/Stack";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function MoviesPage() {
  return (
    <>
      <Stack>
        <div className="p-4 ">
          <h3>Movies</h3>
        </div>
        <Stack direction="horizontal">
          <NavLink
            style={({ isActive }) => ({
              borderRadius: "4px",
              padding: "6px 10px",
              marginRight: "10px",
              color: isActive ? "#fff" : "#545e6f",
              background: isActive ? "#7600dc" : "#f0f0f0",
            })}
            to="/movies/nowshowing"
          >
            Now showing
          </NavLink>

          <NavLink
            style={({ isActive }) => ({
              borderRadius: "4px",
              padding: "6px 10px",
              marginRight: "10px",
              color: isActive ? "#fff" : "#545e6f",
              background: isActive ? "#7600dc" : "#f0f0f0",
            })}
            to="/movies/commingsoon"
          >
            Comming Soon
          </NavLink>
        </Stack>
      </Stack>
      <Outlet />
    </>
  );
}

export default MoviesPage;
