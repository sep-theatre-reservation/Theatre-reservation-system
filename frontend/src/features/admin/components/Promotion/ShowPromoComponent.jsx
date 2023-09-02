import React from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import {FaTicketAlt} from 'react-icons/fa'
function ShowPromoComponent() {
  return (
    <Card style={{ width: '30rem' }}>
            <Card.Body>
                <Card.Title>Promotion List</Card.Title>
                <Card.Text>
                    <Stack gap={2}>
                    <Stack direction='horizontal' gap={3}>
                        <span className='mb-0 me-auto'><FaTicketAlt size={20} className='me-2 mb-1' />LIBERTY BY SCOPE CINEMAS</span>
                        <Button variant='warning'> Edit</Button>
                        <Button variant='danger'>Remove</Button>
                    </Stack>
                    <Stack direction='horizontal' gap={3}>
                        <span className='mb-0 me-auto'><FaTicketAlt size={20} className='me-2 mb-1' />LIBERTY BY SCOPE CINEMAS</span>
                        <Button variant='warning'> Edit</Button>
                        <Button variant='danger'>Remove</Button>
                    </Stack>
                    </Stack>
                </Card.Text>
            </Card.Body>
        </Card>
  )
}

export default ShowPromoComponent