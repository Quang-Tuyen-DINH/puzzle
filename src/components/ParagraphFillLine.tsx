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
    const splits: SplitType[] = [];
    const tls: gsap.core.Timeline[] = [];

    paragraphRefs.current.forEach((ref) => {
      if (!ref) return;
      const split = new SplitType(ref, {
        types: 'words,chars',
      });
      splits.push(split);

      // compute a start point slightly earlier than center. By default startOffsetPercent=1
      // which yields start: 'top 49%'. Keep the end as bottom center.
      const startPercent = Math.max(0, Math.min(75, 75 - startOffsetPercent));
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref,
          start: `top ${startPercent}%`,
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
