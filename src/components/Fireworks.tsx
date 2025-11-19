import { useEffect, useRef, useState } from 'react'
import { Stage, FastLayer } from 'react-konva'
import Konva from 'konva'
import gsap from 'gsap'
import "../styles/components/Fireworks.scss"

const MAX_POOL_SIZE = 150;

function Fireworks() {
  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.FastLayer | null>(null);
  const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));
  const sizeRef = useRef(size);

  const rocketsRef = useRef<Konva.Circle[]>([]);
  const particlesRef = useRef<Konva.Circle[]>([]);
  const particlePoolRef = useRef<Konva.Circle[]>([]);
  const rafSpawnRef = useRef<number | null>(null);
  const lastSpawnTimeRef = useRef<number>(performance.now());
  const spawnIntervalMs = 300; // configurable spawn cadence

  useEffect(() => {
    let scheduled = false;
    const onResize = () => {
      if (!scheduled) {
        // Rapid resize events could cause many React re-renders
        // Using the scheduled + requestAnimationFrame pattern effectively throttles to one update per frame (~16ms max)
        scheduled = true;
        requestAnimationFrame(() => {
          scheduled = false;
          const newSize = { width: window.innerWidth, height: window.innerHeight };
          sizeRef.current = newSize;
          setSize(newSize);
        });
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);


  const redraw = () => {
    const layer = layerRef.current;
    if (layer) layer.batchDraw();
  };

  useEffect(() => {
    const tickerFn = () => redraw();
    gsap.ticker.add(tickerFn);
    return () => gsap.ticker.remove(tickerFn);
  }, []);

  const acquireParticle = (x: number, y: number, fill: string, radius = 2) => {
    const layer = layerRef.current;
    if (!layer) return null;
    let node = particlePoolRef.current.pop();
    if (node) {
      node.position({ x, y });
      node.radius(radius);
      node.fill(fill);
      node.opacity(1);
      layer.add(node);
      return node;
    }
    node = new Konva.Circle({ x, y, radius, fill, opacity: 1, listening: false }) as Konva.Circle;
    layer.add(node);
    return node;
  };

  const recycleParticle = (p: Konva.Circle) => {
    p.remove();
    if (particlePoolRef.current.length < MAX_POOL_SIZE) {
      particlePoolRef.current.push(p); // keep for reuse
    } else {
      p.destroy();
    }
  };

  const createRocket = (x: number, targetY: number) => {
    const layer = layerRef.current;
    if (!layer) return;

    const hue = Math.random() * 360;
    const brightness = 50 + Math.random() * 50;

    const rocket = new Konva.Circle({
      x,
      y: sizeRef.current.height,
      radius: 3,
      fill: `hsl(${hue}, 100%, ${brightness}%)`,
      listening: false,
    }) as Konva.Circle;
    layer.add(rocket);
    rocketsRef.current.push(rocket);

    gsap.to(rocket, {
      y: targetY,
      duration: 1.4,
      ease: 'power2.out',
      onComplete: () => {
        rocketsRef.current = rocketsRef.current.filter((r) => r !== rocket);
        rocket.destroy();
        explode(x, targetY, hue);
      },
    });
  };

  const explode = (x: number, y: number, hue: number) => {
    const layer = layerRef.current;
    if (!layer) return;
    const count = 15;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 80 + Math.random() * 140;
      const gravity = 60;
      const brightness = 50 + Math.random() * 50;

      const particle = acquireParticle(x, y, `hsl(${hue}, 100%, ${brightness}%)`);
      if (!particle) continue;
      particlesRef.current.push(particle);

      const targetX = x + Math.cos(angle) * speed;
      const targetY = y + Math.sin(angle) * speed + gravity * Math.random();

      gsap.to(particle, {
        x: targetX,
        y: targetY,
        opacity: 0,
        duration: 0.9,
        ease: 'power1.out',
        onComplete: () => {
          particlesRef.current = particlesRef.current.filter((node) => node !== particle);
          recycleParticle(particle);
        },
      });
    }
  };

  // Spawn loop using requestAnimationFrame instead of setInterval for better alignment with render frames.
  useEffect(() => {
    const loop = () => {
      const now = performance.now();
      if (now - lastSpawnTimeRef.current >= spawnIntervalMs) {
        lastSpawnTimeRef.current = now;
        const x = Math.random() * sizeRef.current.width;
        const targetY = Math.random() * sizeRef.current.height * 0.5;
        createRocket(x, targetY);
      }
      rafSpawnRef.current = requestAnimationFrame(loop);
    };
    rafSpawnRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafSpawnRef.current) cancelAnimationFrame(rafSpawnRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      rocketsRef.current.forEach((r) => gsap.killTweensOf(r));
      particlesRef.current.forEach((p) => gsap.killTweensOf(p));
      if (rafSpawnRef.current) cancelAnimationFrame(rafSpawnRef.current);
      rocketsRef.current.forEach((r) => r.destroy());
      particlesRef.current.forEach((p) => p.remove());
      particlePoolRef.current.forEach((p) => p.destroy());
      rocketsRef.current = [];
      particlesRef.current = [];
      particlePoolRef.current = [];
    };
  }, []);

  return (
    <div className="fireworks-container">
      <div className="fireworks-canvas-wrapper">
        <Stage
          ref={stageRef}
          width={size.width}
          height={size.height}
          listening={false}
        >
          {/* FastLayer is more performant for many non-interactive shapes */}
          <FastLayer ref={layerRef} listening={false} />
        </Stage>
      </div>
    </div>
  )
}

export default Fireworks