import React, { forwardRef } from 'react';
import DisplayCards from '../DisplayCards.jsx';

const LandingSocialWorld = forwardRef((props, ref) => {
  const socialCards = [
    {
      icon: "👥",
      title: "Social Discovery",
      description: "Connect with friends who share your music taste and discover events together through shared playlists",
      detail: "Community",
      titleClassName: "text-green-400",
      iconClassName: "text-green-400"
    },
    {
      icon: "⚡",
      title: "Personalized Experience",
      description: "Tailored recommendations that evolve with your changing music taste and social connections",
      detail: "Dynamic",
      titleClassName: "text-green-400",
      iconClassName: "text-green-400"
    },
    {
      icon: "🎵",
      title: "Shared Vibes",
      description: "Experience events with friends who understand your musical DNA and energy",
      detail: "Together",
      titleClassName: "text-green-400",
      iconClassName: "text-green-400"
    }
  ];

  return (
    <section ref={ref} className="w-full relative z-10 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left side - Header and subtitle */}
          <div className="flex-1 lg:max-w-xl">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-ubuntu-medium leading-tight">
                Connect & Share
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-ubuntu-light leading-relaxed">
                Music brings people together. <span className="font-ubuntu-medium text-green-400">Find your tribe</span> and experience events with friends who share your taste
              </p>
            </div>
          </div>

          {/* Right side - Display Cards */}
          <div className="flex-1 relative z-10">
            <div className="flex items-center justify-center lg:justify-end">
              <DisplayCards cards={socialCards} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

LandingSocialWorld.displayName = 'LandingSocialWorld';

export default LandingSocialWorld; 