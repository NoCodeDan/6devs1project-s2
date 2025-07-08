import React, { forwardRef } from 'react';
import Button from '../Button';

const LandingHero = forwardRef(({
  loading,
  onConnectSpotify,
  onDemo,
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
            variant="ghost"
            onClick={onDemo}
            className="text-green-400 border-green-400 hover:bg-green-500/10 px-6 sm:px-8 py-3 sm:py-4 font-ubuntu-medium w-full sm:w-auto min-w-[200px]"
            disabled={loading}
          >
            Try Demo
          </Button>
        </div>
      </div>
    </section>
  );
});

LandingHero.displayName = 'LandingHero';

export default LandingHero; 