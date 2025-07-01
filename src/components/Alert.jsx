export default function Alert({ 
  children, 
  variant = 'info', 
  title,
  closable = false,
  onClose,
  className = '',
  ...props 
}) {
  const baseClasses = 'rounded-xl border p-6 mb-4 flex items-start justify-between transition-all duration-300'
  
  const variantClasses = {
    default: 'bg-surface-container border-outline-variant text-on-surface-variant',
    info: 'bg-surface-container-low border-outline text-on-surface',
    success: 'bg-surface-container-low border-outline text-on-surface',
    warning: 'bg-surface-container-low border-outline text-on-surface',
    error: 'bg-surface-container-low border-outline text-on-surface'
  }
  
  const alertClasses = [
    baseClasses,
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ')
  
  return (
    <div className={alertClasses} {...props}>
      <div className="flex-1">
        {title && <div className="font-semibold mb-2 text-base">{title}</div>}
        <div className="text-sm leading-relaxed opacity-80">{children}</div>
      </div>
      {closable && (
        <button 
          className="ml-4 text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-lg hover:bg-surface-container-high/20" 
          onClick={onClose} 
          type="button"
        >
          <span className="text-lg leading-none">×</span>
        </button>
      )}
    </div>
  )
} 