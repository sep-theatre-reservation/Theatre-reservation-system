import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../context/auth-context";
import { Dropdown, Image, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminDrawerMenu from "../../admin/components/AdminDrawerMenu";
import { FaThList } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import useGoogleAuth from "../hooks/google-auth-hook";
import logo from "../../../assets/logo.png";
import { useHttpClient } from "../hooks/http-hook";

function NavbarComponent() {
  const auth = useContext(AuthContext);

  const [showAdminDrawerMenu, setShowAdminDrawerMenu] = useState(false);

  const handleAdminDrawerMenuClose = () => setShowAdminDrawerMenu(false);
  const handleAdminDrawerMenuShow = () => setShowAdminDrawerMenu(true);

  const [showLogin, setShowLogin] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Add a state for search loading
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { isLoading: isShowMoviesLoading, sendRequest: sendShowMoviesRequest } =
    useHttpClient();

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    setIsSearching(true);

    // Call a function to fetch search results from the backend
    fetchSearchResults(newQuery);
  };

  const fetchSearchResults = async (searchQuery) => {
    try {
      const responseData = await sendShowMoviesRequest(
        `/movies/search?query=${searchQuery}`
      );
      setResults(responseData.movies.slice(0, 5));
      setShowSearchResults(true);
    } catch (err) {
      /* */
    } finally {
      setIsSearching(false);
    }
  };

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  useGoogleAuth(handleLoginClose);

  return (
    <>
      <AdminDrawerMenu
        show={showAdminDrawerMenu}
        handleClose={handleAdminDrawerMenuClose}
      />
      <Navbar
        expand="lg"
        data-bs-theme="dark"
        sticky="top"
        style={{ backgroundColor: "#0c0342" }}
      >
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
            <img
              src={logo}
              style={{
                height: "60px",
                color: "black",
                paddingBottom: "5px",
                marginRight: "3px",
                filter: "grayscale(0%) invert(100%)",
              }}
            />
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

            <Form className="d-flex">
              <div style={{ position: "relative" }}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={query}
                  onChange={handleInputChange}
                  style={{ width: "400px" }}
                />
                {showSearchResults && (
                  <div
                    className="search-results"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      width: "100%", // Adjust this as needed
                      backgroundColor: "#fff", // Background color for results
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000, // Adjust the z-index as needed
                      borderRadius: "4px",
                    }}
                  >
                    {!isShowMoviesLoading && query && !isSearching && (
                      <ListGroup>
                        {results.map((result) => (
                          <ListGroup.Item
                            key={result._id}
                            as={Link}
                            to={`/movies/${result.id}`}
                            onClick={() => setQuery("")}
                          >
                            <Image
                              src={result.poster_url}
                              alt={result.title}
                              thumbnail
                              style={{ maxWidth: "100px", maxHeight: "50px" }}
                            />
                            {result.title}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </div>
                )}
              </div>
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
                <Button
                  className="mx-3 text-light"
                  onClick={handleLoginShow}
                  variant="dark"
                >
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
