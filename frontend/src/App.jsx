import HomePage from './features/pages/HomePage'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MoviesPage from './features/pages/MoviesPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CommingSoon from './features/components/CommingSoon';
import NowShowing from './features/components/NowShowing';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/movies' element={<MoviesPage />}>
            <Route path='' element={<NowShowing />}></Route>
            <Route path='commingsoon' element={<CommingSoon />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
