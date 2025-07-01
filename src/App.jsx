import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Styleguide from './components/Styleguide'
import Login from './components/Login'
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Styleguide />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
