import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated, initSpotifyAuth } from '../services/spotifyService'
import Button from './Button'

export default function OnboardingForm({ onComplete }) {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    spotifyConnected: false,
    savedEvents: [],
    bookedEvents: []
  })

  // Check if user is already authenticated with Spotify
  useEffect(() => {
    const checkSpotifyAuth = () => {
      const authenticated = isAuthenticated()
      setFormData(prev => ({ ...prev, spotifyConnected: authenticated }))
      
      // If user is authenticated and we're on the first step, move to next step
      if (authenticated && currentStep === 0) {
        setCurrentStep(1)
      }
    }
    
    checkSpotifyAuth()
  }, [currentStep])

  const steps = [
    {
      id: 'spotify',
      title: 'Connect Your Spotify',
      subtitle: 'Let us analyze your music taste to find perfect events'
    },
    {
      id: 'metrics',
      title: 'Your Music Profile',
      subtitle: 'Here\'s what your Spotify reveals'
    },
    {
      id: 'events',
      title: 'Events Just For You',
      subtitle: 'Curated based on your music taste'
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      subtitle: 'Start discovering events that match your vibe'
    }
  ]

  const mockMetrics = {
    topGenres: ['Electronic', 'Indie Rock', 'Alternative'],
    topArtists: ['Tame Impala', 'ODESZA', 'Glass Animals', 'Caribou', 'Bon Iver'],
    listeningHours: 847,
    discoveryScore: 87,
    danceability: 73,
    energy: 81
  }

  const mockEvents = [
    {
      id: 1,
      name: 'Electric Forest Festival',
      date: 'June 15-18, 2024',
      location: 'Rothbury, MI',
      artists: ['ODESZA', 'Porter Robinson', 'Disclosure'],
      genre: 'Electronic',
      price: '$320',
      match: 95
    },
    {
      id: 2,
      name: 'Pitchfork Music Festival',
      date: 'July 19-21, 2024',
      location: 'Chicago, IL',
      artists: ['Bon Iver', 'Vampire Weekend', 'Big Thief'],
      genre: 'Indie Rock',
      price: '$180',
      match: 89
    },
    {
      id: 3,
      name: 'Sasquatch! Music Festival',
      date: 'May 24-26, 2024',
      location: 'George, WA',
      artists: ['Tame Impala', 'Glass Animals', 'Jungle'],
      genre: 'Alternative',
      price: '$280',
      match: 92
    }
  ]

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const connectSpotify = () => {
    try {
      // Initiate real Spotify OAuth flow
      initSpotifyAuth()
    } catch (error) {
      console.error('Error initiating Spotify auth:', error)
    }
  }

  const saveEvent = (eventId) => {
    const savedEvents = formData.savedEvents.includes(eventId)
      ? formData.savedEvents.filter(id => id !== eventId)
      : [...formData.savedEvents, eventId]
    updateFormData('savedEvents', savedEvents)
  }

  const bookEvent = (eventId) => {
    const bookedEvents = formData.bookedEvents.includes(eventId)
      ? formData.bookedEvents.filter(id => id !== eventId)
      : [...formData.bookedEvents, eventId]
    updateFormData('bookedEvents', bookedEvents)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // If onComplete prop is provided, use it, otherwise navigate to the new spotify page
      if (onComplete) {
        onComplete()
      } else {
        navigate('/spotify')
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    const step = steps[currentStep]

    switch (step.id) {
      case 'spotify':
        return (
          <div className="text-center space-y-8">
            <div className="w-32 h-32 bg-tertiary rounded-full mx-auto flex items-center justify-center shadow-elevation-8">
              <svg className="w-16 h-16 text-on-tertiary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.5c-.17 0-.33-.09-.43-.25-1.09-1.66-2.62-2.5-4.67-2.5-1.17 0-2.36.21-3.54.63-.15.05-.3.05-.44-.01-.14-.06-.25-.18-.3-.32-.05-.15-.04-.31.04-.44.07-.13.18-.23.32-.28 1.34-.48 2.73-.72 4.13-.72 2.36 0 4.16.97 5.35 2.88.08.13.1.29.05.43-.05.14-.15.25-.29.31-.08.03-.16.04-.22.27z"/>
              </svg>
            </div>
            <p className="text-body-large text-on-surface-variant max-w-md mx-auto">
              Connect your Spotify account to analyze your music taste and find events you'll love
            </p>
                         {!formData.spotifyConnected ? (
               <Button 
                 variant="glow" 
                 onClick={connectSpotify}
                 size="large"
               >
                 Connect Spotify
               </Button>
             ) : (
                             <div className="space-y-4">
                 <div className="w-16 h-16 bg-tertiary rounded-full mx-auto flex items-center justify-center shadow-elevation-2">
                   <svg className="w-8 h-8 text-on-tertiary" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                   </svg>
                 </div>
                                 <p className="text-body-medium text-tertiary">
                   Connected! Analyzing your music taste...
                 </p>
              </div>
            )}
          </div>
        )

      case 'metrics':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant">
                <h3 className="text-title-small text-on-surface mb-2">Listening Hours</h3>
                <p className="text-headline-small text-primary">{mockMetrics.listeningHours}</p>
                <p className="text-body-small text-on-surface-variant">This year</p>
              </div>
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant">
                <h3 className="text-title-small text-on-surface mb-2">Discovery Score</h3>
                <p className="text-headline-small text-secondary">{mockMetrics.discoveryScore}%</p>
                <p className="text-body-small text-on-surface-variant">Above average</p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant space-y-4">
              <h3 className="text-title-medium text-on-surface">Top Genres</h3>
              <div className="flex flex-wrap gap-2">
                {mockMetrics.topGenres.map((genre, index) => (
                  <span key={genre} className={`px-3 py-1 rounded-full text-label-small ${
                    index === 0 ? 'bg-primary text-on-primary' :
                    index === 1 ? 'bg-secondary text-on-secondary' :
                    'bg-tertiary text-on-tertiary'
                  }`}>
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant space-y-4">
              <h3 className="text-title-medium text-on-surface">Top Artists</h3>
              <div className="space-y-2">
                {mockMetrics.topArtists.slice(0, 3).map((artist, index) => (
                  <div key={artist} className="flex items-center gap-3">
                    <span className="text-label-large text-primary">#{index + 1}</span>
                    <span className="text-body-medium text-on-surface">{artist}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant text-center">
                <p className="text-body-small text-on-surface-variant mb-1">Danceability</p>
                <p className="text-title-large text-primary">{mockMetrics.danceability}%</p>
              </div>
              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant text-center">
                <p className="text-body-small text-on-surface-variant mb-1">Energy</p>
                <p className="text-title-large text-secondary">{mockMetrics.energy}%</p>
              </div>
            </div>
          </div>
        )

      case 'events':
        return (
          <div className="space-y-6">
            {mockEvents.map((event) => (
              <div key={event.id} className="bg-surface-container-low rounded-xl p-6 border border-outline-variant space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-title-medium text-on-surface">{event.name}</h3>
                      <span className="px-2 py-1 bg-primary text-on-primary rounded-full text-label-small">
                        {event.match}% match
                      </span>
                    </div>
                    <p className="text-body-small text-on-surface-variant mb-1">{event.date}</p>
                    <p className="text-body-small text-on-surface-variant mb-3">{event.location}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {event.artists.slice(0, 3).map((artist) => (
                        <span key={artist} className="text-label-small text-secondary">
                          {artist}
                        </span>
                      ))}
                    </div>
                    <p className="text-title-small text-on-surface">{event.price}</p>
                  </div>
                </div>
                                 <div className="flex gap-3">
                   <Button
                     variant={formData.bookedEvents.includes(event.id) ? 'success' : 'glow'}
                     onClick={() => bookEvent(event.id)}
                     className="flex-1"
                   >
                     {formData.bookedEvents.includes(event.id) ? 'Booked!' : 'Book Now'}
                   </Button>
                   <Button
                     variant={formData.savedEvents.includes(event.id) ? 'primary' : 'ghost'}
                     onClick={() => saveEvent(event.id)}
                   >
                     {formData.savedEvents.includes(event.id) ? 'Saved' : 'Save'}
                   </Button>
                 </div>
              </div>
            ))}
          </div>
        )

      case 'complete':
        return (
          <div className="text-center space-y-8">
            <div className="w-32 h-32 bg-primary rounded-full mx-auto flex items-center justify-center shadow-elevation-8">
              <svg className="w-16 h-16 text-on-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div className="space-y-4">
              <p className="text-body-large text-on-surface-variant">
                You're all set! 
              </p>
              <p className="text-body-medium text-on-surface-variant">
                {formData.bookedEvents.length > 0 && `${formData.bookedEvents.length} events booked, `}
                {formData.savedEvents.length > 0 && `${formData.savedEvents.length} events saved`}
              </p>
              <p className="text-body-small text-on-surface-variant">
                Start exploring events that match your unique music profile
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (steps[currentStep].id) {
      case 'spotify':
        return formData.spotifyConnected
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="bg-surface-4 border-b border-outline-variant shadow-elevation-1">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-small text-on-surface-variant">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={() => onComplete?.()}
              className="text-label-small text-on-surface-variant hover:text-on-surface transition-colors duration-200"
            >
              Skip
            </button>
          </div>
          <div className="w-full bg-surface-12 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="w-full max-w-md">
          
          {/* Header */}
          <div className="text-center mb-12 space-y-2">
            <h1 className="text-headline-large text-on-surface">
              {steps[currentStep].title}
            </h1>
            <p className="text-body-large text-on-surface-variant">
              {steps[currentStep].subtitle}
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-12">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6"
            >
              Back
            </Button>

            <Button
              variant="primary"
              onClick={nextStep}
              disabled={!canProceed()}
              className="px-8"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
} 