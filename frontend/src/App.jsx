import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./features/shared/context/auth-context";
import NavbarComponent from "./features/shared/components/NavbarComponent";
import HomePage from "./features/home/pages/HomePage";
import NowShowing from "./features/movies/components/NowShowing";
import CommingSoon from "./features/movies/components/CommingSoon";
import MovieShowcasePage from "./features/movieShowcase/pages/MovieShowcasePage";
import MoviesPage from "./features/movies/pages/MoviesPage";
import Footer from "./features/shared/components/Footer";
import BookingPage from "./features/booking/pages/bookingPage";
import PaymentPage from "./features/payment/pages/PaymentPage";
import DashboardPage from "./features/admin/pages/DashboardPage";
import SeatSelection from "./features/reservations/pages/SeatSelection";
import TheatreManagePage from "./features/admin/pages/TheatreManagePage";
import PromoManagerPage from "./features/admin/pages/PromoManagerPage";
import MovieManagerPage from "./features/admin/pages/MovieManagerPage";
import CarouselManagerPage from "./features/admin/pages/CarouselManagerPage";

import { useAuth } from "./features/shared/hooks/auth-hook";

function App() {
  const { token, login, logout, user, isAdmin } = useAuth();

  let routes;
  if (isAdmin) {
    routes = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<DashboardPage />}>
          <Route index element={<DashboardPage />}></Route>
          <Route path="movies" element={<MovieManagerPage />}></Route>
          <Route path="theatres" element={<TheatreManagePage />}></Route>
          <Route path="promotions" element={<PromoManagerPage />}></Route>
          <Route path="carousel" element={<CarouselManagerPage />}></Route>
        </Route>
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/movies/*" element={<MoviesPage />}>
          <Route index element={<NowShowing />}></Route>
          <Route path="nowshowing" element={<NowShowing />}></Route>
          <Route path="commingsoon" element={<CommingSoon />}></Route>
        </Route>
        <Route path="movies/:movieId" element={<MovieShowcasePage />}></Route>
        <Route path="booking" element={<BookingPage />}></Route>
        <Route path="payment" element={<PaymentPage />}></Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/movies/*" element={<MoviesPage />}>
          <Route index element={<NowShowing />}></Route>
          <Route path="nowshowing" element={<NowShowing />}></Route>
          <Route path="promotions" element={<PromoManagerPage />}></Route>
          <Route path="carousel" element={<CarouselManagerPage />}></Route>
        </Route>
        <Route path="movies/:movieId" element={<MovieShowcasePage />}></Route>
        <Route path="booking" element={<BookingPage />}></Route>
        <Route path="payment" element={<PaymentPage />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        isAdmin: isAdmin,
        user: user,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <NavbarComponent />
        <main style={{ minHeight: "80vh" }}>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
