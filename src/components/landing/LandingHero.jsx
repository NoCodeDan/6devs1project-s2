import React, { forwardRef } from 'react';
import Button from '../Button';

const LandingHero = forwardRef(({
  loading,
  onConnectSpotify,
  onInstagramLogin,
  titleRef,
  subtitleRef,
  descriptionRef,
  buttonsRef
}, heroRef) => {
  return (
    <section className="min-h-screen w-screen flex flex-col items-center justify-center relative z-10">
      <div ref={heroRef} className="max-w-2xl w-full text-center relative z-10 px-4 py-12">
        <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-lg font-ubuntu-medium">
          Find Your Perfect
          <span ref={subtitleRef} className="block text-green-400 mt-2 font-ubuntu-medium">
            Concert Matches
          </span>
        </h1>
        <p ref={descriptionRef} className="text-lg sm:text-xl lg:text-2xl text-on-surface-variant mb-6 sm:mb-8 text-white/90 font-ubuntu-light px-2 sm:px-0">
          Connect your <span className="font-ubuntu-medium">Spotify</span> and get a{' '}
          <span className="font-ubuntu-medium">personalized music & event summary</span> powered by AI.
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
          <Button
            type="button"
            variant="primary"
            onClick={onConnectSpotify}
            className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg transition-all duration-200 font-ubuntu-medium w-full sm:w-auto min-w-[200px]"
            disabled={loading}
          >
            {loading ? 'Redirecting...' : 'Connect Spotify'}
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={onInstagramLogin}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg transition-all duration-200 font-ubuntu-medium w-full sm:w-auto min-w-[200px]"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Continue with Instagram</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
});

LandingHero.displayName = 'LandingHero';

export default LandingHero; 