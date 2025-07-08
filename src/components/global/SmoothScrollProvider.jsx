import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Duration of the scroll animation in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function for smooth animation
      orientation: 'vertical', // Scroll orientation
      gestureOrientation: 'vertical', // Gesture orientation
      smoothWheel: true, // Enable smooth wheel scrolling
      wheelMultiplier: 1, // Wheel scroll multiplier
      touchMultiplier: 1, // Touch scroll multiplier
      infinite: false, // Disable infinite scrolling
      autoResize: true, // Auto resize based on content
      overscroll: true, // Enable overscroll behavior
      lerp: 0.1, // Linear interpolation intensity (0-1) - lower = smoother
    });

    // Start the animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider; 