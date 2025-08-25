import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'stagger';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  staggerChildren?: boolean;
}

const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '0px 0px -10% 0px',
  staggerChildren = false
}) => {
  const { ref, isVisible } = useScrollReveal({
    threshold,
    triggerOnce,
    rootMargin,
    delay
  });

  const selectedAnimation = animations[animation];
  
  // Aplica delay personalizado
  const customAnimation = {
    ...selectedAnimation,
    visible: {
      ...selectedAnimation.visible,
      transition: {
        ...(selectedAnimation.visible as any).transition,
        delay: delay,
        duration: duration
      }
    }
  };

  if (staggerChildren) {
    return (
      <motion.div
        ref={ref}
        className={cn('w-full', className)}
        variants={customAnimation}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={staggerItemVariants}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn('w-full', className)}
      variants={customAnimation}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};
