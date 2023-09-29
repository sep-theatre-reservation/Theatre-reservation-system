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
          "/carousel"
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
              <div style={{ width: '100%', maxHeight: '700px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={slide.imgUrl}
                  alt={`Slide ${index + 1}`}
                  style={{ width: '100%', height: 'auto', borderRadius: '0px' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '400px',
                    left: '0',
                    width: '100%',
                    height: '300px',
                    // background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
                    borderRadius: '0px',
                  }}
                />
              </div>
              <Carousel.Caption>
                <h1 style={{ fontSize: '3.5rem', fontWeight:'bold' }}>{slide.title}</h1>
                {/* <p>This is the caption for the slide.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          ))}

        {/* Add more Carousel.Items for additional slides */}
      </Carousel>
    </React.Fragment>
  );
};

export default CarouselComponent;
