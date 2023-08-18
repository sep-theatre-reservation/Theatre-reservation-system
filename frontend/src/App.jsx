import HomePage from './features/pages/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import MoviesPage from './features/pages/MoviesPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NowShowing from './features/components/NowShowing'
import CommingSoon from './features/components/CommingSoon'
import MovieShowcasePage from './features/pages/MovieShowcasePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies/*' element={<MoviesPage />}>
            <Route index element={<NowShowing />}></Route>
            <Route path='nowshowing' element={<NowShowing />}></Route>
            <Route path='commingsoon' element={<CommingSoon />}></Route>
          </Route>
          <Route path='movies/movie1' element={<MovieShowcasePage />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
