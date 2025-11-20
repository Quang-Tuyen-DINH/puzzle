import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import '../styles/components/ParagraphEaseIn.scss';
import React from 'react';

interface ParagraphEaseInProps {
  texts: string[];
  /** CSS color string. If omitted, will use --paragraph-color CSS variable from styles */
  textColor?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  disableAutoPlay?: boolean;
  fontSize?: string;
}

const ParagraphEaseIn = ({
  texts,
  textColor,
  textAlign = 'left',
  disableAutoPlay = false,
  fontSize = 'clamp(0.5rem, 3.5rem, 1.4vw)',
}: ParagraphEaseInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const splitsRef = useRef<SplitType[]>([]);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    // cleanup previous
    tweensRef.current.forEach((t) => t && t.kill());
    splitsRef.current.forEach((s) => s && s.revert());
    tweensRef.current = [];
    splitsRef.current = [];

    paragraphRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const split = new SplitType(ref, { types: 'chars' });
      splitsRef.current[i] = split;

      if (!disableAutoPlay) {
        const tween = gsap.fromTo(
          split.chars,
          { x: 150, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power4',
            stagger: 0.04,
          }
        );
        tweensRef.current[i] = tween;
      }
    });

    // on unmount cleanup
    return () => {
      tweensRef.current.forEach((t) => t && t.kill());
      splitsRef.current.forEach((s) => s && s.revert());
      tweensRef.current = [];
      splitsRef.current = [];
    };
  }, [texts, disableAutoPlay]);

  return (
    <div className="paragraph-easein__container" ref={containerRef}>
      {texts.map((text, idx) => (
        <div
          key={idx}
          ref={(el) => (paragraphRefs.current[idx] = el)}
          className="paragraph-easein__text"
          style={{ color: textColor ?? '#ECECEC', textAlign, margin: 0, fontSize }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default React.memo(ParagraphEaseIn);
