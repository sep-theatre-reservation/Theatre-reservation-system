import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddMovieComponent() {
    return (
        <Card style={{ width: '30rem' }}>
            <Card.Body>
                <Card.Title>Add Movie</Card.Title>
                <Form>
                    <Form.Group controlId="cardName" className='mb-2'>
                        <Form.Label>Movie Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" />
                    </Form.Group>
                    <Form.Group controlId="cardName" className='mb-2'>
                        <Form.Label>Movie Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" />
                    </Form.Group>
                    <Form.Group controlId="cardName" className='mb-2'>
                        <Form.Label>Movie Image Url</Form.Label>
                        <Form.Control type="text" placeholder="Enter Source Url" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mt-2 float-end me-3'>
                        Add
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddMovieComponent