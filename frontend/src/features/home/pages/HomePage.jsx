import CarouselComponent from "../components/CarouselComponent"
import MoviesSection from "../../shared/components/MoviesSection";
import PromoSection from "../components/PromoSection";

const HomePage = () => {
  return (
    <div>
      <CarouselComponent />
      <MoviesSection />
      <PromoSection/>
    </div>
  );
};

export default HomePage;
