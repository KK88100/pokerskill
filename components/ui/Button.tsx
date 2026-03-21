import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs))
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  href?: string
  target?: string
  rel?: string
  as?: 'button' | 'a'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold shadow-gold hover:shadow-gold-lg ' +
    'border border-gold-400 hover:border-gold-300 transition-all duration-200',
  secondary:
    'bg-forest-800 hover:bg-forest-700 text-white font-semibold ' +
    'border border-forest-600 hover:border-forest-500 transition-all duration-200',
  outline:
    'bg-transparent hover:bg-white/10 text-gold-500 font-semibold ' +
    'border-2 border-gold-500 hover:border-gold-400 transition-all duration-200',
  ghost:
    'bg-transparent hover:bg-white/10 text-white font-semibold ' +
    'border border-transparent hover:border-white/20 transition-all duration-200',
  gold:
    'font-bold text-navy-950 border border-gold-400 ' +
    'bg-gold-gradient bg-[length:200%_auto] animate-shimmer ' +
    'hover:scale-105 shadow-gold hover:shadow-gold-lg transition-all duration-200',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-base rounded-xl gap-2',
  lg: 'px-8 py-4 text-lg rounded-xl gap-2',
  xl: 'px-10 py-5 text-xl rounded-2xl gap-3',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      href,
      target,
      rel,
      as,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      'inline-flex items-center justify-center select-none cursor-pointer',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900',
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      (disabled || loading) && 'opacity-60 cursor-not-allowed pointer-events-none',
      className
    )

    if (href || as === 'a') {
      return (
        <a
          href={href}
          target={target}
          rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={classes}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {leftIcon && <span className="shrink-0">{leftIcon}</span>}
              {children}
              {rightIcon && <span className="shrink-0">{rightIcon}</span>}
            </>
          )}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export { Button, cn }
export type { ButtonProps }
