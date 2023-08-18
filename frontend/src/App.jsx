import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCallback, useState } from "react";
import {AuthContext} from './features/shared/context/auth-context'
import NavbarComponent from './features/shared/components/NavbarComponent'
import HomePage from './features/home/pages/HomePage'
import NowShowing from './features/movies/components/NowShowing'
import CommingSoon from './features/movies/components/CommingSoon'
import MovieShowcasePage from './features/movieShowcase/pages/MovieShowcasePage'
import MoviesPage from './features/movies/pages/MoviesPage'
import Footer from './features/shared/components/Footer'


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
