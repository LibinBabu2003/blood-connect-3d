import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particle = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += 0.02;
      meshRef.current.rotation.z += 0.01;
      
      if (meshRef.current.position.y > 10) {
        meshRef.current.position.y = -10;
        meshRef.current.position.x = (Math.random() - 0.5) * 20;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial
        color="#ff4d4d"
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

const ParticleSystem = () => {
  const particles = Array.from({ length: 50 }, (_, i) => (
    <Particle
      key={i}
      position={[
        (Math.random() - 0.5) * 20,
        Math.random() * 20 - 10,
        (Math.random() - 0.5) * 10
      ]}
    />
  ));

  return <>{particles}</>;
};

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ParticleSystem />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;