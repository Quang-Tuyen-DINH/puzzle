import React, { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import "../styles/components/Paragraph.scss"

type ParagraphProps = {
  text: string
  color?: string
}

function Paragraph({ text, color }: ParagraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const content = useMemo(() => {
    const words = text.split(/\s+/);
    let key = 0;

    return words.map((word, wi) => (
      <React.Fragment key={`w-${word}-${wi}`}>
        <span className="word">
          {Array.from(word).map((ch) => (
            <span className="char-mask" key={`${word}-c-${ch}-${key++}`} aria-hidden>
              <span className="char">{ch}</span>
            </span>
          ))}
        </span>
        {wi < words.length - 1 && <span className="space" aria-hidden> </span>}
      </React.Fragment>
    ))
  }, [text]);

  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    const titleEl = el.querySelector('.split');
    const chars = Array.from(el.querySelectorAll('.char')) as HTMLElement[];
    gsap.set(titleEl, { opacity: 1 });
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return

    const tween = gsap.from(chars, {
      duration: 0.8,
      yPercent: () => (Math.random() < 0.5 ? -150 : 150),
      xPercent: () => (Math.random() < 0.5 ? -150 : 150),
      stagger: { from: 'random', amount: 0.6 },
      ease: 'power3.out'
    });

    return () => {
      tween?.kill();
    }
  }, [text])

  const style = color ? { ['--paragraph-color' as any]: color } : undefined;

  return (
    <div className="paragraph-container" ref={containerRef}>
      <div className="container">
        <h1 className="split" style={style}>{content}</h1>
      </div>
    </div>
  )
}

export default React.memo(Paragraph)