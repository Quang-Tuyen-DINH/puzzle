import "../styles/pages/SlideShow.scss";
import Puzzle from '../components/Puzzle';
import Paragraph from '../components/Paragraph';
import ParagraphFillLine from '../components/ParagraphFillLine';
import ParagraphEaseIn from '../components/ParagraphEaseIn';
import LazyLoad from 'react-lazy-load';

function SlideShow() {
  const sections = [
    {
      key: "slide-show-header",
      content: (
        <div className="slide-show-header">
          <Paragraph text="Before we begin..." />
        </div>
      ),
    },
    {
      key: "slide-show-puzzle",
      content: (
        <div className="scroll-text">
          <Puzzle />
        </div>
      ),
    },
    {
      key: "slide-show-passion",
      content: (
        <div className="scroll-text">
          <Paragraph text="We share the same passion" />
          <Paragraph text="Solving problems and crafting creative products" />
        </div>
      ),
    },
    {
      key: "slide-show-exp",
      content: (
        <div className="scroll-text">
          <Paragraph text="At Inbolt, we give robots AI vision" />
          <ParagraphFillLine
            texts={[
              "I built the studio using WebGL, Canvas, and React",
              "Accelerated performance with GPU-optimized meshes",
              "Enhanced UX with a responsive design system",
              "Worked with PM on user flows and QA on E2E testing",
              "My work contributed to the team’s success - driving a €15M raise",
            ]}
            textAlign='left'
          />
        </div>
      ),
    },
    {
      key: "slide-show-goals",
      content: (
        <div className="scroll-text">
          <Paragraph text="I aim to bring at Obello" />
          <ParagraphEaseIn
            texts={[
              "Result-driven mindset",
              "Team-first collaboration",
              "Focus on quality",
            ]}
            textAlign='center'
          />
        </div>
      ),
    },
    {
      key: "slide-show-availability",
      content: (
        <div className="scroll-text">
          <Paragraph text="I can start working in December" />
        </div>
      ),
    },
    {
      key: "slide-show-footer",
      content: (
        <div className="scroll-footer">
          <Paragraph text="Thank you" />
        </div>
      ),
    },
  ];
  
  return (
    <main className="slide-show-container">
      <header>
      </header>
      {sections.map((section) => (
        <section className="slide-show-container__section" key={section.key}>
          <LazyLoad className="slide-show-container__section__lazy" height={"100vh"} offset={400}>
              {section.content}
          </LazyLoad>
        </section>
      ))}
    </main>
  )
}

export default SlideShow
