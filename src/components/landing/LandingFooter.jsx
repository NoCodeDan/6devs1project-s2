import React, { useState } from 'react';
import { Music, Twitter, Facebook, Instagram, Youtube, Headphones, Bot, Calendar, MapPin } from 'lucide-react';

const LandingFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const SocialIcon = ({ icon: Icon, href, label }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:from-green-500/40 hover:to-green-600/40 hover:scale-110 hover:shadow-lg hover:shadow-green-500/25"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
      <Icon className="text-green-400 w-5 h-5 relative z-10 group-hover:text-green-300 transition-colors duration-300" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </a>
  );

  const FeatureItem = ({ icon: Icon, title, description }) => (
    <div className="flex items-start space-x-4 p-4 rounded-xl transition-all duration-300">
      <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
        <Icon className="text-green-400 w-5 h-5 transition-colors duration-300" />
      </div>
      <div>
        <h5 className="text-white font-ubuntu-medium text-sm group-hover:text-green-100 transition-colors duration-300 mb-1">
          {title}
        </h5>
        <p className="text-white/60 text-xs font-ubuntu-light group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-900/50 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Top border with glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent blur-sm"></div>

      <div className="relative z-10 px-4 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                      <span className="text-white text-xl font-bold">
                        <Music/>
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-xl blur-md opacity-50 animate-pulse"></div>
                  </div>
                  <h3 className="text-3xl font-bold text-white font-ubuntu-medium">
                    Music<span className="text-green-400">Match</span>
                  </h3>
                </div>
                
                <p className="text-lg text-white/80 mb-6 font-ubuntu-light leading-relaxed">
                  Discover your <span className="font-ubuntu-medium text-green-400">perfect concerts</span> and music events through <span className="font-ubuntu-medium text-green-400">AI-powered Spotify analysis</span>. 
                  Never miss another show that matches your vibe.
                </p>

                {/* Enhanced Social Icons */}
                <div className="flex space-x-4 mb-8">
                  <SocialIcon icon={Music} href="#" label="Spotify" />
                  <SocialIcon icon={Twitter} href="#" label="Twitter" />
                  <SocialIcon icon={Facebook} href="#" label="Facebook" />
                  <SocialIcon icon={Instagram} href="#" label="Instagram" />
                  <SocialIcon icon={Youtube} href="#" label="YouTube" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-green-400 font-ubuntu-medium">50K+</div>
                    <div className="text-sm text-white/70 font-ubuntu-light">Active Users</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-green-400 font-ubuntu-medium">10M+</div>
                    <div className="text-sm text-white/70 font-ubuntu-light">Songs Analyzed</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-green-400 font-ubuntu-medium">5K+</div>
                    <div className="text-sm text-white/70 font-ubuntu-light">Events Matched</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-semibold mb-6 font-ubuntu-medium text-lg flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Features
              </h4>
              <div className="space-y-3">
                <FeatureItem 
                  icon={Headphones}
                  title="Smart Spotify Integration" 
                  description="Deep analysis of your listening habits and preferences"
                />
                <FeatureItem 
                  icon={Bot}
                  title="AI Music Analysis" 
                  description="Advanced algorithms understand your taste"
                />
                <FeatureItem 
                  icon={Calendar}
                  title="Perfect Event Matching" 
                  description="Find concerts that match your vibe"
                />
                <FeatureItem 
                  icon={MapPin}
                  title="Local Discovery" 
                  description="Discover events in your area"
                />
              </div>
            </div>

            {/* Support Section */}
            <div className="lg:col-span-4">
              <h4 className="text-white font-semibold mb-6 font-ubuntu-medium text-lg flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Support
              </h4>
              <ul className="space-y-3">
                {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/70 hover:text-green-400 transition-colors duration-200 font-ubuntu-light flex items-center group">
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full mr-3 group-hover:bg-green-400 transition-colors duration-200"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Newsletter Section moved here */}
              <div className="mt-12">
                <h4 className="text-white font-semibold mb-6 font-ubuntu-medium text-lg flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Stay Updated
                </h4>
                <p className="text-white/70 mb-4 font-ubuntu-light text-sm">
                  Get the latest updates on new features and events.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3 w-full lg:max-w-md">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 font-ubuntu-light"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/10 to-transparent opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-ubuntu-medium transition-all duration-200 hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:shadow-green-500/25 focus:outline-none focus:ring-2 focus:ring-green-500/50 disabled:opacity-50"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? 'Subscribed! ✓' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Section with Wide Radial Gradient Border */}
          <div className="relative pt-8">
            {/* Cool wide radial gradient border effect */}
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-green-500/60 to-transparent"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent blur-sm"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-green-300/30 to-transparent blur-md"></div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <p className="text-white/60 font-ubuntu-light text-sm">
                  © 2025 MusicMatch. All rights reserved.
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-red-400 animate-pulse">💚</span>
                  <span className="text-white/60 font-ubuntu-light text-sm">
                    Made with love for <span className="font-ubuntu-medium text-green-400">music lovers</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-green-400 text-sm font-ubuntu-medium">Live</span>
                </div>
                <div className="text-white/40 text-sm font-ubuntu-light">
                  Powered by AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter; 