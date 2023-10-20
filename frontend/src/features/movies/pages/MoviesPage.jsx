import { Container } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function MoviesPage() {
  return (
    <div className="custom-background">
      <Container fluid className="py-4 custom-background" style={{padding:"100px"}}>
        <Stack>
          <div>
            <h3 style={{ fontSize: '3rem', fontWeight: 'bold', color:'white' }}>Movies</h3>
          </div>
          <Stack direction="horizontal" className="my-4">
            <NavLink
              style={({ isActive }) => ({
                borderRadius: "4px",
                padding: "6px 10px",
                marginRight: "10px",
                color: isActive ? "#fff" : "#545e6f",
                background: isActive ? "#0e08a6" : "#f0f0f0",
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
                background: isActive ? "#0e08a6" : "#f0f0f0",
              })}
              to="/movies/comingsoon"
            >
              Coming Soon
            </NavLink>
          </Stack>
        </Stack>
        <Outlet />
      </Container>
    </div>
  );
}

export default MoviesPage;
