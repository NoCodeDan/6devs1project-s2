export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'medium',
  className = '',
  ...props 
}) {
  const baseClasses = 'inline-flex items-center rounded-full font-medium'
  
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-1 text-sm',
    large: 'px-3 py-1.5 text-base'
  }
  
  const variantClasses = {
    default: 'bg-surface-variant text-on-surface-variant',
    primary: 'bg-primary text-on-primary',
    secondary: 'bg-secondary text-on-secondary',
    success: 'bg-tertiary text-on-tertiary',
    'success-soft': 'bg-tertiary-container text-on-tertiary-container border border-tertiary',
    warning: 'bg-secondary text-on-secondary',
    'warning-soft': 'bg-secondary-container text-on-secondary-container border border-secondary',
    danger: 'bg-error text-on-error',
    'danger-soft': 'bg-error-container text-on-error-container border border-error',
    info: 'bg-primary text-on-primary',
    'info-soft': 'bg-primary-container text-on-primary-container border border-primary'
  }
  
  const badgeClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ')
  
  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  )
} 