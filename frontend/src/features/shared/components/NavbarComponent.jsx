import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../context/auth-context";
import { Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminDrawerMenu from "../../admin/components/AdminDrawerMenu";
import { FaThList } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import useGoogleAuth from "../hooks/google-auth-hook";
import logo from "../../../assets/logo.png"
function NavbarComponent() {
  const auth = useContext(AuthContext);

  const [showAdminDrawerMenu, setShowAdminDrawerMenu] = useState(false);

  const handleAdminDrawerMenuClose = () => setShowAdminDrawerMenu(false);
  const handleAdminDrawerMenuShow = () => setShowAdminDrawerMenu(true);

  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  useGoogleAuth(handleLoginClose);

  return (
    <>
      <AdminDrawerMenu
        show={showAdminDrawerMenu}
        handleClose={handleAdminDrawerMenuClose}
      />
      <Navbar expand="lg" data-bs-theme="dark" style={{ backgroundColor: '#0c0342' }}>
        <Container fluid>
          {auth.isLoggedIn && auth.isAdmin && (
            <Button
              variant="danger"
              className={"me-3 d-none d-lg-block"}
              size="lg"
              onClick={handleAdminDrawerMenuShow}
            >
              <FaThList size={20} className="me-2 mb-1" />
              Admin Panel
            </Button>
          )}
          <Navbar.Brand as={Link} to="/" id="navBarBrand">
            <img src={logo} style={{height:'60px', color:'black', paddingBottom:'5px', marginRight:'3px', filter: 'grayscale(0%) invert(100%)'}} />
            Booking.Lk
          </Navbar.Brand>

          <div className="d-lg-none ms-auto me-3">
            {!auth.isLoggedIn && (
              <Button className={"mx-3"} onClick={handleLoginShow}>
                <FaUserCircle size={20} className="me-2 mb-1" />
                Login
              </Button>
            )}
            {auth.isLoggedIn && (
              <Dropdown>
                <Dropdown.Toggle variant="link" id="avatar-dropdown">
                  <img
                    src={auth.user.picture}
                    alt="profile_pic"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className="dropdown-menu-right">
                  <Dropdown.Item>{auth.user.name}</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={auth.logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="pb-lg-0 pb-3">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {auth.isLoggedIn && auth.isAdmin && (
                <Nav.Link
                  as={Link}
                  to="/admin"
                  className="navLink text-danger d-lg-none"
                >
                  Admin Page
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/movies/nowshowing" className="navLink">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/contactus" className="navLink">
                Contact Us
              </Nav.Link>
            </Nav>

            <Form className="d-flex" data-bs-theme="light">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="dark" className="text-light">Search</Button>
            </Form>

            <Modal show={showLogin} onHide={handleLoginClose}>
              <Modal.Header closeButton>
                <Modal.Title>Login to your Account</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div id="signUpDiv"></div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleLoginClose} variant="secondary">
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="d-none d-lg-block">
              {!auth.isLoggedIn && (
                <Button className="mx-3 text-light" onClick={handleLoginShow} variant="dark">
                  <FaUserCircle size={20} className="me-2 mb-1" />
                  Login
                </Button>
              )}
              {auth.isLoggedIn && (
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="avatar-dropdown">
                    <img
                      src={auth.user.picture}
                      alt="profile_pic"
                      className="rounded-circle"
                      width="40"
                      height="40"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end" className="dropdown-menu-right">
                    <Dropdown.Item as={Link} to={`/profile/${auth.userId}`}>
                      {auth.user.name}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={auth.logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
