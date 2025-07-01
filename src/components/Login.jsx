import { useState } from 'react'
import Button from './Button'
import OnboardingForm from './OnboardingForm'

export default function Login() {
  const [isLoading, setIsLoading] = useState(null) // Track which button is loading
  const [showOnboarding, setShowOnboarding] = useState(false) // Track onboarding state

  const handleSocialLogin = async (provider) => {
    setIsLoading(provider)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(`${provider} login successful`)
      
      // Show onboarding for Instagram login
      if (provider === 'Instagram') {
        setShowOnboarding(true)
      }
      // Handle successful login for other providers
    } catch (error) {
      console.error(`${provider} login failed:`, error)
    } finally {
      setIsLoading(null)
    }
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    console.log('Onboarding completed, redirect to main app')
    // Here you would typically redirect to the main app
  }

  // Show onboarding form if user completed Instagram login
  if (showOnboarding) {
    return <OnboardingForm onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-display-small text-on-surface mb-4">
            Welcome
          </h1>
          <p className="text-body-large text-on-surface-variant max-w-2xl mx-auto">
            Choose your preferred way to continue
          </p>
        </div>

        {/* Login Options */}
        <div className="space-y-6 flex flex-col items-center">
          
          {/* Instagram Login */}
          <Button
            variant="primary"
            size="large"
            onClick={() => handleSocialLogin('Instagram')}
            disabled={isLoading !== null}
            className="w-80 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 elevation-2 hover:elevation-4 transition-all duration-200"
          >
            {isLoading === 'Instagram' ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-label-large">Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-label-large">Continue with Instagram</span>
              </div>
            )}
          </Button>

          {/* Spotify Login */}
          <Button
            variant="primary"
            size="large"
            onClick={() => handleSocialLogin('Spotify')}
            disabled={isLoading !== null}
            className="w-80 bg-green-500 hover:bg-green-600 border-0 elevation-2 hover:elevation-4 transition-all duration-200"
          >
            {isLoading === 'Spotify' ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-label-large">Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.85-.106-.973-.523-.12-.418.107-.849.524-.969 4.571-1.045 8.492-.595 11.655 1.338.391.217.471.69.376 1.055zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.984-1.44-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span className="text-label-large">Continue with Spotify</span>
              </div>
            )}
          </Button>

        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-body-small text-on-surface-variant leading-relaxed">
            By continuing, you agree to our terms of service and privacy policy
          </p>
        </div>

      </div>
    </div>
  )
}