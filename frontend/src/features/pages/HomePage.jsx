import NavbarComponent from "../components/NavbarComponent"
import CarouselComponent from "../components/CarouselComponent"
import MoviesSection from "../components/MoviesSection"
import Footer from "../components/Footer"

const HomePage = () => {
  return (
    <>
      <NavbarComponent />
      <CarouselComponent />
      <MoviesSection/>
      <Footer/>
    </>
  )
}

export default HomePage