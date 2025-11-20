import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/components/ParagraphFillLine.scss';

gsap.registerPlugin(ScrollTrigger);


interface ParagraphFillLineProps {
  texts: string[];
  /** CSS color string. If omitted, will use --paragraph-color CSS variable from styles */
  startColor?: string;
  /** CSS color string for animated end color. If omitted, will use --paragraph-color CSS variable */
  endColor?: string;
  fontSize?: string;
  scrubSpeed?: number;
  stagger?: number;
  className?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}


const ParagraphFillLine = ({
  texts,
  startColor = '#989898',
  endColor = "#ECECEC",
  fontSize = 'clamp(1rem, 6rem, 2.5vw)',
  scrubSpeed = 0.1,
  stagger = 1,
  className = '',
  textAlign = 'left',
}: ParagraphFillLineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const splits: SplitType[] = [];
    const tls: gsap.core.Timeline[] = [];

    paragraphRefs.current.forEach((ref) => {
      if (!ref) return;
      const split = new SplitType(ref, {
        types: 'lines,words,chars',
      });
      splits.push(split);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref,
          start: 'top center',
          end: 'bottom center',
          scrub: scrubSpeed,
        },
      });
      tl.to(split.chars, {
        color: endColor ?? 'var(--paragraph-color)',
        stagger: stagger,
      });
      tls.push(tl);
    });

    return () => {
      tls.forEach((t) => t && t.kill());
      splits.forEach((s) => s && s.revert());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [texts, endColor, scrubSpeed, stagger]);

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
          style={{
            color: startColor ?? 'var(--paragraph-color)',
            fontSize: fontSize,
            textAlign: textAlign,
            margin: 0,
          }}
        >
          {text}
        </p>
      ))}
    </div>
  );
};

export default ParagraphFillLine;
