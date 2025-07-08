import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import Funnel from './components/Funnel'
import Styleguide from './components/Styleguide'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import SpotifyCallback from './components/SpotifyCallback'
import OnboardingForm from './components/OnboardingForm'
import VibeSetup from './components/VibeSetup'
import Eventbrite from './components/Eventbrite';
import AIPage from './components/AIPage';
import QuestionScreen from './components/QuestionScreen';
import PersonalitySummary from './components/PersonalitySummary'
import LandingPage from './components/LandingPage'
import SmoothScrollProvider from './components/global/SmoothScrollProvider'
import SpotifyData from './components/SpotifyData'
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
            <Route path="/onboarding" element={<OnboardingForm />} />
            <Route path="/vibe-setup" element={<VibeSetup />} />
            <Route path="/eventbrite" element={<Eventbrite />} />
            <Route path="/ai" element={<AIPage />} />
            <Route path="/question-screen" element={<QuestionScreen />} />
            <Route path="/personality-summary" element={<PersonalitySummary />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/spotify" element={<SpotifyData />} />
          </Routes>
        </div>
      </Router>
    </SmoothScrollProvider>
  )
}

export default App
