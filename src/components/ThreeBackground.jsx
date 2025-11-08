import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls, Float, useTexture } from '@react-three/drei';

const ParticleField = ({ count = 2000, speed = 0.5, color = '#3b82f6' }) => {
  const mesh = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 10 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() - 0.5) * 1000;
      const y = (Math.random() - 0.5) * 1000;
      const z = (Math.random() - 0.5) * 1000;
      
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime() * speed;
      particles.forEach((particle, i) => {
        const { factor, speed, x, y, z } = particle;
        const t = (time * speed + i) % 100;
        particle.time = t;
        
        mesh.current.geometry.attributes.position.setXYZ(
          i,
          x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * 0.5),
          y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * 0.5),
          z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * 0.5)
        );
      });
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const points = useMemo(
    () => new Float32Array(particles.flatMap(({ x, y, z }) => [x, y, z])),
    [particles]
  );

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        color={color}
        sizeAttenuation={true}
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const FloatingOrb = ({ position = [0, 0, 0], color = '#3b82f6', size = 1.5 }) => {
  const mesh = useRef();
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.15;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.2;
      mesh.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
};

const ThreeBackground = ({ 
  particleCount = 1500, 
  particleSpeed = 0.3, 
  particleColor = '#3b82f6',
  enableOrb = true,
  orbColor = '#6366f1',
  orbSize = 2,
  orbPosition = [0, 0, 0],
  autoRotate = true,
  autoRotateSpeed = 0.5,
  enableControls = false,
  cameraPosition = [0, 0, 10],
  fov = 50,
  style = {}
}) => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" style={style}>
      <Canvas 
        camera={{ 
          position: cameraPosition, 
          fov: fov,
          near: 0.1,
          far: 1000 
        }} 
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <ParticleField count={particleCount} speed={particleSpeed} color={particleColor} />
          {enableOrb && <FloatingOrb position={orbPosition} color={orbColor} size={orbSize} />}
          {enableControls && (
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
