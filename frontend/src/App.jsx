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
import BookingPage from "./features/booking/pages/BookingPage";
import PaymentPage from "./features/payment/pages/PaymentPage";
import DashboardPage from "./features/admin/pages/DashboardPage";
import SeatSelection from "./features/reservations/pages/SeatSelection";
import TheatreManagePage from "./features/admin/pages/TheatreManagePage";
import PromoManagerPage from "./features/admin/pages/PromoManagerPage";
import MovieManagerPage from "./features/admin/pages/MovieManagerPage";
import CustomerProfile from "./features/customer/pages/CustomerProfile";

import { useAuth } from "./features/shared/hooks/auth-hook";

function App() {
  let { token, login, logout, user, isAdmin, userId } = useAuth();
  let routes;
  
  if (isAdmin) {
    routes = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:uid" element={<CustomerProfile />}></Route>
        {/* Admin Routes */}
        <Route path="admin/dashboard" element={<DashboardPage />}></Route>
        <Route path="admin/movies" element={<MovieManagerPage />}></Route>
        <Route path="admin/theatres" element={<TheatreManagePage />}></Route>
        <Route path="admin/promotions" element={<PromoManagerPage />}></Route>

        <Route path="/movies" element={<MoviesPage />}>
          <Route index element={<NowShowing />}></Route>
          <Route path="nowshowing" element={<NowShowing />}></Route>
          <Route path="commingsoon" element={<CommingSoon />}></Route>
        </Route>
        <Route path="movies/:movieId" element={<MovieShowcasePage />}></Route>
        <Route path="booking/:movieId" element={<BookingPage />}></Route>
        <Route path="/seats/:showId/:seatCount" element={<SeatSelection />} />
        <Route path="payment/:bookingId" element={<PaymentPage />}></Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!!token && (
          <Route path="/profile/:uid" element={<CustomerProfile />}></Route>
        )}
        <Route path="/movies" element={<MoviesPage />}>
          <Route index element={<NowShowing />}></Route>
          <Route path="nowshowing" element={<NowShowing />}></Route>
          <Route path="commingsoon" element={<CommingSoon />}></Route>
        </Route>
        <Route path="movies/:movieId" element={<MovieShowcasePage />}></Route>
        <Route path="booking/:movieId" element={<BookingPage />}></Route>
        <Route path="/seats/:showId/:seatCount" element={<SeatSelection />} />
        <Route path="payment/:bookingId" element={<PaymentPage />}></Route>
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
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <NavbarComponent />
        <main >{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
