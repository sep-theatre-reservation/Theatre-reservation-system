import HomePage from './features/pages/HomePage'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <HomePage />
  )
}

export default App
