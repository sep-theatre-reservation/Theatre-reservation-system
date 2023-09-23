import CarouselComponent from "../components/CarouselComponent"
import MoviesSection from "../components/MoviesSection";
import PromoSection from "../components/PromoSection";

const HomePage = () => {

  return (
    <>
      <CarouselComponent />
      <MoviesSection />
      {/* <div style={{ position: 'absolute', top: '790px', left: '0', width: '100%', height: '20px', backgroundColor: "121, 151, 212,", backdropFilter: "blur(10px)"  }}></div> */}
      <PromoSection />
    </>

  );
};

export default HomePage;
