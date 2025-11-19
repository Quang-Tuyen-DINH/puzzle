import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/components/Scroll.scss';

gsap.registerPlugin(ScrollTrigger);

export type ScrollDirection = 'leftToRight' | 'rightToLeft';

export interface ScrollSection {
  content: ReactNode;
  direction: ScrollDirection;
  height?: string; // e.g., '100vh', '50vh', '800px'
}

interface ScrollProps {
  sections: ScrollSection[];
  showLoader?: boolean;
  loaderContent?: ReactNode;
}

const Scroll = ({ sections, showLoader = false, loaderContent }: ScrollProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const showDemo = () => {
      if (showLoader && loaderRef.current) {
        gsap.to(loaderRef.current, { autoAlpha: 0, duration: 0.5 });
      }

      // Animate each section
      const sectionElements = gsap.utils.toArray('.scroll-section');
      
      sectionElements.forEach((section: any) => {
        const wrapper = section.querySelector('.scroll-section__wrapper');
        if (!wrapper) return;

        const direction = section.dataset.direction;
        const isLeftToRight = direction === 'leftToRight';

        // Calculate scroll distance
        const scrollWidth = wrapper.scrollWidth;
        const sectionWidth = section.offsetWidth;
        const scrollDistance = scrollWidth - sectionWidth;

        // Set initial and end positions based on direction
        const [xStart, xEnd] = isLeftToRight 
          ? ['100%', scrollDistance * -1] 
          : [scrollWidth * -1, 0];

        gsap.fromTo(
          wrapper,
          { x: xStart },
          {
            x: xEnd,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${scrollWidth / 3}`,
              scrub: 0.5,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(showDemo, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [sections, showLoader]);

  return (
    <>
      {showLoader && (
        <div ref={loaderRef} className="scroll-loader">
          {loaderContent || (
            <div>
              <h1>Loading</h1>
              <h2 className="scroll-loader__text">0%</h2>
            </div>
          )}
        </div>
      )}

      <div ref={wrapperRef} className="scroll-wrapper">
        {sections.map((section, index) => (
          <section
            key={index}
            className="scroll-section"
            data-direction={section.direction}
            style={{ height: section.height }}
          >
            <div className="scroll-section__wrapper">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Scroll;
