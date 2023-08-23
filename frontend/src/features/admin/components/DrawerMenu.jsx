import Offcanvas from 'react-bootstrap/Offcanvas';
import {Stack} from 'react-bootstrap'

function DrawerMenu({show,handleClose}) {
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} id="offcanvas"> 
        <Offcanvas.Header className='bg-dark pt-4 ' closeButton>
          <Offcanvas.Title ><p className='h2 fw-bold'>Admin Panel</p></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack>

          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default DrawerMenu;