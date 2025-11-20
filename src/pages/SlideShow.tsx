import "../styles/pages/SlideShow.scss";
import Puzzle from '../components/Puzzle';
import Paragraph from '../components/Paragraph';
import ParagraphFillLine from '../components/ParagraphFillLine';
import ParagraphEaseIn from '../components/ParagraphEaseIn';
import SectionCentered from '../components/SectionCentered';
import CardsHover from '../components/CardsHover';
import { useMemo } from "react";

function SlideShow() {
  const sections = useMemo(() => ([
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
          <Paragraph text="Solving problems and crafting creative products" color="#ff0"/>
        </div>
      ),
    },
    {
      key: "slide-show-exp",
      content: (
        <div className="slide-show-exp">
          <div className="slide-show-exp__inbolt">
            <Paragraph text="At Inbolt, we give robots AI vision" />
            <div className="slide-show-exp__inbolt__demo">
              <iframe
                className="slide-show-exp__inbolt__iframe"
                src="https://www.youtube.com/embed/TdDXTyDm-a0?si=Fb9ne_UTqb3eXsV8"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <div className="slide-show-exp__my-exp">
            <Paragraph text="As for me" />
            <ParagraphFillLine
              texts={[
                "- Built the studio's frontend using WebGL, Canvas, and React",
                "- Accelerated performance with GPU-optimized meshes",
                "- Handled engineering, product, and design responsibilities across the frontend from 2023 to 2024",
                "- Enhanced UX with a responsive design system",
                "- Worked with PM on user flows and QA on E2E testing",
                "- My work contributed to the team’s success - we raised €15M ",
              ]}
              textAlign='left'
              startColor="#448bff"
            />
          </div>
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
      key: "slide-show-cards",
      content: (
        <div className="scroll-text">
          <CardsHover
            cards={[
              { label: 'Design', color: '#ef5b5b' },
              { label: 'Frontend', color: '#448bff' },
              { label: 'Performance', color: '#21c997' },
              { label: 'UX', color: '#ff8c42' },
              { label: 'Teamwork', color: '#8b5cff' },
            ]}
          />
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
  ]), []);
  
  return (
    <main className="slide-show-container">
      <header>
      </header>
      {sections.map((section) => (
        <section className="slide-show-container__section" key={section.key}>
          <SectionCentered className="slide-show-container__section__lazy" minHeight="100vh" activateOnce={false}>
            {section.content}
          </SectionCentered>
        </section>
      ))}
    </main>
  )
}

export default SlideShow
