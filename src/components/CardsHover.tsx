import React from 'react';
import '../styles/components/CardsHover.scss';

export type CardItem = {
  label: string;
  color: string;
  icon?: React.ReactNode | string;
};

type Props = {
  cards: CardItem[];
  className?: string;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const CardsHover: React.FC<Props> = ({ cards, className = '' }) => {
  return (
    <div className={`cards-hover ${className}`.trim()}>
      {cards.map((c, idx) => {
        const style: React.CSSProperties = {
          ['--card-float-duration' as any]: `${rand(4, 8)}s`,
          ['--card-float-delay' as any]: `${rand(-2, 2)}s`,
          ['--card-rotate' as any]: `${rand(-6, 6)}deg`,
          ['--card-bg' as any]: c.color,
        };

        return (
          <div
            key={c.label + idx}
            className="cards-hover__card"
            style={style}
            role="button"
            tabIndex={0}
            aria-label={c.label}
          >
            {c.icon ? (
              typeof c.icon === 'string' ? (
                <img src={c.icon} alt="" className="cards-hover__icon" />
              ) : (
                <div className="cards-hover__icon">{c.icon}</div>
              )
            ) : null}
            <div className="cards-hover__label">{c.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CardsHover;
