import { useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/components/ButtonExplode.scss';

interface ButtonExplodeProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ButtonExplode = ({
  text,
  onClick,
  disabled = false,
  className = '',
}: ButtonExplodeProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const numberOfShapes = 10;

  const shapes = [
    'M254 286.11a50 50 0 0050-50H204a50 50 0 0050 50z',
    'M255.5 271a20 20 0 10-20-20 20 20 0 0020 20zm0 30a50 50 0 10-50-50 50 50 0 0050 50z',
    'M248.8 202.17a8 8 0 019.4 0l40.6 29.5a8 8 0 012.9 8.94l-15.5 47.73a8 8 0 01-7.61 5.52h-50.18a8 8 0 01-7.61-5.52l-15.5-47.73a8 8 0 012.9-8.94z',
    'M307.5 250a50 50 0 11-50-50 50 50 0 0150 50',
    'M248.08 204.07a11.91 11.91 0 0016.84 0l30.59 30.59a11.91 11.91 0 11-16.85 16.85l-10.25-10.25v47.41a11.91 11.91 0 11-23.82 0v-47.41l-10.25 10.25a11.91 11.91 0 01-16.85-16.85z',
    'M234 237a22.5 22.5 0 0045 0h27.5a50 50 0 01-100 0z',
    'M258 202.5a12 12 0 00-12 12v26h-26a12 12 0 000 24h26v26a12 12 0 0024 0v-26h26a12 12 0 000-24h-26v-26a12 12 0 00-12-12z',
  ];

  const colors = ['#0ae448', '#00bae2', '#9d95ff', '#abff84'];

  const handleMouseEnter = () => {
    if (disabled || !svgRef.current) return;

    const animatedShapes: SVGPathElement[] = [];

    // Create animated shapes
    for (let i = 0; i < numberOfShapes; i++) {
      const newElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      newElement.setAttribute('d', gsap.utils.random(shapes));
      newElement.style.fill = gsap.utils.random(colors);
      svgRef.current.appendChild(newElement);
      animatedShapes.push(newElement);
    }

    // Function to remove shapes after animation
    const killShapes = () => {
      animatedShapes.forEach((shape) => {
        if (svgRef.current && svgRef.current.contains(shape)) {
          svgRef.current.removeChild(shape);
        }
      });
    };

    // Set initial properties
    gsap.set(animatedShapes, {
      transformOrigin: 'center',
      scale: gsap.utils.random(0.4, 0.8, 0.1, true),
    });

    // Animate shapes
    gsap.to(animatedShapes, {
      onComplete: killShapes,
      keyframes: [
        {
          rotate: gsap.utils.random(-180, 180, 1, true),
          x: gsap.utils.random([-150, -100, -200, 200, 100, 150], true),
          yPercent: gsap.utils.random(-500, 100, 1, true),
          ease: 'expo.out',
          duration: 4,
          stagger: {
            amount: 0.1,
          },
        },
        { opacity: 0, duration: 0.2, delay: -3 },
      ],
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`btn-explode ${className} ${disabled ? 'btn-explode--disabled' : ''}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
    >
      <span className="btn-explode__text">{text}</span>
      <svg
        ref={svgRef}
        className="btn-explode__svg"
        role="presentation"
        viewBox="0 0 500 500"
      />
    </button>
  );
};

export default ButtonExplode;
