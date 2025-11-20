import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../styles/components/Button.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const Button = ({ label, onClick, href, className = '' }: ButtonProps) => {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const flairRef = useRef<HTMLSpanElement>(null);
  const xSetRef = useRef<Function | null>(null);
  const ySetRef = useRef<Function | null>(null);

  useEffect(() => {
    if (!buttonRef.current || !flairRef.current) return;

    // Initialize GSAP quickSetters
    xSetRef.current = gsap.quickSetter(flairRef.current, 'xPercent');
    ySetRef.current = gsap.quickSetter(flairRef.current, 'yPercent');

    const button = buttonRef.current;
    const flair = flairRef.current;

    const getXY = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();

      const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      return {
        x: xTransformer(e.clientX - left),
        y: yTransformer(e.clientY - top),
      };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const { x, y } = getXY(e);

      if (xSetRef.current && ySetRef.current) {
        xSetRef.current(x);
        ySetRef.current(y);
      }

      gsap.to(flair, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const { x, y } = getXY(e);

      gsap.killTweensOf(flair);

      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getXY(e);

      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: 'power2',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter as EventListener);
    button.addEventListener('mouseleave', handleMouseLeave as EventListener);
    button.addEventListener('mousemove', handleMouseMove as EventListener);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter as EventListener);
      button.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      button.removeEventListener('mousemove', handleMouseMove as EventListener);
      gsap.killTweensOf(flair);
    };
  }, []);

  const commonProps = {
    ref: buttonRef as any,
    className: `button button--stroke ${className}`,
  };

  if (href) {
    return (
      <a {...commonProps} href={href}>
        <span ref={flairRef} className="button__flair"></span>
        <span className="button__label">{label}</span>
      </a>
    );
  }

  return (
    <button {...commonProps} onClick={onClick} type="button">
      <span ref={flairRef} className="button__flair"></span>
      <span className="button__label">{label}</span>
    </button>
  );
};

export default Button;
