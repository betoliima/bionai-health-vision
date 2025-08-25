import { useEffect, useRef, useState } from 'react';

export interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: number;
  disabled?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const {
    speed = 0.5,
    direction = 'up',
    easing = 0.1,
    disabled = false
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const element = ref.current;
    if (!element) return;

    let ticking = false;
    let currentOffset = 0;
    let targetOffset = 0;

    const updateParallax = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Verifica se o elemento está visível
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(isInViewport);

      if (isInViewport) {
        // Calcula a posição relativa do elemento na tela
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        
        // Aplica easing para movimento mais suave
        targetOffset = rate;
        currentOffset += (targetOffset - currentOffset) * easing;
        
        setOffset(currentOffset);
      }
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax(); // Executa uma vez para posicionamento inicial

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [speed, direction, easing, disabled]);

  const getTransformStyle = () => {
    if (disabled || !isVisible) return {};

    switch (direction) {
      case 'up':
        return { transform: `translateY(${offset}px)` };
      case 'down':
        return { transform: `translateY(${-offset}px)` };
      case 'left':
        return { transform: `translateX(${offset}px)` };
      case 'right':
        return { transform: `translateX(${-offset}px)` };
      default:
        return { transform: `translateY(${offset}px)` };
    }
  };

  return {
    ref,
    offset,
    isVisible,
    getTransformStyle
  };
};
