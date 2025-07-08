import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const CompletionScreen = () => {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const cardRef = useRef(null);
  const headerRef = useRef(null);
  const messageRef = useRef(null);
  const iconRef = useRef(null);

  // Unified fade animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Initial state - everything hidden
    gsap.set([
      backgroundRef.current,
      cardRef.current,
      headerRef.current,
      messageRef.current,
      iconRef.current
    ], {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)'
    });

    // Everything fades in together
    tl.to([
      backgroundRef.current,
      cardRef.current,
      headerRef.current,
      messageRef.current,
      iconRef.current
    ], {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: "power2.out"
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Same background as QuestionScreen */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, #10b98155 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, #065f4633 0%, transparent 60%),
            linear-gradient(135deg, #000000cc 0%, #000000ee 50%, #111827ff 100%)
          `
        }}
      />

      {/* Smooth gradient overlays */}
      <div className="absolute inset-0 z-1">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent opacity-50 w-full"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-30 w-full"></div>
      </div>

      <div className="relative z-10 px-4 py-12 w-full max-w-4xl">
        <div className="relative">
          {/* Same card styling as QuestionScreen */}
          <div 
            ref={cardRef}
            className="relative bg-gradient-to-br from-white/12 to-white/6 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/25 p-8 md:p-12 transition-all duration-700"
            style={{
              boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/8 to-transparent rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-green-500/8 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-green-500/6 to-transparent rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-green-500/4 to-transparent rounded-3xl"></div>
            
            {/* Completion content */}
            <div className="text-center flex flex-col gap-6">
              {/* Success icon */}
              <div ref={iconRef} className="mb-8 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                  <svg 
                    className="w-10 h-10 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* Header */}
              <h2 
                ref={headerRef}
                className="text-4xl md:text-5xl font-bold text-white font-ubuntu-medium mb-8 relative"
                style={{
                  textShadow: '0 0 40px rgba(34, 197, 94, 0.4), 0 0 80px rgba(34, 197, 94, 0.2)'
                }}
              >
                Finished!
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full"
                  style={{
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)'
                  }}
                ></div>
              </h2>

              {/* Message */}
              <div 
                ref={messageRef}
                className="max-w-2xl mx-auto"
              >
                <p className="text-xl md:text-2xl text-white/95 font-ubuntu-light leading-relaxed mb-6"
                  style={{
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  🎉 Awesome! You've completed the setup.
                </p>
                <p className="text-lg md:text-xl text-white/80 font-ubuntu-light leading-relaxed">
                  We're now processing your preferences to find the <span className="font-ubuntu-medium text-green-400">perfect events</span> that match your unique vibe. 
                  Get ready to discover your next favorite experience!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen; 