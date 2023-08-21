import React from 'react'
import { Container } from 'react-bootstrap'

function MovieTrailerSection() {
  return (
    <Container fluid className='p-0'>
    <div >
      <iframe
        title="YouTube Video"
        className="ratio ratio-4x3"
        src="https://www.youtube.com/embed/uYPbbksJxIg"
        allowFullScreen
        style={{ height: '60vh' }}
      ></iframe>
    </div>

  </Container>
  )
}

export default MovieTrailerSection