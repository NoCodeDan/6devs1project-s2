import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const MusicToggler = ({ onToggle }) => {
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const audioRef = useRef(null);
  const wavesRef = useRef([]);

  // Initialize audio
  useEffect(() => {
    // Create audio instance
    audioRef.current = new Audio('/music/bg-music.mp3');
    audioRef.current.loop = true; // Loop the background music
    audioRef.current.volume = 0.3; // Set moderate volume
    
    // Handle audio loading
    const handleCanPlay = () => {
      setIsLoading(false);
    };
    
    const handleError = (e) => {
      console.error('Error loading audio:', e);
      setIsLoading(false);
    };
    
    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('error', handleError);
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useGSAP(() => {
    // Entrance animation
    gsap.fromTo(buttonRef.current, 
      { 
        opacity: 0, 
        scale: 0.8,
        y: -20 
      },
      { 
        opacity: 1, 
        scale: 1,
        y: 0,
        duration: 0.8, 
        ease: "back.out(1.7)",
        delay: 1
      }
    );
  }, []);

  // Wave animations that respond to music state
  useGSAP(() => {
    if (!isMuted && !isLoading) {
      // Animate waves when music is playing
      wavesRef.current.forEach((wave, index) => {
        if (wave) {
          gsap.to(wave, {
            scaleY: () => Math.random() * 0.8 + 0.3,
            duration: () => Math.random() * 0.5 + 0.3,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.1
          });
        }
      });
    } else {
      // Stop wave animations when music is paused
      wavesRef.current.forEach((wave) => {
        if (wave) {
          gsap.killTweensOf(wave);
          gsap.to(wave, {
            scaleY: 0.2,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    }
  }, [isMuted, isLoading]);

  const handleToggle = async () => {
    if (isLoading || !audioRef.current) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    try {
      if (newMutedState) {
        // Pause music
        audioRef.current.pause();
      } else {
        // Play music
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Error controlling audio:', error);
      // Revert state if audio fails
      setIsMuted(!newMutedState);
      return;
    }
    
    // Icon animation on toggle
    gsap.to(iconRef.current, {
      scale: 0.8,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.to(iconRef.current, {
          rotateY: 360,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });

    // Button pulse effect
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });

    // Call parent callback if provided
    if (onToggle) {
      onToggle(newMutedState);
    }
  };

  // Music note icon (unmuted)
  const MusicNoteIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-200"
    >
      <path 
        d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12ZM10 19C8.9 19 8 18.1 8 17S8.9 15 10 15 12 15.9 12 17 11.1 19 10 19Z" 
        fill="currentColor"
      />
    </svg>
  );

  // Muted music note icon (with line through it)
  const MutedMusicIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-200"
    >
      <path 
        d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12ZM10 19C8.9 19 8 18.1 8 17S8.9 15 10 15 12 15.9 12 17 11.1 19 10 19Z" 
        fill="currentColor"
        opacity="0.5"
      />
      {/* Diagonal line for muted state */}
      <line 
        x1="4" 
        y1="4" 
        x2="20" 
        y2="20" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="fixed top-6 right-6 z-[9999] pointer-events-none">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        disabled={isLoading}
        className={`
          w-12 h-12 rounded-full
          flex items-center justify-center
          backdrop-blur-md border border-white/20
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          font-ubuntu-medium
          relative overflow-hidden
          pointer-events-auto
          ${isLoading 
            ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' 
            : isMuted 
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:border-red-400/40' 
              : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:border-green-400/40'
          }
        `}
        title={isLoading ? 'Loading Music...' : isMuted ? 'Unmute Music' : 'Mute Music'}
      >
        {/* Animated waves background - only visible when music is playing */}
        {!isMuted && !isLoading && (
          <div className="absolute inset-0 flex items-end justify-center opacity-30 pointer-events-none">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                ref={el => wavesRef.current[i] = el}
                className="w-1 mx-0.5 rounded-t-sm origin-bottom bg-green-400/60"
                style={{
                  height: `${20 + i * 2}px`,
                  transform: 'scaleY(0.2)'
                }}
              />
            ))}
          </div>
        )}
        
        <div ref={iconRef} className="flex items-center justify-center relative z-10">
          {isLoading ? (
            <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
          ) : isMuted ? (
            <MutedMusicIcon />
          ) : (
            <MusicNoteIcon />
          )}
        </div>
      </button>
    </div>
  );
};

export default MusicToggler; 