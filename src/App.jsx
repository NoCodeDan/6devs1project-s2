import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Funnel from './components/Funnel'
import Styleguide from './components/Styleguide'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import SpotifyCallback from './components/SpotifyCallback'
import VibeSetup from './components/VibeSetup'
import PersonalitySummary from './components/PersonalitySummary'
import LandingPage from './components/LandingPage'
import SmoothScrollProvider from './components/global/SmoothScrollProvider'
import './App.css'

function App() {
  return (
    <SmoothScrollProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Funnel />} />
            <Route path="/styleguide" element={<Styleguide />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/callback" element={<SpotifyCallback />} />
            <Route path="/vibe-setup" element={<VibeSetup />} />
            <Route path="/personality-summary" element={<PersonalitySummary />} />
            <Route path="/landing" element={<LandingPage />} />
          </Routes>
        </div>
      </Router>
    </SmoothScrollProvider>
  )
}

export default App
