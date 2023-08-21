import { FaMapMarkerAlt } from 'react-icons/fa';
import { Button,Stack } from 'react-bootstrap';

function ShowTimes() {
    return (
        <Stack >
            <div>
                <FaMapMarkerAlt size={20} className='mb-2' />
                <span className='mb-0 lead'>LIBERTY BY SCOPE CINEMAS</span>
                <hr className="mt-0" />
            </div>
            <Stack direction='horizontal' gap={3}>
                <Button variant="outline-secondary" onClick={() => setModalShow(true)} link>5.30 PM</Button>
                <Button variant="outline-secondary" onClick={() => setModalShow(true)}>7.30 PM</Button>
                <Button variant="outline-secondary" onClick={() => setModalShow(true)}>9.30 PM</Button>
            </Stack>
        </Stack>
    )
}

export default ShowTimes