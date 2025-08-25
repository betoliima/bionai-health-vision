import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export interface ScrollRevealOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
  duration?: number;
  ease?: string;
}

export interface ScrollRevealReturn {
  ref: (node?: Element | null) => void;
  inView: boolean;
  hasAnimated: boolean;
  isVisible: boolean;
}

export const useScrollReveal = (options: ScrollRevealOptions = {}): ScrollRevealReturn => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -10% 0px',
    delay = 0,
    duration = 0.6,
    ease = 'easeOut'
  } = options;

  const [hasAnimated, setHasAnimated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      // Delay para criar um efeito mais suave
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        if (triggerOnce) {
          setHasAnimated(true);
        }
      }, delay * 1000);
    } else if (!inView && !triggerOnce) {
      setIsVisible(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inView, hasAnimated, triggerOnce, delay]);

  return {
    ref,
    inView,
    hasAnimated,
    isVisible
  };
}; 
