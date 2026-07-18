import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Float } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'

function useThemeColors () {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const el = document.documentElement
    const update = () => setDark(el.classList?.contains('dark'))
    update()
    const obs = new MutationObserver(update)
    obs.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return useMemo(() => ({
    primary: dark ? '#818cf8' : '#6366f1', // indigo
    surface: dark ? '#0b0f1a' : '#ffffff',
    glow: dark ? '#6366f1' : '#8ea0ff'
  }), [dark])
}

function Bubble () {
  const group = useRef()
  const { primary, surface, glow } = useThemeColors()
  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.y = t * 0.6
    group.current.rotation.x = Math.sin(t * 0.4) * 0.12
  })
  return (
    <group ref={group}>
      {/* Halo */}
      <mesh position={[0, 0, -0.05]}>
        <ringGeometry args={[0.9, 1.05, 48]} />
        <meshBasicMaterial color={glow} transparent opacity={0.15} />
      </mesh>
      {/* Chat bubble body (glassy) */}
      <RoundedBox args={[1.4, 1.0, 0.35]} radius={0.22} smoothness={8}>
        <meshPhysicalMaterial 
          color={surface}
          metalness={0.35}
          roughness={0.15}
          clearcoat={0.7}
          clearcoatRoughness={0.2}
          sheen={0.2}
          transmission={0.04}
          thickness={0.2}
          emissive={glow}
          emissiveIntensity={0.06}
        />
      </RoundedBox>
      {/* Tail */}
      <mesh position={[0.52, -0.53, 0]} rotation={[0, 0, -0.7]}>
        <coneGeometry args={[0.2, 0.32, 16]} />
        <meshPhysicalMaterial color={surface} metalness={0.3} roughness={0.2} clearcoat={0.6} />
      </mesh>
      {/* Three-dot accent */}
      {[ -0.25, 0, 0.25 ].map((x, i) => (
        <mesh key={i} position={[x, 0.03, 0.2]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  )
}

export default function ChatIcon3D ({ className = '' }) {
  const { primary } = useThemeColors()
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 2.2], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[2, 3, 2]} intensity={0.9} color={primary} />
        <Float speed={2} rotationIntensity={0.35} floatIntensity={0.55}>
          <Bubble />
        </Float>
      </Canvas>
    </div>
  )
}
