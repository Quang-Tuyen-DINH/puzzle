import { useEffect, useRef, useState } from 'react'
import { Stage, Layer } from 'react-konva'
import Konva from 'konva'
import gsap from 'gsap'
import "../styles/components/Fireworks.scss"

function Fireworks() {
  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);
  const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));

  const rocketsRef = useRef<Konva.Circle[]>([]);
  const particlesRef = useRef<Konva.Circle[]>([]);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);


  const redraw = () => {
    const layer = layerRef.current;
    if (layer) layer.batchDraw();
  }

  const createRocket = (x: number, targetY: number) => {
    const layer = layerRef.current;
    if (!layer) return;

    const hue = Math.random() * 360;
    const brightness = 50 + Math.random() * 50;

    const rocket = new Konva.Circle({
      x,
      y: size.height,
      radius: 3,
      fill: `hsl(${hue}, 100%, ${brightness}%)`,
      listening: false,
    }) as Konva.Circle
    layer.add(rocket);
    rocketsRef.current.push(rocket);
    redraw();

    gsap.to(rocket, {
      y: targetY,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: redraw,
      onComplete: () => {
        rocketsRef.current = rocketsRef.current.filter((r) => r !== rocket)
        rocket.destroy()

        explode(x, targetY, hue)
        redraw()
      },
    });
  }

  const explode = (x: number, y: number, hue: number) => {
    const layer = layerRef.current;
    if (!layer) return;
    const count = 15;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 80 + Math.random() * 140;
      const gravity = 60;
      const brightness = 50 + Math.random() * 50;

      const p = new Konva.Circle({
        x,
        y,
        radius: 2,
        opacity: 1,
        fill: `hsl(${hue}, 100%, ${brightness}%)`,
        listening: false,
      }) as Konva.Circle;
      layer.add(p);
      particlesRef.current.push(p);

      const targetX = x + Math.cos(angle) * speed;
      const targetY = y + Math.sin(angle) * speed + gravity * Math.random();

      gsap.to(p, {
        x: targetX,
        y: targetY,
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
        onUpdate: redraw,
        onComplete: () => {
          particlesRef.current = particlesRef.current.filter((node) => node !== p)
          p.destroy()
          redraw()
        },
      })
    }
  }

  useEffect(() => {
    const id = window.setInterval(() => {
      const x = Math.random() * size.width;
      const targetY = Math.random() * size.height * 0.5;
      createRocket(x, targetY);
    }, 300)
    timersRef.current.push(id);
    return () => {
      window.clearInterval(id);
    }
  }, [size.width, size.height])

  useEffect(() => {
    return () => {
      rocketsRef.current.forEach((r) => gsap.killTweensOf(r));
      particlesRef.current.forEach((p) => gsap.killTweensOf(p));
      timersRef.current.forEach((id) => window.clearInterval(id));
      timersRef.current = [];
      rocketsRef.current.forEach((r) => r.destroy());
      particlesRef.current.forEach((p) => p.destroy());
      rocketsRef.current = [];
      particlesRef.current = [];
    }
  }, [])

  return (
    <div className="fireworks-container">
      <div className="fireworks-canvas-wrapper">
        <Stage
          ref={stageRef}
          width={size.width}
          height={size.height}
          listening={false}
        >
          <Layer ref={layerRef} listening={false} />
        </Stage>
      </div>
    </div>
  )
}

export default Fireworks