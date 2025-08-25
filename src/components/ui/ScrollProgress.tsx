import React from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { cn } from '../../lib/utils';

export interface ScrollProgressProps {
  className?: string;
  height?: number;
  color?: string;
  showPercentage?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  thickness?: number;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className,
  height = 4,
  color = 'bg-blue-500',
  showPercentage = false,
  position = 'top',
  thickness = 4
}) => {
  const progress = useScrollProgress();

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'fixed top-0 left-0 right-0 z-50';
      case 'bottom':
        return 'fixed bottom-0 left-0 right-0 z-50';
      case 'left':
        return 'fixed left-0 top-0 bottom-0 z-50';
      case 'right':
        return 'fixed right-0 top-0 bottom-0 z-50';
      default:
        return 'fixed top-0 left-0 right-0 z-50';
    }
  };

  const getProgressBarStyle = () => {
    if (position === 'left' || position === 'right') {
      return {
        height: '100%',
        width: `${thickness}px`,
      };
    }
    return {
      height: `${height}px`,
      width: '100%',
    };
  };

  const getProgressStyle = () => {
    if (position === 'left' || position === 'right') {
      return {
        height: `${progress}%`,
        width: '100%',
      };
    }
    return {
      height: '100%',
      width: `${progress}%`,
    };
  };

  return (
    <div className={cn(getPositionClasses(), className)}>
      {/* Barra de fundo */}
      <div 
        className="bg-gray-200/20 backdrop-blur-sm"
        style={getProgressBarStyle()}
      />
      
      {/* Barra de progresso */}
      <motion.div
        className={cn('transition-all duration-300 ease-out', color)}
        style={getProgressStyle() as React.CSSProperties}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Porcentagem opcional */}
      {showPercentage && (
        <motion.div
          className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  );
};