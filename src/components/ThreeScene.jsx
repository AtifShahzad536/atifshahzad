import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { Suspense, useMemo } from 'react';

function Blob() {
  const points = useMemo(() => Array.from({ length: 160 }, () => [
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 6,
  ]), []);
  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color={'hsl(var(--accent))'} emissive={'#0b1220'} emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.75}>
            <Blob />
          </Float>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
        </Suspense>
      </Canvas>
    </div>
  );
}
