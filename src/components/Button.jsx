import './Button.css'
import { useEffect, useRef } from 'react'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick,
  type = 'button',
  className = '',
  ...props 
}) {
  const buttonRef = useRef(null)

  const baseClasses = 'inline-flex items-center justify-center rounded-full border font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base', 
    large: 'px-6 py-3 text-lg'
  }
  
  const variantClasses = {
    primary: 'bg-white text-black border-white hover:bg-gray-100 focus:ring-white/50',
    secondary: 'bg-secondary-container text-on-secondary-container border-secondary hover:bg-secondary hover:text-on-secondary focus:ring-secondary/50',
    outline: 'bg-transparent text-on-surface border-outline hover:bg-surface-variant hover:text-on-surface-variant focus:ring-primary/50',
    ghost: 'bg-transparent text-on-surface border-transparent hover:bg-surface-variant focus:ring-primary/50',
    danger: 'bg-error text-on-error border-error hover:bg-error/90 focus:ring-error/50',
    success: 'bg-tertiary text-on-tertiary border-tertiary hover:bg-tertiary/90 focus:ring-tertiary/50',
    glow: 'btn--glow'
  }
  
  const disabledClasses = 'opacity-50 cursor-not-allowed'

  // Handle glow button functionality
  useEffect(() => {
    if (variant === 'glow' && buttonRef.current) {
      const button = buttonRef.current
      let gradientElem = button.querySelector('.gradient')
      
      if (!gradientElem) {
        gradientElem = document.createElement('div')
        gradientElem.classList.add('gradient')
        button.appendChild(gradientElem)
      }

      const handlePointerMove = (e) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Simple CSS custom property updates (without GSAP)
        button.style.setProperty('--pointer-x', `${x}px`)
        button.style.setProperty('--pointer-y', `${y}px`)
        
        // Simple color interpolation (without Chroma.js)
        const progress = x / rect.width
        const startColor = getComputedStyle(button).getPropertyValue('--button-glow-start').trim()
        const endColor = getComputedStyle(button).getPropertyValue('--button-glow-end').trim()
        
        // Use CSS custom property for glow color
        button.style.setProperty('--button-glow', progress > 0.5 ? endColor : startColor)
      }

      button.addEventListener('pointermove', handlePointerMove)
      
      return () => {
        button.removeEventListener('pointermove', handlePointerMove)
      }
    }
  }, [variant])

  // For glow variant, use special structure
  if (variant === 'glow') {
    const glowClasses = [
      variantClasses[variant],
      disabled ? disabledClasses : '',
      className
    ].filter(Boolean).join(' ')

    return (
      <button 
        ref={buttonRef}
        className={glowClasses}
        disabled={disabled}
        onClick={onClick}
        type={type}
        {...props}
      >
        <span>{children}</span>
      </button>
    )
  }

  // Regular button structure for other variants
  const buttonClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    disabled ? disabledClasses : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button 
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
} 