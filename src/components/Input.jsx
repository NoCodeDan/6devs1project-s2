export default function Input({ 
  label,
  error,
  helperText,
  size = 'medium',
  variant = 'default',
  fullWidth = false,
  required = false,
  className = '',
  ...props 
}) {
  const baseClasses = 'border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg'
  }
  
  const variantClasses = {
    default: 'border-outline bg-surface focus:border-primary focus:ring-primary/50 text-on-surface',
    filled: 'border-transparent bg-surface-variant focus:bg-surface focus:border-primary focus:ring-primary/50 text-on-surface-variant',
    outlined: 'border-outline bg-transparent focus:border-primary focus:ring-primary/50 text-on-surface',
    gradient: 'border-0 bg-gradient-to-br from-[#A78BFA33] to-[#C084FC33] backdrop-blur-sm focus:from-[#A78BFA4D] focus:to-[#C084FC4D] focus:ring-2 focus:ring-[#A78BFA80] text-white placeholder:text-white/70 shadow-lg hover:shadow-xl'
  }
  
  const errorClasses = error ? 'border-error focus:border-error focus:ring-error/50' : ''
  const widthClasses = fullWidth ? 'w-full' : ''
  
  const inputClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    errorClasses,
    widthClasses,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-on-surface">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input 
        className={inputClasses}
        {...props}
      />
      {error && <span className="text-sm text-error">{error}</span>}
      {helperText && !error && <span className="text-sm text-on-surface-variant">{helperText}</span>}
    </div>
  )
}

export function Textarea({ 
  label,
  error,
  helperText,
  size = 'medium',
  variant = 'default',
  fullWidth = false,
  required = false,
  className = '',
  rows = 4,
  ...props 
}) {
  const baseClasses = 'border rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-vertical'
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg'
  }
  
  const variantClasses = {
    default: 'border-outline bg-surface focus:border-primary focus:ring-primary/50 text-on-surface',
    filled: 'border-transparent bg-surface-variant focus:bg-surface focus:border-primary focus:ring-primary/50 text-on-surface-variant',
    outlined: 'border-outline bg-transparent focus:border-primary focus:ring-primary/50 text-on-surface',
    gradient: 'border-0 bg-gradient-to-br from-[#A78BFA33] to-[#C084FC33] backdrop-blur-sm focus:from-[#A78BFA4D] focus:to-[#C084FC4D] focus:ring-2 focus:ring-[#A78BFA80] text-white placeholder:text-white/70 shadow-lg hover:shadow-xl'
  }
  
  const errorClasses = error ? 'border-error focus:border-error focus:ring-error/50' : ''
  const widthClasses = fullWidth ? 'w-full' : ''
  
  const textareaClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    errorClasses,
    widthClasses,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-on-surface">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <textarea 
        className={textareaClasses}
        rows={rows}
        {...props}
      />
      {error && <span className="text-sm text-error">{error}</span>}
      {helperText && !error && <span className="text-sm text-on-surface-variant">{helperText}</span>}
    </div>
  )
} 