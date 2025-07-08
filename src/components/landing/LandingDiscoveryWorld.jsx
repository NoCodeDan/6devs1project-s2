import React, { forwardRef } from 'react';
import DisplayCards from '../DisplayCards.jsx';

const LandingDiscoveryWorld = forwardRef((props, ref) => {
  const discoveryCards = [
    {
      icon: "🎤",
      title: "Spotify Powered",
      description: "Direct integration with your music library for seamless analysis",
      detail: "Connected",
      titleClassName: "text-green-400",
      iconClassName: "text-green-400"
    },
    {
      icon: "📍",
      title: "Local Events",
      description: "Find concerts in your city and nearby areas",
      detail: "Nearby",
      titleClassName: "text-green-400",
      iconClassName: "text-green-400"
    },
    {
      icon: "🎪",
      title: "Festivals",
      description: "Discover music festivals that match your vibe",
      detail: "Worldwide",
      titleClassName: "text-green-400",
      iconClassName: "text-green-400"
    }
  ];

  return (
    <section ref={ref} className="w-full relative z-10 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left side - Display Cards */}
          <div className="flex-1 relative z-10 order-2 lg:order-1">
            <div className="flex items-center justify-center lg:justify-start">
              <DisplayCards cards={discoveryCards} />
            </div>
          </div>

          {/* Right side - Header and subtitle */}
          <div className="flex-1 lg:max-w-xl order-1 lg:order-2">
            <div className="text-center lg:text-right">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-ubuntu-medium leading-tight">
                Discover Your Perfect Events
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-ubuntu-light leading-relaxed">
                From <span className="font-ubuntu-medium text-green-400">intimate venues</span> to <span className="font-ubuntu-medium text-green-400">massive festivals</span>, find events that match your soul
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

LandingDiscoveryWorld.displayName = 'LandingDiscoveryWorld';

export default LandingDiscoveryWorld; 