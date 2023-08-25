import { Button, Card, Stack } from 'react-bootstrap'
import { FaFilm } from 'react-icons/fa'
function ShowMoviesComponent() {
    return (
        <Card style={{ width: '30rem' }}>
            <Card.Body>
                <Card.Title>Movies List</Card.Title>
                <Card.Text>
                    <Stack gap={2}>
                        <Stack direction='horizontal' gap={3}>
                            <span className='mb-0 me-auto'><FaFilm size={20} className='me-2 mb-1' />LIBERTY BY SCOPE CINEMAS</span>
                            <Button variant='warning'> Edit</Button>
                            <Button variant='danger'>Remove</Button>
                        </Stack>
                        <Stack direction='horizontal' gap={3}>
                            <span className='mb-0 me-auto'><FaFilm size={20} className='me-2 mb-1' />LIBERTY BY SCOPE CINEMAS</span>
                            <Button variant='warning'> Edit</Button>
                            <Button variant='danger'>Remove</Button>
                        </Stack>
                    </Stack>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ShowMoviesComponent