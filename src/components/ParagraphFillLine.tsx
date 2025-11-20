import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/components/ParagraphFillLine.scss';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);


interface ParagraphFillLineProps {
  texts: string[];
  /** CSS color string. If omitted, will use --paragraph-color CSS variable from styles */
  startColor?: string;
  /** CSS color string for animated end color. If omitted, will use --paragraph-color CSS variable */
  endColor?: string;
  fontSize?: string;
  scrubSpeed?: number;
  /** percent (0-50) to shift the start trigger earlier. For example 1 means start at 49% instead of 50%. */
  startOffsetPercent?: number;
  stagger?: number;
  className?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}


const ParagraphFillLine = ({
  texts,
  startColor = '#989898',
  endColor = "#ECECEC",
  fontSize = 'clamp(0.5rem, 3.5rem, 1.4vw)',
  scrubSpeed = 0.1,
  // default to 0.1 so the fill starts ~0.1% earlier than center (subtle shift)
  startOffsetPercent = 0.1,
  stagger = 1,
  className = '',
  textAlign = 'left',
}: ParagraphFillLineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
      const tls: gsap.core.Timeline[] = [];

      // Animate a single CSS custom property (--fill) per paragraph using background-clip:text.
      // This avoids animating many character elements and drastically reduces paint work.
      paragraphRefs.current.forEach((ref) => {
        if (!ref) return;

        const startPercent = Math.max(0, Math.min(50, 50 - startOffsetPercent));
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref,
            start: `top ${startPercent}%`,
            end: 'bottom center',
            scrub: scrubSpeed,
          },
        });

        // animate the CSS variable that controls the gradient stop
        // cast to any because React.CSSProperties doesn't include custom properties
        tl.to(ref as any, {
          css: { '--fill': '100%' },
          ease: 'none',
        });
        tls.push(tl);
      });

      return () => {
        tls.forEach((t) => t && t.kill());
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
  }, [texts, endColor, scrubSpeed, stagger, startOffsetPercent]);

  return (
    <div
      ref={containerRef}
      className={`paragraph-fill-line-container ${className}`}
      style={{ width: '100%' }}
    >
      {texts.map((text, idx) => (
        <p
          key={idx}
          ref={el => paragraphRefs.current[idx] = el}
          className="paragraph-fill-line"
          style={({
              fontSize: fontSize,
              textAlign: textAlign,
              margin: 0,
              // expose start/end colors as CSS vars so the background-clip gradient can use them
              ['--startColor' as any]: startColor,
              ['--endColor' as any]: endColor,
            } as unknown) as React.CSSProperties}
        >
          {text}
        </p>
      ))}
    </div>
  );
};

export default React.memo(ParagraphFillLine);
