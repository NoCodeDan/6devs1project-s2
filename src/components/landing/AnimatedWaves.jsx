import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const AnimatedWaves = () => {
  const waveRef = useRef([]);
  
  useGSAP(() => {
    // Create wave animations for each bar
    waveRef.current.forEach((bar, index) => {
      if (bar) {
        gsap.to(bar, {
          scaleY: () => Math.random() * 0.8 + 0.2,
          duration: () => Math.random() * 0.5 + 0.3,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.05 // Reduced delay for more waves
        });
      }
    });
  }, []);

  // Also add a continuous refresh animation for variety
  useGSAP(() => {
    const refreshAnimation = () => {
      waveRef.current.forEach((bar, index) => {
        if (bar && Math.random() > 0.7) { // Only animate some bars randomly
          gsap.to(bar, {
            scaleY: Math.random() * 0.9 + 0.1,
            duration: Math.random() * 0.3 + 0.2,
            ease: "power2.inOut",
          });
        }
      });
    };

    // Call refresh every 200ms for dynamic movement
    const interval = setInterval(refreshAnimation, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen h-screen absolute w-full">
      <div className="bottom-0 left-0 pointer-events-none opacity-15 sm:opacity-25 w-full h-full">
        <div className="flex items-end justify-center h-full w-full space-x-0.5 sm:space-x-1 overflow-hidden">
          {Array.from({ length: window.innerWidth < 640 ? 80 : 140 }, (_, i) => (
            <div
              key={i}
              ref={el => waveRef.current[i] = el}
              className="bg-green-400 rounded-t-lg origin-bottom flex-shrink-0"
              style={{
                width: window.innerWidth < 640 ? '8px' : '10px',
                minWidth: window.innerWidth < 640 ? '8px' : '10px',
                height: `${Math.random() * (window.innerWidth < 640 ? 300 : 500) + 50}px`,
                transform: 'scaleY(0.3)'
              }}
            />
          ))}
        </div>
      </div>
      {/* Overlay with radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 0%, transparent 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.9) 100%)`
        }}
      />
    </div>
  );
};

export default AnimatedWaves; 