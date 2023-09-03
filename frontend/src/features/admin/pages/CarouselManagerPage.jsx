import {
    Badge,
    Button,
    Container,
    Row,
    Col,
    Modal,
    Form,
} from "react-bootstrap";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import { useState,useEffect } from "react";

function CarouselManagerPage() {
    const [avatars, setAvatars] = useState([]);
    const [showAddSlide, setShowAddSlide] = useState(false);
    const [imgUrl, setImgUrl] = useState("");

    const { isLoading, sendRequest } = useHttpClient();

    const cancelAddSlide = () => {
        setShowAddSlide(false);
    };
    const showAddSlideHandler = () => {
        setShowAddSlide(true);
    };

    const handleChange = (event) => {
        setImgUrl(event.target.value);
    };

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const responseData = await sendRequest(
                    "http://localhost:3000/api/carousel"
                );
                setAvatars(responseData.slides);
            } catch (err) {
                /* */
            }
        };

        fetchSlides();
    }, [sendRequest]);

    const addAvatar = async (event) => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                "http://localhost:3000/api/carousel",
                "POST",
                JSON.stringify({
                    imgUrl: imgUrl,
                }),
                { "Content-Type": "application/json" }
            );
            setImgUrl(""); // Clear the input field immediately

            // After the request is successful, update the state
            setAvatars((prevAvatars) => [...prevAvatars, responseData.slide]);
        } catch (err) {
            /* */
        }
        cancelAddSlide();
    };

    const removeAvatar = async (avatarId) => {
        try {
            await sendRequest(
                `http://localhost:3000/api/carousel/${avatarId}`,
                "DELETE"
            );
            const updatedAvatars = avatars.filter((avatar) => avatar.id !== avatarId);
            setAvatars(updatedAvatars);
        } catch (err) {
            /* */
        }
    };
    return (
        <>
            <Modal show={showAddSlide} onHide={cancelAddSlide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Slide</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addAvatar}>
                        <Form.Group controlId="cardName" className="mb-2">
                            <Form.Label>Slide Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="imgUrl"
                                value={imgUrl}
                                placeholder="Enter Image URL"
                                onChange={handleChange}
                            />
                            <Button
                                variant="primary"
                                type="submit"
                                className="mt-2 float-end me-3"
                                onClick={addAvatar}
                            >
                                Add
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            {isLoading && <LoadingOverlay asOverlay />}

            <Container>
                <Row className="align-items-center">
                    {!isLoading &&
                        avatars &&
                        avatars.map((avatar, index) => (
                            <Col key={index}>
                                <img
                                    src={avatar.imgUrl}
                                    alt={`Avatar ${index + 1}`}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "20%",
                                    }}
                                />
                                <Badge
                                    bg="danger"
                                    onClick={() => removeAvatar(avatar.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <FaTimes />
                                </Badge>
                            </Col>
                        ))}
                    <Col>
                        <Button variant="light" onClick={showAddSlideHandler}>
                            <FaPlus />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CarouselManagerPage