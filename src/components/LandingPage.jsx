import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from './Card';
import { initSpotifyAuth } from '../services/spotifyService';
import OnboardingForm from './OnboardingForm';

// Landing page sections
import {
  LandingHero,
  LandingAIWorld,
  LandingDiscoveryWorld,
  LandingSocialWorld,
  LandingHowItWorks,
  LandingFooter,
  AnimatedWaves
} from './landing';
import MusicToggler from './global/MusicToggler';

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

const mockSummary = () => `Hey music lover!\n\nYou're a true Indie Explorer. You love discovering new artists and your playlists are a mix of alternative, electronic, and indie pop. You thrive at music festivals, underground gigs, and unique local events.\n\nRecommended events: Indie music festivals, secret warehouse parties, and live sessions at cozy venues.`;

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [demo, setDemo] = useState(false);
  const [isInstagramLoading, setIsInstagramLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Refs for animations
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  
  // World sections refs
  const aiWorldRef = useRef(null);
  const discoveryWorldRef = useRef(null);
  const socialWorldRef = useRef(null);
  const howItWorksRef = useRef(null);
  const loadingRef = useRef(null);
  const summaryRef = useRef(null);

  // Dynamic background ref
  const dynamicBgRef = useRef(null);

  // GSAP animations with ScrollTrigger
  useGSAP(() => {
    // Initial setup - hide all elements
    gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonsRef.current], {
      opacity: 0,
      y: 50
    });

    // Hero entrance animation
    const heroTl = gsap.timeline();
    heroTl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.7)",
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.5")
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.4")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3");

    // ========= SECTION REVEAL ANIMATIONS =========
    
    // AI World - Smooth fade in (first section, needs special handling)
    gsap.set(aiWorldRef.current, { opacity: 0, y: 50 }); // Ensure it starts hidden
    gsap.to(aiWorldRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: aiWorldRef.current,
        start: "top 90%", // Later trigger since it's close to hero
        toggleActions: "play none none reverse"
      }
    });

    // Discovery World - Smooth fade in
    gsap.fromTo(discoveryWorldRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: discoveryWorldRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    // Social World - Smooth fade in
    gsap.fromTo(socialWorldRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: socialWorldRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    // How It Works - Smooth fade in
    gsap.fromTo(howItWorksRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: howItWorksRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

  }, { scope: containerRef });

  // Cleanup ScrollTrigger on unmount
  useGSAP(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animation for loading state
  useGSAP(() => {
    if (loading && demo && loadingRef.current) {
      gsap.fromTo(loadingRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [loading, demo]);

  // Animation for summary
  useGSAP(() => {
    if (summary && demo && summaryRef.current) {
      gsap.fromTo(summaryRef.current, 
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, [summary, demo]);

  const handleConnectSpotify = async () => {
    console.log("✅ 'Connect Spotify' button clicked");
    setLoading(true);
    
    // Add button click animation
    gsap.to(buttonsRef.current?.children[0], {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    
    try {
      await initSpotifyAuth();
    } catch (error) {
      console.error('Error initiating Spotify auth:', error);
      setLoading(false);
    }
  };

  const handleInstagramLogin = async () => {
    setIsInstagramLoading(true);
    setLoading(true);
    
    // Add button click animation
    gsap.to(buttonsRef.current?.children[1], {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    
    try {
      // Simulate Instagram login API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Instagram login successful');
      
      // Show onboarding after successful Instagram login
      setShowOnboarding(true);
      setLoading(false);
      setIsInstagramLoading(false);
    } catch (error) {
      console.error('Instagram login failed:', error);
      setLoading(false);
      setIsInstagramLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    console.log('Onboarding completed, redirect to main app');
    // Here you would typically redirect to the main app or dashboard
  };

  const handleMusicToggle = (isMuted) => {
    // Music control is now handled directly in the MusicToggler component
    console.log('Music toggled:', isMuted ? 'muted' : 'unmuted');
  };

  // Show onboarding form if user completed Instagram login
  if (showOnboarding) {
    return <OnboardingForm onComplete={handleOnboardingComplete} />;
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Dynamic Smooth Background */}
      <div 
        ref={dynamicBgRef}
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, #10b98155 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, #065f4633 0%, transparent 60%),
            linear-gradient(135deg, #000000cc 0%, #000000ee 50%, #111827ff 100%)
          `
        }}
      />

      {/* Smooth Gradient Overlays for Seamless Blending */}
      <div className="fixed inset-0 z-1">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent opacity-50 w-full"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-30 w-full"></div>
      </div>

      {/* Music Toggler */}
      <MusicToggler onToggle={handleMusicToggle} />
      
      {/* Animated Waves Background */}
      <AnimatedWaves />
      
      {/* HERO WORLD */}
      <LandingHero
        ref={heroRef}
        loading={loading}
        onConnectSpotify={handleConnectSpotify}
        onInstagramLogin={handleInstagramLogin}
        titleRef={titleRef}
        subtitleRef={subtitleRef}
        descriptionRef={descriptionRef}
        buttonsRef={buttonsRef}
      />

      {/* AI ANALYSIS WORLD */}
      <LandingAIWorld ref={aiWorldRef} />

      {/* DISCOVERY WORLD */}
      <LandingDiscoveryWorld ref={discoveryWorldRef} />

      {/* SOCIAL WORLD */}
      <LandingSocialWorld ref={socialWorldRef} />

      {/* HOW IT WORKS WORLD */}
      <LandingHowItWorks ref={howItWorksRef} />

      {/* RESULT SECTION */}
      {loading && demo && (
        <div ref={loadingRef} className="flex flex-col items-center py-12 sm:py-24 relative z-10 px-4">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-green-400 mb-6"></div>
          <p className="text-lg sm:text-xl text-white font-ubuntu-light text-center">
            Analyzing your <span className="font-ubuntu-medium">Spotify</span>... Hang tight!
          </p>
        </div>
      )}
      
      {summary && demo && (
        <section className="py-12 sm:py-24 relative z-10 px-4">
          <Card ref={summaryRef} className="max-w-2xl w-full mx-auto p-6 sm:p-8 bg-surface-variant/90 backdrop-blur-md shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-green-400 mb-4 sm:mb-6 text-center font-ubuntu-medium">
              Your Music Personality & Event Matches
            </h3>
            <pre className="text-base sm:text-lg text-on-surface-variant whitespace-pre-wrap text-center font-ubuntu-light">
              {summary}
            </pre>
          </Card>
        </section>
      )}

      {/* FOOTER */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage; 