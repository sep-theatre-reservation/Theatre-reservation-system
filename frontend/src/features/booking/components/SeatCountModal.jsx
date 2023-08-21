import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SeatCountSelector from '../components/SeatCountSelector'
import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SeatCountModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            className='custom-modal'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    How many Seats?
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Stack>
                    <SeatCountSelector />
                    <div className='ms-auto p-2'>
                    <Button as={Link} to="/payment" onClick={props.onHide} >Select Seats</Button>
                    </div>
                </Stack>
            </Modal.Body>
        </Modal>
    )
}

export default SeatCountModal