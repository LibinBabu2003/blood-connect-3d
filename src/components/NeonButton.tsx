import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'hero' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ 
    children, 
    className, 
    variant = 'hero', 
    size = 'md', 
    onClick, 
    disabled = false 
  }, ref) => {
    const baseClasses = 'relative overflow-hidden font-semibold transition-all duration-300 rounded-lg';
    
    const variants = {
      hero: 'btn-hero',
      secondary: 'glass-card text-primary border border-primary/50 hover:bg-primary/10',
      outline: 'glass border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

NeonButton.displayName = 'NeonButton';

export default NeonButton;