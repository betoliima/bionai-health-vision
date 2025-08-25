import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface GradientSectionProps {
  children: React.ReactNode;
  className?: string;
  gradientType?: 'radial' | 'linear' | 'conic';
  colors?: string[];
  animate?: boolean;
  speed?: number;
  overlay?: boolean;
  overlayOpacity?: number;
}

const defaultGradients = {
  radial: ['from-blue-500/20', 'via-purple-500/20', 'to-pink-500/20'],
  linear: ['from-blue-600/30', 'via-purple-600/30', 'to-pink-600/30'],
  conic: ['from-blue-500/20', 'via-purple-500/20', 'via-pink-500/20', 'to-blue-500/20']
};

export const GradientSection: React.FC<GradientSectionProps> = ({
  children,
  className,
  gradientType = 'radial',
  colors,
  animate = true,
  speed = 20,
  overlay = false,
  overlayOpacity = 0.1
}) => {
  const selectedColors = colors || defaultGradients[gradientType];
  
  const getGradientClasses = () => {
    switch (gradientType) {
      case 'radial':
        return `bg-gradient-to-br ${selectedColors.join(' ')}`;
      case 'linear':
        return `bg-gradient-to-r ${selectedColors.join(' ')}`;
      case 'conic':
        return `bg-gradient-to-r ${selectedColors.join(' ')}`;
      default:
        return `bg-gradient-to-br ${selectedColors.join(' ')}`;
    }
  };

  const gradientVariants = {
    animate: {
      backgroundPosition: animate ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
      transition: {
        duration: speed,
        repeat: animate ? Infinity : 0,
        ease: "linear"
      }
    }
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Gradiente de fundo animado */}
      <motion.div
        className={cn(
          'absolute inset-0',
          getGradientClasses()
        )}
        variants={gradientVariants}
        animate="animate"
        style={{
          backgroundSize: gradientType === 'conic' ? '400% 400%' : '200% 200%'
        }}
      />
      
      {/* Overlay opcional */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black/20 z-10"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Conteúdo */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};
