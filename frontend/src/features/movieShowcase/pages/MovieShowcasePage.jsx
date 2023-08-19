import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import MovieDetails from '../components/MovieDetails';

function MovieShowcasePage() {
  return (
    <>
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
      <MovieDetails/>
    </>
  )
}

export default MovieShowcasePage