import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  floatType?: 'gentle' | 'medium' | 'strong';
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'circular';
  size?: 'sm' | 'md' | 'lg';
}

const floatAnimations = {
  gentle: {
    y: [-5, 5, -5],
    x: [0, 0, 0],
    rotate: [0, 0, 0]
  },
  medium: {
    y: [-10, 10, -10],
    x: [-3, 3, -3],
    rotate: [-1, 1, -1]
  },
  strong: {
    y: [-15, 15, -15],
    x: [-5, 5, -5],
    rotate: [-2, 2, -2]
  }
};

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
};

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className,
  floatType = 'gentle',
  duration = 4,
  delay = 0,
  direction = 'up',
  size = 'md'
}) => {
  const animation = floatAnimations[floatType];
  
  let customAnimation = animation;
  
  if (direction === 'circular') {
    customAnimation = {
      y: [-10, 10, -10],
      x: [-10, 10, -10],
      rotate: [0, 180, 360]
    };
  } else if (direction === 'left' || direction === 'right') {
    const xRange = direction === 'left' ? [-10, 10, -10] : [10, -10, 10];
    customAnimation = {
      y: [0, 0, 0],
      x: xRange,
      rotate: [0, 0, 0]
    };
  }

  return (
    <motion.div
      className={cn('relative', sizeClasses[size], className)}
      animate={customAnimation}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};
