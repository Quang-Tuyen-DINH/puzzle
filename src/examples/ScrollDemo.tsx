import Scroll, { ScrollSection } from '../components/Scroll';

// Example usage of the Scroll component
const ScrollDemo = () => {
  const sections: ScrollSection[] = [
    // Header section
    {
      content: (
        <div className="scroll-header" style={{ width: '100vw' }}>
          <div>
            <h1>ScrollTrigger</h1>
            <h2>demo</h2>
          </div>
        </div>
      ),
      direction: 'leftToRight',
      height: '30vh',
    },

    // Text section
    {
      content: (
        <div className="scroll-text">
          <div className="text">
            Hi Obello!
          </div>
          <div className="text">
            Let's begin with a quick puzzle
          </div>
        </div>
      ),
      direction: 'leftToRight',
      height: '30vh',
    },
    {
      content: (
        <div className="scroll-text">
          <div className="text">
            We share the same passion
          </div>
          <div className="text">
            Solving problems and crafting creative products
          </div>
        </div>
      ),
      direction: 'leftToRight',
      height: '30vh',
    },
    {
      content: (
        <div className="scroll-text">
          <div className="text">
            At Inbolt, we give robots AI vision
          </div>
          <div className="text">
            I built the studio using WebGL, Canvas, and React
          </div>
          <div className="text">
            Accelerated performance with GPU-optimized meshes
          </div>
          <div className="text">
            Enhanced UX with a responsive design system
          </div>
          <div className="text">
            Worked with PM on user flows and QA on E2E testing
          </div>
          <div className="text">
            My work contributed to the team’s success - driving a €15M raise
          </div>
        </div>
      ),
      direction: 'leftToRight',
      height: '30vh',
    },
    {
      content: (
        <div className="scroll-text">
          <div className="text">
            Result-driven mindset
          </div>
          <div className="text">
            Team-first collaboration
          </div>
          <div className="text">
            Focus on quality
          </div>
          <div className="text">
            These are what I aim to bring at Obello
          </div>
        </div>
      ),
      direction: 'leftToRight',
      height: '30vh',
    },

    // Gallery section 1
    {
      content: (
        <div className="scroll-gallery">
          <ul>
            <li>
              Result-driven mindset
            </li>
            <li>
              Team-first collaboration
            </li>
            <li>
              Focus on quality
            </li>
          </ul>
          <div className="text">
            These are what I aim to bring at Obello
          </div>
        </div>
      ),
      direction: 'leftToRight',
      height: '30vh',
    },
    {
      content: (
        <div className="scroll-text">
          <div className="text">
            I can start working in December
          </div>
        </div>
      ),
      direction: 'leftToRight',
      height: '30vh',
    },

    // Gallery section 2
    {
      content: (
        <div className="scroll-gallery">
          <ul>
            <li>
              <div style={{ width: '1240px', height: '874px', background: '#FFA07A' }} />
            </li>
            <li>
              <div style={{ width: '1240px', height: '874px', background: '#98D8C8' }} />
            </li>
            <li>
              <div style={{ width: '1240px', height: '874px', background: '#F7DC6F' }} />
            </li>
            <li>
              <div style={{ width: '1240px', height: '874px', background: '#BB8FCE' }} />
            </li>
          </ul>
        </div>
      ),
      direction: 'leftToRight',
      height: '30vh',
    },

    // Text section
    {
      content: (
        <div className="scroll-text">
          <div className="text">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
        </div>
      ),
      direction: 'leftToRight',
      height: '30vh',
    },

    // Footer section
    {
      content: (
        <div className="scroll-footer" style={{ width: '100vw' }}>
          <p>
            Scroll Demo with Colored Blocks
          </p>
        </div>
      ),
      direction: 'leftToRight',
      height: '30vh',
    },
  ];

  return (
    <Scroll 
      sections={sections} 
      showLoader={false}
    />
  );
};

export default ScrollDemo;
