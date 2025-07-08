import React, { forwardRef } from 'react';
import DisplayCards from '../DisplayCards.jsx';

const LandingAIWorld = forwardRef((props, ref) => {
  const aiCards = [
    {
      icon: "🎵",
      title: "Deep Analysis",
      description: "Analyzes your music taste across genres, artists, and listening patterns to create your detailed musical profile",
      detail: "First Step",
      titleClassName: "text-green-400",
      iconClassName: "text-green-400"
    },
    {
      icon: "🧠",
      title: "Smart Insights", 
      description: "Understands your mood preferences, energy levels, and the emotional context of your music choices",
      detail: "Processing",
      titleClassName: "text-green-400",
      iconClassName: "text-green-400"
    },
    {
      icon: "📊",
      title: "Precise Matching",
      description: "94% accuracy in matching your music personality with events that perfectly fit your vibe",
      detail: "Final Result",
      titleClassName: "text-green-400",
      iconClassName: "text-green-400"
    }
  ];

  return (
    <section ref={ref} className="w-full relative z-10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left side - Header and subtitle */}
          <div className="flex-1 lg:max-w-xl text-center lg:text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-ubuntu-medium leading-tight">
                AI-Powered Music Analysis
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-ubuntu-light leading-relaxed">
                Our <span className="font-ubuntu-medium text-green-400">advanced AI</span> dives deep into your music DNA to understand your unique taste
              </p>
            </div>
          </div>

          {/* Right side - Display Cards */}
          <div className="flex-1 relative z-10 w-full">
            <div className="flex items-center justify-center">
              <DisplayCards cards={aiCards} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

LandingAIWorld.displayName = 'LandingAIWorld';

export default LandingAIWorld; 