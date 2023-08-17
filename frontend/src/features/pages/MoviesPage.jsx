import Stack from 'react-bootstrap/Stack';
import { LinkContainer } from 'react-router-bootstrap';
import NavbarComponent from '../components/NavbarComponent'
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function MoviesPage() {
  return (
    <>
      <NavbarComponent />
      <Stack>
        <div className="p-4 "><h3>Movies</h3></div>
        <Stack direction="horizontal">
          <div className="px-4">
            <NavLink to="nowshowing">Now showing</NavLink>
          </div>
          <div className="px-4">
            <NavLink to="commingsoon">Comming Soon</NavLink>
          </div>
        </Stack>
      </Stack>
      <Outlet />
    </>
  )
}

export default MoviesPage