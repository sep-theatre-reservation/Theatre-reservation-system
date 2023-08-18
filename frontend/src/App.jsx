import HomePage from './features/pages/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import MoviesPage from './features/pages/MoviesPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NowShowing from './features/components/NowShowing'
import CommingSoon from './features/components/CommingSoon'
import MovieShowcasePage from './features/pages/MovieShowcasePage';
import NavbarComponent from "./features/components/NavbarComponent";
import Footer from "./features/components/Footer";
import { useCallback, useState } from "react";
import { AuthContext } from "./features/context/auth-context";
import AdminPage from "./features/pages/AdminPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    
    <AuthContext.Provider
    value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
  >
      <Router>
      <NavbarComponent />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies/*' element={<MoviesPage />}>
            <Route index element={<NowShowing />}></Route>
            <Route path='nowshowing' element={<NowShowing />}></Route>
            <Route path='commingsoon' element={<CommingSoon />}></Route>
          </Route>
          <Route path='movies/movie1' element={<MovieShowcasePage />}></Route>
        </Routes>
        </main>
        <Footer />
      </Router>
      </AuthContext.Provider>
  )
}

export default App;
