import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Button from './Button';

const QuestionScreen = ({
  header,
  question,
  options = [],
  voiceLine,
  onNext,
  onSelect,
  selected,
  inputType = 'options',
  inputValue = '',
  onInputChange,
  nextDisabled,
  step,
  totalSteps,
  onVoiceLine
}) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const headerRef = useRef(null);
  const questionRef = useRef(null);
  const optionsRef = useRef(null);
  const voiceLineRef = useRef(null);
  const nextButtonRef = useRef(null);
  const progressRef = useRef(null);
  const underlineRef = useRef(null);
  const backgroundRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    if (onVoiceLine) onVoiceLine(voiceLine);
  }, [voiceLine, onVoiceLine]);

  // Unified gradient-like fade animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Initial state - everything hidden
    gsap.set([
      backgroundRef.current,
      cardRef.current,
      progressRef.current,
      headerRef.current, 
      underlineRef.current,
      questionRef.current, 
      optionsRef.current, 
      voiceLineRef.current, 
      nextButtonRef.current
    ], {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)'
    });

    // Everything fades in together as one smooth gradient
    tl.to([
      backgroundRef.current,
      cardRef.current,
      progressRef.current,
      headerRef.current, 
      underlineRef.current,
      questionRef.current, 
      optionsRef.current, 
      voiceLineRef.current, 
      nextButtonRef.current
    ], {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: "power2.out"
    });

    // Underline scale animation (separate from opacity)
    gsap.fromTo(underlineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );

    // Buttons fade in together (no stagger)
    const buttons = buttonRefs.current.filter(Boolean);
    if (buttons.length > 0) {
      gsap.set(buttons, { opacity: 0, y: 15, filter: 'blur(5px)' });
      gsap.to(buttons, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "power2.out"
      });
    }

  }, [step]); // Re-run when step changes

  // Smooth progress bar animation
  useGSAP(() => {
    const progressDots = progressRef.current?.querySelectorAll('.progress-dot');
    if (progressDots) {
      progressDots.forEach((dot, i) => {
        if (i <= step) {
          gsap.to(dot, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    }
  }, [step]);

  // Subtle magnetic button effect
  const handleMouseMove = (e, buttonRef) => {
    const button = buttonRef.current;
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.08;
    const deltaY = (e.clientY - centerY) * 0.08;
    
    gsap.to(button, {
      x: deltaX,
      y: deltaY,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (buttonRef) => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  // Smooth button click animation
  const handleButtonClick = (option, buttonRef) => {
    gsap.to(buttonRef.current, {
      opacity: 0.8,
      duration: 0.1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(buttonRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    });
    onSelect(option);
  };

  // Ultra-smooth next button animation
  const handleNextClick = () => {
    const tl = gsap.timeline();
    
    // Smooth fade out
    tl.to([headerRef.current, questionRef.current, optionsRef.current, voiceLineRef.current], {
      opacity: 0,
      y: -20,
      filter: 'blur(8px)',
      duration: 0.4,
      stagger: 0.04,
      ease: "power2.in"
    })
    // Card smooth exit
    .to(cardRef.current, {
      opacity: 0.7,
      y: -10,
      filter: 'blur(3px)',
      duration: 0.4,
      ease: "power2.in",
      onComplete: onNext
    }, "-=0.2");
  };

  // Format voice line with proper bold text
  const formatVoiceLine = (text) => {
    if (!text) return '';
    return text.split('*').map((part, index) => {
      if (index % 2 === 1) {
        return <span key={index} className="font-ubuntu-medium text-green-300">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Smooth gradient background (same as LandingPage) */}
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

      {/* Smooth gradient overlays for seamless blending */}
      <div className="absolute inset-0 z-1">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent opacity-50 w-full"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-30 w-full"></div>
      </div>

      <div className="relative z-10 px-4 py-12 w-full max-w-4xl">
        <div className="relative">
          {/* Enhanced glassmorphism card */}
          <div 
            ref={cardRef}
            className="relative bg-gradient-to-br from-white/12 to-white/6 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/25 p-8 md:p-12 transition-all duration-700 hover:shadow-green-500/15"
            style={{
              boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Enhanced multi-layer glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/8 to-transparent rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-green-500/8 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-green-500/6 to-transparent rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-green-500/4 to-transparent rounded-3xl"></div>
            
            {/* Enhanced progress indicator */}
            {typeof step === 'number' && typeof totalSteps === 'number' && (
              <div ref={progressRef} className="flex justify-between items-center mb-8">
                <div className="flex space-x-4">
                  {[...Array(totalSteps)].map((_, i) => (
                    <div
                      key={i}
                      className={`progress-dot w-3 h-3 rounded-full transition-all duration-700 ${
                        i <= step 
                          ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-lg shadow-green-500/60' 
                          : 'bg-white/25 hover:bg-white/35'
                      }`}
                      style={{
                        boxShadow: i <= step ? '0 0 25px rgba(34, 197, 94, 0.6)' : 'none'
                      }}
                    ></div>
                  ))}
                </div>
                <div className="text-white/70 text-sm font-ubuntu-light">
                  <span className="text-white/80 font-ubuntu-medium">{step + 1}</span> of {totalSteps}
                </div>
              </div>
            )}

            {/* Enhanced header with refined glow */}
            <div className="text-center mb-12 flex flex-col">
              <h2 
                ref={headerRef}
                className="text-4xl md:text-5xl font-bold text-white font-ubuntu-medium mb-8 relative"
                style={{
                  textShadow: '0 0 40px rgba(34, 197, 94, 0.4), 0 0 80px rgba(34, 197, 94, 0.2)'
                }}
              >
                {header}
                <div 
                  ref={underlineRef}
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full"
                  style={{
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)'
                  }}
                ></div>
              </h2>
              <p 
                ref={questionRef}
                className="text-xl md:text-2xl text-white/95 font-ubuntu-light mt-4 leading-relaxed"
                style={{
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                }}
              >
                {question}
              </p>
            </div>

            {/* Enhanced input section */}
            <div ref={optionsRef} className="mb-8">
              {inputType === 'options' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {options.map((option, index) => (
                    <button
                      key={option}
                      ref={el => buttonRefs.current[index] = el}
                      onMouseMove={(e) => handleMouseMove(e, { current: buttonRefs.current[index] })}
                      onMouseLeave={() => handleMouseLeave({ current: buttonRefs.current[index] })}
                      onClick={() => handleButtonClick(option, { current: buttonRefs.current[index] })}
                      className={`group relative overflow-hidden rounded-2xl border-2 px-6 py-4 text-lg font-ubuntu-medium transition-all duration-400 ${
                        selected === option
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-400 shadow-lg shadow-green-500/60'
                          : 'bg-gradient-to-br from-white/12 to-white/6 text-white border-white/25 hover:border-green-400/60 hover:bg-white/25'
                      }`}
                      style={{
                        boxShadow: selected === option 
                          ? '0 0 40px rgba(34, 197, 94, 0.5), 0 15px 25px rgba(0, 0, 0, 0.4)'
                          : '0 8px 20px rgba(0, 0, 0, 0.3)',
                        textShadow: selected === option ? '0 0 10px rgba(255, 255, 255, 0.3)' : 'none'
                      }}
                    >
                      {/* Enhanced hover effects */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 to-green-600/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-sm"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/25 to-green-600/25 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                      
                      {/* Button content */}
                      <span className="relative z-10">{option}</span>
                      
                      {/* Enhanced selected indicator */}
                      {selected === option && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full shadow-lg shadow-white/60">
                          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-60"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
              
              {inputType === 'text' && (
                <div className="relative max-w-lg mx-auto">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => onInputChange(e.target.value)}
                    placeholder="Type your city..."
                    className="w-full px-6 py-4 rounded-2xl border-2 text-xl bg-white/12 text-white border-white/25 focus:outline-none focus:ring-2 focus:ring-green-500/60 focus:border-green-500/60 transition-all duration-400 font-ubuntu-light placeholder-white/60 backdrop-blur-sm"
                    style={{
                      boxShadow: '0 0 30px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                    }}
                    autoFocus
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/30 to-transparent opacity-0 focus-within:opacity-100 transition-opacity duration-400 pointer-events-none blur-sm"></div>
                </div>
              )}
            </div>

            {/* Enhanced voice line */}
            <div ref={voiceLineRef} className="mb-8 text-center">
              <div 
                className="inline-block bg-gradient-to-r from-green-500/25 to-green-600/25 rounded-xl px-6 py-3 backdrop-blur-sm border border-green-500/40 relative"
                style={{
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/15 to-transparent rounded-xl opacity-60"></div>
                <p className="text-green-400 font-ubuntu-light italic text-lg min-h-[1.5rem] relative z-10">
                  {formatVoiceLine(voiceLine)}
                </p>
              </div>
            </div>

            {/* Enhanced next button */}
            <div className="text-center">
              <button
                ref={nextButtonRef}
                onClick={handleNextClick}
                disabled={nextDisabled}
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white text-xl px-12 py-4 rounded-full font-ubuntu-medium transition-all duration-400 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/60 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: '0 0 40px rgba(34, 197, 94, 0.5), 0 15px 25px rgba(0, 0, 0, 0.4)',
                  filter: nextDisabled ? 'grayscale(60%)' : 'none',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
                }}
              >
                {/* Enhanced button effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/40 to-green-500/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-md"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center">
                  Next
                  <svg 
                    className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-400 transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default QuestionScreen; 