import React, { forwardRef } from 'react';
import DisplayCards from '../DisplayCards.jsx';

const LandingHowItWorks = forwardRef((props, ref) => {
  const stepCards = [
    {
      icon: "🎵",
      title: "Connect Spotify",
      description: "Connect your Spotify account securely and let us access your music library",
      detail: "Step 1",
      titleClassName: "text-green-400",
      iconClassName: "text-green-400"
    },
    {
      icon: "🧠",
      title: "AI Analysis",
      description: "Our advanced AI analyzes your music taste, genres, and listening patterns",
      detail: "Step 2",
      titleClassName: "text-green-400",
      iconClassName: "text-green-400"
    },
    {
      icon: "🎯",
      title: "Get Matches",
      description: "Receive your perfect event matches tailored to your unique music personality",
      detail: "Step 3",
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
              <DisplayCards cards={stepCards} />
            </div>
          </div>

          {/* Right side - Header and subtitle */}
          <div className="flex-1 lg:max-w-xl order-1 lg:order-2">
            <div className="text-center lg:text-right">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-ubuntu-medium leading-tight">
                How It Works
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-ubuntu-light leading-relaxed">
                Get from your <span className="font-ubuntu-medium text-green-400">Spotify playlist</span> to your <span className="font-ubuntu-medium text-green-400">perfect concert</span> in just three steps
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

LandingHowItWorks.displayName = 'LandingHowItWorks';

export default LandingHowItWorks; 