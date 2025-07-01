import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Card({ 
  children, 
  variant = 'gradient', 
  padding = 'medium',
  shadow = 'medium',
  className = '',
  title = "AI-Powered Inbox Sorting",
  description = "OpenMail revolutionizes email management with AI-driven sorting, boosting productivity and accessibility",
  showContent = true,
  minimal = false,
  showIcon = true,
  ...props 
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      // Calculate mouse position relative to card center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      setMousePosition({ x, y });

      // Calculate rotation (limited range for subtle effect)
      const rotateX = -(y / rect.height) * 5; // Max 5 degrees rotation
      const rotateY = (x / rect.width) * 5; // Max 5 degrees rotation

      setRotation({ x: rotateX, y: rotateY });
    }
  };

  // Reset rotation when not hovering
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  // If variant is not gradient, use the original simple card design
  if (variant !== 'gradient') {
    const baseClasses = 'rounded-xl border transition-all duration-200 box-border backdrop-blur-md'
    
    const paddingClasses = {
      none: 'p-0',
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8'
    }
    
    const shadowClasses = {
      none: 'shadow-none',
      small: 'shadow-sm',
      medium: 'shadow-md',
      large: 'shadow-lg'
    }
    
    const variantClasses = {
      default: 'border-white/10 bg-white/5 dark:border-white/10 dark:bg-white/5',
      elevated: 'border-white/15 bg-white/8 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 dark:border-white/15 dark:bg-white/8 dark:hover:bg-white/10',
      outlined: 'bg-transparent border-white/20 dark:border-white/20',
      filled: 'bg-white/10 border-transparent dark:bg-white/10'
    }
    
    const cardClasses = [
      baseClasses,
      paddingClasses[padding],
      shadowClasses[shadow],
      variantClasses[variant],
      className
    ].filter(Boolean).join(' ')
    
    return (
      <div className={cardClasses} {...props}>
        {children}
      </div>
    )
  }

  // Gradient card design
  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-[32px] overflow-hidden ${className}`}
      style={{
        width: "360px",
        height: minimal ? "320px" : "450px",
        transformStyle: "preserve-3d",
        backgroundColor: "#0e131f",
        boxShadow: minimal 
          ? "0 4px 20px 2px rgba(78, 99, 255, 0.15), 0 0 5px 0 rgba(0, 0, 0, 0.3)"
          : "0 -10px 100px 10px rgba(78, 99, 255, 0.25), 0 0 10px 0 rgba(0, 0, 0, 0.5)",
      }}
      initial={{ y: 0 }}
      animate={{
        y: minimal ? 0 : (isHovered ? -5 : 0),
        rotateX: minimal ? 0 : rotation.x,
        rotateY: minimal ? 0 : rotation.y,
        perspective: 1000,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={minimal ? undefined : handleMouseMove}
      {...props}
    >
      {/* Subtle glass reflection overlay */}
      <motion.div
        className="absolute inset-0 z-35 pointer-events-none"
        style={{
          background: minimal 
            ? "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.02) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: minimal ? "blur(1px)" : "blur(2px)",
        }}
        animate={{
          opacity: minimal ? 0.3 : (isHovered ? 0.7 : 0.5),
          rotateX: minimal ? 0 : (-rotation.x * 0.2),
          rotateY: minimal ? 0 : (-rotation.y * 0.2),
          z: 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Dark background with black gradient like in the image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #000000 70%)",
        }}
        animate={{
          z: -1
        }}
      />

      {/* Noise texture overlay */}
      <motion.div
        className="absolute inset-0 opacity-30 mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          z: -0.5
        }}
      />

      {/* Subtle finger smudge texture for realism */}
      <motion.div
        className="absolute inset-0 opacity-10 mix-blend-soft-light z-11 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='smudge'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='3' seed='5' stitchTiles='stitch'/%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23smudge)'/%3E%3C/svg%3E")`,
          backdropFilter: "blur(1px)",
        }}
        animate={{
          z: -0.25
        }}
      />

      {/* Purple/blue glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20"
        style={{
          background: minimal 
            ? `
              radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.3) -10%, rgba(79, 70, 229, 0) 70%),
              radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.3) -10%, rgba(79, 70, 229, 0) 70%)
            `
            : `
              radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.7) -10%, rgba(79, 70, 229, 0) 70%),
              radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.7) -10%, rgba(79, 70, 229, 0) 70%)
            `,
          filter: minimal ? "blur(25px)" : "blur(40px)",
        }}
        animate={{
          opacity: minimal ? 0.6 : (isHovered ? 0.9 : 0.8),
          y: minimal ? 0 : (isHovered ? rotation.x * 0.5 : 0),
          z: 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Central purple glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-21"
        style={{
          background: minimal
            ? `radial-gradient(circle at bottom center, rgba(161, 58, 229, 0.3) -20%, rgba(79, 70, 229, 0) 60%)`
            : `radial-gradient(circle at bottom center, rgba(161, 58, 229, 0.7) -20%, rgba(79, 70, 229, 0) 60%)`,
          filter: minimal ? "blur(30px)" : "blur(45px)",
        }}
        animate={{
          opacity: minimal ? 0.5 : (isHovered ? 0.85 : 0.75),
          y: minimal ? "5%" : (isHovered ? `calc(10% + ${rotation.x * 0.3}px)` : "10%"),
          z: 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Enhanced bottom border glow for premium look */}
      {!minimal && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-25"
          style={{
            background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.05) 100%)",
          }}
          animate={{
            boxShadow: isHovered
              ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
              : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
            opacity: isHovered ? 1 : 0.9,
            z: 0.5
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        />
      )}
      {!minimal && (
        <>
          <motion.div
            className="absolute bottom-0 left-0 h-1/4 w-[1px] z-25 rounded-full"
            style={{
              background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 80%)",
            }}
            animate={{
              boxShadow: isHovered
                ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
                : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
              opacity: isHovered ? 1 : 0.9,
              z: 0.5
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-1/4 z-25"
            style={{
              background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.55) 15%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 85%)",
            }}
            animate={{
              boxShadow: isHovered
                ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
                : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
              opacity: isHovered ? 1 : 0.9,
              z: 0.5
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-1/4 w-[1px] z-25 rounded-full"
            style={{
              background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 80%)",
            }}
            animate={{
              boxShadow: isHovered
                ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
                : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
              opacity: isHovered ? 1 : 0.9,
              z: 0.5
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-1/3 z-25"
            style={{
              background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.55) 15%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 85%)",
            }}
            animate={{
              boxShadow: isHovered
                ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
                : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
              opacity: isHovered ? 1 : 0.9,
              z: 0.5
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
          />
        </>
      )}

      {/* Card content */}
      {showContent && (
        <motion.div
          className="relative flex flex-col h-full p-8 z-40"
          animate={{
            z: 2
          }}
        >
          {/* Icon circle with shadow */}
          {showIcon && !minimal && (
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
              style={{
                background: "linear-gradient(225deg, #171c2c 0%, #121624 100%)",
                position: "relative",
                overflow: "hidden"
              }}
              initial={{ filter: "blur(3px)", opacity: 0.7 }}
              animate={{
                filter: "blur(0px)",
                opacity: 1,
                boxShadow: isHovered
                  ? "0 8px 16px -2px rgba(0, 0, 0, 0.3), 0 4px 8px -1px rgba(0, 0, 0, 0.2), inset 2px 2px 5px rgba(255, 255, 255, 0.15), inset -2px -2px 5px rgba(0, 0, 0, 0.7)"
                  : "0 6px 12px -2px rgba(0, 0, 0, 0.25), 0 3px 6px -1px rgba(0, 0, 0, 0.15), inset 1px 1px 3px rgba(255, 255, 255, 0.12), inset -2px -2px 4px rgba(0, 0, 0, 0.5)",
                z: isHovered ? 10 : 5,
                y: isHovered ? -2 : 0,
                rotateX: isHovered ? -rotation.x * 0.5 : 0,
                rotateY: isHovered ? -rotation.y * 0.5 : 0
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut"
              }}
            >
              {/* Top-left highlight for realistic lighting */}
              <div
                className="absolute top-0 left-0 w-2/3 h-2/3 opacity-40"
                style={{
                  background: "radial-gradient(circle at top left, rgba(255, 255, 255, 0.5), transparent 80%)",
                  pointerEvents: "none",
                  filter: "blur(10px)"
                }}
              />

              {/* Bottom shadow for depth */}
              <div
                className="absolute bottom-0 left-0 w-full h-1/2 opacity-50"
                style={{
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent)",
                  pointerEvents: "none",
                  backdropFilter: "blur(3px)"
                }}
              />

              {/* Star icon */}
              <div className="flex items-center justify-center w-full h-full relative z-10">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 0L9.4 5.4L14.8 5.4L10.6 8.8L12 14.2L8 10.8L4 14.2L5.4 8.8L1.2 5.4L6.6 5.4L8 0Z"
                    fill="white"
                  />
                </svg>
              </div>
            </motion.div>
          )}

          {/* Content positioning */}
          <motion.div
            className={minimal ? "mt-auto mb-auto" : "mb-auto"}
            animate={{
              z: minimal ? 2 : (isHovered ? 5 : 2),
              rotateX: minimal ? 0 : (isHovered ? -rotation.x * 0.3 : 0),
              rotateY: minimal ? 0 : (isHovered ? -rotation.y * 0.3 : 0)
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            <motion.h3
              className={minimal ? "text-xl font-normal text-white mb-2" : "text-2xl font-medium text-white mb-3"}
              style={{
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
              initial={{ filter: minimal ? "blur(0px)" : "blur(3px)", opacity: minimal ? 1 : 0.7 }}
              animate={{
                textShadow: minimal ? "none" : (isHovered ? "0 2px 4px rgba(0,0,0,0.2)" : "none"),
                filter: "blur(0px)",
                opacity: 1,
                transition: { duration: minimal ? 0.3 : 1.2, delay: minimal ? 0 : 0.2 }
              }}
            >
              {title}
            </motion.h3>

            <motion.p
              className={minimal ? "text-sm mb-4 text-gray-400" : "text-sm mb-6 text-gray-300"}
              style={{
                lineHeight: 1.5,
                fontWeight: minimal ? 300 : 350,
              }}
              initial={{ filter: minimal ? "blur(0px)" : "blur(3px)", opacity: minimal ? 0.9 : 0.7 }}
              animate={{
                textShadow: minimal ? "none" : (isHovered ? "0 1px 2px rgba(0,0,0,0.1)" : "none"),
                filter: "blur(0px)",
                opacity: minimal ? 0.9 : 0.85,
                transition: { duration: minimal ? 0.3 : 1.2, delay: minimal ? 0.1 : 0.4 }
              }}
            >
              {description}
            </motion.p>

            {/* Learn More with arrow */}
            <motion.a
              href="#"
              className={minimal ? "inline-flex items-center text-gray-300 text-sm font-normal group" : "inline-flex items-center text-white text-sm font-medium group"}
              initial={{ filter: minimal ? "blur(0px)" : "blur(3px)", opacity: minimal ? 0.8 : 0.7 }}
              animate={{
                filter: "blur(0px)",
                opacity: minimal ? 0.8 : 0.9,
                transition: { duration: minimal ? 0.3 : 1.2, delay: minimal ? 0.2 : 0.6 }
              }}
              whileHover={{
                filter: minimal ? "none" : "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
                opacity: minimal ? 1 : undefined
              }}
            >
              Learn More
              <motion.svg
                className="ml-1 w-4 h-4"
                width="8"
                height="8"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                  x: minimal ? 0 : (isHovered ? 4 : 0)
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                <path
                  d="M1 8H15M15 8L8 1M15 8L8 15"
                  stroke={minimal ? "#d1d5db" : "white"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>
      )}

      {/* Custom children content */}
      {!showContent && children && (
        <motion.div
          className="relative flex flex-col h-full p-8 z-40"
          animate={{
            z: 2
          }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  const headerClasses = `mb-4 pb-4 border-b border-white/10 last:mb-0 last:pb-0 last:border-b-0 dark:border-white/10 ${className}`.trim()
  
  return (
    <div className={headerClasses} {...props}>
      {children}
    </div>
  )
}

export function CardBody({ children, className = '', ...props }) {
  const bodyClasses = `mb-4 last:mb-0 ${className}`.trim()
  
  return (
    <div className={bodyClasses} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '', ...props }) {
  const footerClasses = `mt-4 pt-4 border-t border-white/10 first:mt-0 first:pt-0 first:border-t-0 dark:border-white/10 ${className}`.trim()
  
  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  )
}

// Export the GradientCard as a named export for direct usage
export const GradientCard = (props) => <Card variant="gradient" {...props} />

// Export the MinimalGradientCard as a named export for direct usage  
export const MinimalGradientCard = (props) => <Card variant="gradient" minimal={true} showIcon={false} {...props} /> 