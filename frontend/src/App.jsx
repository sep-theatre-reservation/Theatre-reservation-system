import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCallback, useState } from "react";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const login = useCallback((logiUser) => {
    setIsLoggedIn(true);
    setUser(logiUser);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser({});
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <NavbarComponent />
        <main style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/*" element={<DashboardPage />}>
              <Route index element={<DashboardPage />}></Route>
              <Route path="movies" element={<DashboardPage />}></Route>
              <Route path="theatres" element={<TheatreManagePage />}></Route>
              <Route path="promo" element={<DashboardPage />}></Route>
            </Route>
            <Route path="/seats" element={<SeatSelection />} />
            <Route path="/movies/*" element={<MoviesPage />}>
              <Route index element={<NowShowing />}></Route>
              <Route path="nowshowing" element={<NowShowing />}></Route>
              <Route path="commingsoon" element={<CommingSoon />}></Route>
            </Route>
            <Route path="movies/movie1" element={<MovieShowcasePage />}></Route>
            <Route path="booking" element={<BookingPage />}></Route>
            <Route path="payment" element={<PaymentPage />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
