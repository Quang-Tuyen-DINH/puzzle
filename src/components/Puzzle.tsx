import { useState } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import useImage from 'use-image';
import '../styles/components/Puzzle.scss';

import baguettesImg from '../assets/puzzle/baguettes.png';
import baguettesOutline from '../assets/puzzle/baguettes-outline.png';
import baguettesDark from '../assets/puzzle/baguettes-dark.png';

import croissantImg from '../assets/puzzle/croissant.png';
import croissantOutline from '../assets/puzzle/croissant-outline.png';
import croissantDark from '../assets/puzzle/croissant-dark.png';

import vinImg from '../assets/puzzle/vin.png';
import vinOutline from '../assets/puzzle/vin-outline.png';
import vinDark from '../assets/puzzle/vin-dark.png';

import parisBackground from '../assets/puzzle/paris-background.jpg';
import Fireworks from './Fireworks';
import Paragraph from './Paragraph';

const imageMap: Record<string, string> = {
  baguettes: baguettesImg,
  croissant: croissantImg,
  vin: vinImg,
};

const outlineMap: Record<string, string> = {
  baguettes: baguettesOutline,
  croissant: croissantOutline,
  vin: vinOutline,
};

const darkMap: Record<string, string> = {
  baguettes: baguettesDark,
  croissant: croissantDark,
  vin: vinDark,
};

interface SymbolProps {
  name: string;
  startX: number;
  startY: number;
  outline: { x: number; y: number };
  onScore: () => void;
}

interface Position {
  x: number;
  y: number;
}

const Symbol = ({ name, startX, startY, outline, onScore }: SymbolProps) => {
  const [pos, setPos] = useState<Position>({ x: startX, y: startY });
  const [isDraggable, setIsDraggable] = useState(true);
  const [inRightPlace, setInRightPlace] = useState(false);

  const [image] = useImage(imageMap[name]);
  const [outlineImage] = useImage(outlineMap[name]);

  const isNearOutline = (pos: Position, outline: Position): boolean => {
    const { x, y } = pos;
    return (
      x > outline.x - 22 &&
      x < outline.x + 22 &&
      y > outline.y - 22 &&
      y < outline.y + 22
    );
  };

  const handleDragStart = (e: any) => {
    e.target.moveToTop();
  };

  const handleDragEnd = (e: any) => {
    const newPos: Position = { x: e.target.x(), y: e.target.y() };
    setPos(newPos);

    if (!inRightPlace && isNearOutline(newPos, outline)) {
      setPos({ x: outline.x, y: outline.y });
      setInRightPlace(true);
      setIsDraggable(false);
      onScore();
    }
  };

  const handleMouseOver = (e: any) => {
    if (outlineImage) {
      e.target.image(outlineImage);
    }
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = 'pointer';
    }
  };

  const handleMouseOut = (e: any) => {
    if (image) {
      e.target.image(image);
    }
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = 'default';
    }
  };

  const handleDragMove = (e: any) => {
    const stage = e.target.getStage();
    if (stage) {
      stage.container().style.cursor = 'pointer';
    }
  };

  if (!image || !outlineImage) return null;

  return (
    <Image
      image={image}
      x={pos.x}
      y={pos.y}
      scaleX={0.3}
      scaleY={0.3}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onDragMove={handleDragMove}
    />
  );
};

interface SymbolMatchProps {
  name: string;
  x: number;
  y: number;
}

const SymbolMatch = ({ name, x, y }: SymbolMatchProps) => {
  const [image] = useImage(darkMap[name]);
  return image ? (
    <Image
      image={image}
      x={x}
      y={y}
      scaleX={0.3}
      scaleY={0.3}
    />
  ) : null;
};

const Background = () => {
  const [image] = useImage(parisBackground);
  return image ? <Image image={image} width={1280} height={720} /> : null;
};

interface SymbolData {
  x: number;
  y: number;
  outline: { x: number; y: number };
}

interface SymbolsConfig {
  [key: string]: SymbolData;
}

const Puzzle = () => {
  const [score, setScore] = useState(0);

  const symbols: SymbolsConfig = {
    baguettes: { x: 850, y: 70, outline: { x: 120, y: 150 } },
    croissant: { x: 990, y: 70, outline: { x: 390, y: 250 } },
    vin: { x: 510, y: 30, outline: { x: 1080, y: 190 } }
  };

  const handleScore = () => {
    setScore(s => s + 1);
  };

  const success = score >= 3;

  return (
    <div className="puzzle-container">
      <div className="puzzle-fireworks-wrapper">
        {success &&
          <Fireworks />
        }
      </div>
      <div className="puzzle-header-paragraph-wrapper">
        <Paragraph text={success ? 'Well done! You made it.' : 'Feel free to complete the puzzle.'} />
      </div>
      <div className="puzzle-canvas-wrapper">
        <Stage width={1200} height={530}>
          <Layer>
            <Background />
          </Layer>
          <Layer>
            {Object.entries(symbols).map(([name, pos]) => (
              <SymbolMatch
                key={`${name}_outline`}
                name={name}
                x={pos.outline.x}
                y={pos.outline.y}
              />
            ))}
            {Object.entries(symbols).map(([name, pos]) => (
              <Symbol
                key={name}
                name={name}
                startX={pos.x}
                startY={pos.y}
                outline={pos.outline}
                onScore={handleScore}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Puzzle;
