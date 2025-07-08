import React, { useRef, useState } from 'react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  variant = 'default',
  className = '',
  children,
  ...props 
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const accentColors = {
    default: { 
      glow: 'rgba(16, 185, 129, 0.3)',
      border: 'rgba(16, 185, 129, 0.2)',
      text: 'text-green-400'
    },
    green: { 
      glow: 'rgba(16, 185, 129, 0.4)',
      border: 'rgba(16, 185, 129, 0.3)',
      text: 'text-green-300'
    },
    purple: { 
      glow: 'rgba(16, 185, 129, 0.3)',
      border: 'rgba(16, 185, 129, 0.2)',
      text: 'text-green-400'
    },
    cyan: { 
      glow: 'rgba(5, 150, 105, 0.3)',
      border: 'rgba(5, 150, 105, 0.2)',
      text: 'text-green-400'
    },
    blue: { 
      glow: 'rgba(16, 185, 129, 0.3)',
      border: 'rgba(16, 185, 129, 0.2)',
      text: 'text-green-400'
    },
    orange: { 
      glow: 'rgba(16, 185, 129, 0.3)',
      border: 'rgba(16, 185, 129, 0.2)',
      text: 'text-green-400'
    },
    red: { 
      glow: 'rgba(16, 185, 129, 0.3)',
      border: 'rgba(16, 185, 129, 0.2)',
      text: 'text-green-400'
    },
    pink: { 
      glow: 'rgba(16, 185, 129, 0.3)',
      border: 'rgba(16, 185, 129, 0.2)',
      text: 'text-green-400'
    },
    indigo: { 
      glow: 'rgba(16, 185, 129, 0.3)',
      border: 'rgba(16, 185, 129, 0.2)',
      text: 'text-green-400'
    },
  };

  const currentColors = accentColors[variant];

  const cardStyle = {
    background: `
      linear-gradient(135deg, 
        #000000 0%, 
        #1f2937 50%, 
        #374151 100%
      )
    `,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${isHovered ? currentColors.border : 'rgba(255, 255, 255, 0.1)'}`,
    borderRadius: '24px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    height: '320px',
    transformOrigin: 'center',
    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    boxShadow: isHovered 
      ? `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px ${currentColors.glow}`
      : '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
  };

  const glowStyle = {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 30% 20%, ${currentColors.glow} 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, ${currentColors.glow} 0%, transparent 50%)
    `,
    opacity: isHovered ? 0.6 : 0.2,
    transition: 'opacity 0.7s ease',
    borderRadius: '24px',
  };

  const shimmerStyle = {
    position: 'absolute',
    inset: 0,
    background: `
      linear-gradient(135deg, 
        transparent 30%, 
        rgba(255, 255, 255, 0.15) 50%, 
        transparent 70%
      )
    `,
    transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
    transition: 'transform 0.8s ease',
    borderRadius: '24px',
  };

  const reflectionStyle = {
    position: 'absolute',
    inset: 0,
    background: `
      linear-gradient(135deg, 
        rgba(255, 255, 255, 0.1) 0%, 
        rgba(255, 255, 255, 0.05) 25%, 
        transparent 50%, 
        transparent 75%, 
        rgba(255, 255, 255, 0.03) 100%
      )
    `,
    opacity: isHovered ? 0.8 : 0.4,
    transition: 'opacity 0.5s ease',
    borderRadius: '24px',
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-full ${className}`}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Dynamic Glow Effect */}
      <div style={glowStyle} />
      
      {/* Enhanced Reflection Effect */}
      <div style={reflectionStyle} />
      
      {/* Shimmer Effect */}
      <div style={shimmerStyle} />
      
      {/* Floating Green Orbs */}
      {isHovered && (
        <>
          <div 
            className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-60"
            style={{
              background: currentColors.glow,
              animation: 'float 3s ease-in-out infinite',
              filter: 'blur(1px)'
            }}
          />
          <div 
            className="absolute bottom-6 left-6 w-2 h-2 rounded-full opacity-40"
            style={{
              background: currentColors.glow,
              animation: 'float 4s ease-in-out infinite 0.5s',
              filter: 'blur(1px)'
            }}
          />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-8">
        {children ? (
          children
        ) : (
          <>
            {/* Enhanced Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center mb-6 relative border border-white/10 group-hover:border-green-400/30 transition-all duration-500">
              <div 
                className="absolute inset-1 rounded-xl opacity-30"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, ${currentColors.glow} 0%, transparent 70%)
                  `,
                }}
              />
              <span className={`text-2xl relative z-10 transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                {icon}
              </span>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col">
              <h3 className={`text-2xl font-medium mb-4 font-ubuntu-medium transition-all duration-500 ${isHovered ? currentColors.text : 'text-white'}`}>
                {title}
              </h3>
              
              <p className={`text-sm font-ubuntu-light flex-1 leading-relaxed transition-all duration-500 ${isHovered ? 'text-white/95' : 'text-white/80'}`}>
                {description}
              </p>
              
              {/* Enhanced Learn More Button */}
              <div className="mt-6">
                <div className={`inline-flex items-center text-sm font-medium group font-ubuntu-medium transition-all duration-500 ${isHovered ? currentColors.text : 'text-white/70'}`}>
                  Learn More
                  <svg
                    className={`ml-2 w-4 h-4 transition-all duration-500 ${isHovered ? 'translate-x-1 scale-110' : 'translate-x-0 scale-100'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
                
                {/* Animated Underline */}
                <div 
                  className="h-px mt-1 transition-all duration-500"
                  style={{
                    width: isHovered ? '100%' : '0%',
                    background: `linear-gradient(90deg, ${currentColors.glow}, transparent)`
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* CSS-in-JS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default FeatureCard; 