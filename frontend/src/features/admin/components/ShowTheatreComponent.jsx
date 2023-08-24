import React from 'react'
import { Button, Card, ListGroup, Stack } from 'react-bootstrap'
import { FaMapMarkerAlt } from 'react-icons/fa'

function ShowTheatreComponent() {
    return (
        <Card style={{ width: '30rem' }}>
            <Card.Body>
                <Card.Title>Theatre List</Card.Title>
                <Card.Text>
                    <Stack gap={2}>
                    <Stack direction='horizontal' gap={3}>
                        <span className='mb-0 me-auto'><FaMapMarkerAlt size={20} className='mb-2' />LIBERTY BY SCOPE CINEMAS</span>
                        <Button variant='warning'> Edit</Button>
                        <Button variant='danger'>Remove</Button>
                    </Stack>
                    <Stack direction='horizontal' gap={3}>
                        <span className='mb-0 me-auto'><FaMapMarkerAlt size={20} className='mb-2' />LIBERTY BY SCOPE CINEMAS</span>
                        <Button variant='warning'> Edit</Button>
                        <Button variant='danger'>Remove</Button>
                    </Stack>
                   
                    </Stack>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ShowTheatreComponent