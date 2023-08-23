import { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../context/auth-context";
import { Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

function NavbarComponent() {
  const auth = useContext(AuthContext);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    auth.login(userObject);
    handleClose();
  }

  const [showLogin, setShowLogin] = useState(false);

  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "617303979694-o7829b777qio68qnn79ehd44hcnpfhgt.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      theme: "outline",
      size: "large",
      width: "200",
      logo_alignment: "center",
      text: "continue_with",
    });

    //google.accounts.id.prompt();
  }); //dependency array [] removed...

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" id="navBarBrand">
            Booking.Lk
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/movies" className="navLink">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/contactus" className="navLink">
                Contact Us
              </Nav.Link>
              {auth.isLoggedIn && (
                <Nav.Link as={Link} to="/Admin" className="navLink">
                  Admin Dashboard
                </Nav.Link>
              )}
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Modal show={showLogin} onHide={handleClose}>
              <Modal.Body>
                <div id="signUpDiv"></div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Nav>
              {!auth.isLoggedIn && <Button onClick={handleShow}>Login</Button>}
              {auth.isLoggedIn && (
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="avatar-dropdown">
                    <img
                      src={auth.user.picture} // Replace with your avatar image URL
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
