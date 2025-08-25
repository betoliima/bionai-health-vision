import React from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '../../hooks/useParallax';
import { cn } from '../../lib/utils';

export interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundClassName?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: number;
  disabled?: boolean;
  backgroundElement?: React.ReactNode;
  overlay?: boolean;
  overlayClassName?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  backgroundClassName,
  speed = 0.5,
  direction = 'up',
  easing = 0.1,
  disabled = false,
  backgroundElement,
  overlay = false,
  overlayClassName
}) => {
  const { ref, getTransformStyle } = useParallax({
    speed,
    direction,
    easing,
    disabled
  });

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Elemento de fundo com parallax */}
      {backgroundElement && (
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn('absolute inset-0', backgroundClassName)}
          style={getTransformStyle() as React.CSSProperties}
        >
          {backgroundElement}
        </motion.div>
      )}
      
      {/* Overlay opcional */}
      {overlay && (
        <div className={cn(
          'absolute inset-0 bg-black/20 z-10',
          overlayClassName
        )} />
      )}
      
      {/* Conteúdo principal */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};