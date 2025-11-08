'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const TechIcons = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  const icons = [
    { component: 'React', position: [2, 0, 0], color: '#61DAFB' },
    { component: 'Node.js', position: [-2, 0, 0], color: '#68A063' },
    { component: 'TypeScript', position: [0, 2, 0], color: '#3178C6' },
    { component: 'Next.js', position: [0, -2, 0], color: '#000000' },
    { component: 'MongoDB', position: [0, 0, 2], color: '#47A248' },
    { component: 'Three.js', position: [0, 0, -2], color: '#000000' },
  ];

  return (
    <group ref={meshRef}>
      {icons.map((icon, i) => (
        <mesh
          key={i}
          position={icon.position}
          onPointerOver={() => setHovered(i)}
          onPointerOut={() => setHovered(null)}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial 
            color={hovered === i ? 'white' : icon.color} 
            emissive={icon.color}
            emissiveIntensity={hovered === i ? 0.8 : 0.2}
          />
        </mesh>
      ))}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </group>
  );
};

const TechSphere = () => {
  return (
    <div className="relative w-64 h-64 mx-auto mb-12">
      <Canvas>
        <TechIcons />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default TechSphere;
