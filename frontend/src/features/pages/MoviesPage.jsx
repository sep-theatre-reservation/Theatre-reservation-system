import Stack from 'react-bootstrap/Stack';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavbarComponent from '../components/NavbarComponent'
import NowShowing from '../components/NowShowing';
import CommingSoon from '../components/CommingSoon';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
function MoviesPage() {
  return (
    <>
        <NavbarComponent />
        <Stack>
          <div className="p-4 "><h3>Movies</h3></div>
          <Stack direction="horizontal">
            <div className="px-4">
              <LinkContainer to="/movies">
                <Nav.Link>Now Showing</Nav.Link>
              </LinkContainer>
            </div>
            <div className="px-4">
              <LinkContainer to="/movies/commingsoon">
                <Nav.Link>Comming Soon</Nav.Link>
              </LinkContainer>
            </div>
          </Stack>
        </Stack>
      <Outlet/>
    </>
  )
}

export default MoviesPage