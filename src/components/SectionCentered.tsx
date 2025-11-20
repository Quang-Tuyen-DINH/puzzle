import React, { useEffect, useRef, useState } from 'react';

interface SectionCenteredProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
  rootMargin?: string;
  threshold?: number | number[];
  activateOnce?: boolean;
}

const SectionCentered = ({
  children,
  className,
  minHeight = '100vh',
  rootMargin = '-40% 0% -40% 0%',
  threshold = 0,
  activateOnce = true,
}: SectionCenteredProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            if (activateOnce && obs) {
              obs.unobserve(entry.target);
            }
          } else if (!activateOnce) {
            setActive(false);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    obs.observe(el);

    return () => {
      obs.disconnect();
    };
  }, [rootMargin, threshold, activateOnce]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ minHeight, display: 'flex', alignItems: 'center' }}
      aria-hidden={!active}
    >
      {active ? children : null}
    </div>
  );
};

export default SectionCentered;
