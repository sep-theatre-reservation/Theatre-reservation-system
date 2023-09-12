import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingOverlay from "../../shared/components/LoadingOverlay";

const CarouselComponent = () => {
  const [loadedSlides, setLoadedSlides] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/api/carousel"
        );
        setLoadedSlides(responseData.slides);
      } catch (err) {
        /* */
      }
    };

    fetchSlides();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoadingOverlay asOverlay />}
      <Carousel>
        {!isLoading &&
          loadedSlides &&
          loadedSlides.map((slide, index) => (
            <Carousel.Item key={slide.id}>
              <div style={{ width: '100%', maxHeight: '700px', overflow: 'hidden' }}>
                <img
                  src={slide.imgUrl}
                  alt={`Slide ${index + 1}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <Carousel.Caption>
                <h3>{`Slide ${index + 1}`}</h3>
                <p>This is the caption for the slide.</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}

        {/* Add more Carousel.Items for additional slides */}
      </Carousel>
    </React.Fragment>
  );
};

export default CarouselComponent;
