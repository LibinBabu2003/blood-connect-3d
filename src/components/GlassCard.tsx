import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover3D?: boolean;
  glowEffect?: boolean;
  onClick?: () => void;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hover3D = false, glowEffect = false, onClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'glass-card p-6 transition-all duration-300',
          hover3D && 'hover:scale-105 hover:rotate-1 hover:-translate-y-2',
          glowEffect && 'neon-glow pulse-glow',
          onClick && 'cursor-pointer',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;