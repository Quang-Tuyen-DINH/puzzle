import { useEffect, useRef, useState } from 'react'
import { Stage, Layer } from 'react-konva'
import Konva from 'konva'
import gsap from 'gsap'
import "../styles/components/Fireworks.scss"

/**
 * Fireworks rendered with Konva shapes animated by GSAP.
 * - No direct DOM access; uses refs and lifecycle.
 * - Programmatically creates Konva nodes in a single Layer for performance.
 */
function Fireworks() {
  const stageRef = useRef<Konva.Stage | null>(null)
  const layerRef = useRef<Konva.Layer | null>(null)
  const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }))

  const rocketsRef = useRef<Konva.Circle[]>([])
  const particlesRef = useRef<Konva.Circle[]>([])
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Helper to batch draw safely
  const redraw = () => {
    const layer = layerRef.current
    if (layer) layer.batchDraw()
  }

  // Create a single rocket (rises then explodes)
  const createRocket = (x: number, targetY: number) => {
    const layer = layerRef.current
    if (!layer) return

    const hue = Math.random() * 360
    const brightness = 50 + Math.random() * 50

  const rocket = new Konva.Circle({
      x,
      y: size.height,
      radius: 3,
      fill: `hsl(${hue}, 100%, ${brightness}%)`,
      listening: false,
    }) as Konva.Circle
    layer.add(rocket)
    rocketsRef.current.push(rocket)
    redraw()

    gsap.to(rocket, {
      y: targetY,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: redraw,
      onComplete: () => {
        // Remove rocket
        rocketsRef.current = rocketsRef.current.filter((r) => r !== rocket)
        rocket.destroy()
        // Explode
        explode(x, targetY, hue)
        redraw()
      },
    })
  }

  // Create particles for explosion
  const explode = (x: number, y: number, hue: number) => {
    const layer = layerRef.current
    if (!layer) return
    const count = 50
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 80 + Math.random() * 140 // pixels spread
      const gravity = 60 // downward offset
      const brightness = 50 + Math.random() * 50

  const p = new Konva.Circle({
        x,
        y,
        radius: 2,
        opacity: 1,
        fill: `hsl(${hue}, 100%, ${brightness}%)`,
        listening: false,
      }) as Konva.Circle
      layer.add(p)
      particlesRef.current.push(p)

      const targetX = x + Math.cos(angle) * speed
      const targetY = y + Math.sin(angle) * speed + gravity * Math.random()

      gsap.to(p, {
        x: targetX,
        y: targetY,
        opacity: 0,
        duration: 1.2,
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
    // Auto-spawn rockets
    const id = window.setInterval(() => {
      const x = Math.random() * size.width
      const targetY = Math.random() * size.height * 0.5
      createRocket(x, targetY)
    }, 600)
    timersRef.current.push(id)
    return () => {
      window.clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width, size.height])

  useEffect(() => {
    // Cleanup on unmount: kill tweens and destroy nodes
    return () => {
      // Kill all tweens targeting Konva nodes
      rocketsRef.current.forEach((r) => gsap.killTweensOf(r))
      particlesRef.current.forEach((p) => gsap.killTweensOf(p))
      // Clear timers
      timersRef.current.forEach((id) => window.clearInterval(id))
      timersRef.current = []
      // Destroy nodes
      rocketsRef.current.forEach((r) => r.destroy())
      particlesRef.current.forEach((p) => p.destroy())
      rocketsRef.current = []
      particlesRef.current = []
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        listening={false}
      >
        <Layer ref={layerRef} listening={false} />
      </Stage>
    </div>
  )
}

export default Fireworks