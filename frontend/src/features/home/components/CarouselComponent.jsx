import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselComponent = () => {
  return (
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://www.koimoi.com/wp-content/new-galleries/2022/07/oppenheimer-first-poster-highlights-devastation-caused-by-atomic-bomb-0001.jpg"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First Slide</h3>
        <p>This is the caption for the first slide.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2023-04/230404-ryan-gosling-margot-robbie-barbie-movie-ac-525p-ab72ab.jpg"
        alt="Second slide"
      />
      <Carousel.Caption>
        <h3>Second Slide</h3>
        <p>This is the caption for the second slide.</p>
      </Carousel.Caption>
    </Carousel.Item>
    {/* Add more Carousel.Items for additional slides */}
  </Carousel>
  )
}

export default CarouselComponent