<p><strong>Interactive drag‑and‑drop mini puzzle built with React, Vite, Konva & GSAP.</strong></p>
<p>Match the French themed symbols (baguettes, croissant, vin) to their silhouettes.</p>

## Features

- Drag & drop matching of three symbols to target outlines (snap when close).
- Visual feedback on hover and cursor changes.
- Fireworks celebration once all matches succeed.
- Efficient particle pooling (max 150) + GSAP ticker driven redraw for performance.
- Clean TypeScript components and scoped SCSS styles.

## Tech Stack

- Build tooling: Vite + TypeScript
- UI: React 18
- Canvas / 2D scene graph: Konva & react-konva
- Animation: GSAP
- Drag behavior: Konva built‑in draggable nodes
- Styling: SCSS modules

## Project Structure (key files)

```
root/
├─ src/
│  ├─ main.tsx                 # App bootstrap
│  ├─ App.tsx                  # Root component / routes mounting
│  ├─ components/
│  │  ├─ Puzzle.tsx            # Core puzzle logic + scoring
│  │  ├─ Fireworks.tsx         # Fireworks animation system (GSAP + Konva)
│  │  └─ Paragraph.tsx         # Animated heading text splitter
│  ├─ assets/puzzle/           # Images (symbols, outlines, background)
│  └─ styles/components/*.scss # Component styles
├─ vite.config.ts              # Vite configuration
├─ tsconfig.json               # TypeScript config
└─ README.md                   # You are here
```

## How It Works (Puzzle Mechanics)

1. Each symbol (`baguettes`, `croissant`, `vin`) starts at an initial coordinate.
2. Matching silhouette (dark image) is rendered beneath; draggable colored symbol is rendered on top layer.
3. On drag end, proximity check (`±22px`) determines a snap to the target position and locks the piece (disables dragging).
4. Score increments; when score reaches total pieces, success state renders fireworks + congratulatory paragraph.

## Running Locally

```bash
git clone <repo-url>
cd puzzle
npm install
npm run dev
# Open http://localhost:3000
```

No environment variables are required.
