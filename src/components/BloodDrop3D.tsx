import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const BloodDropGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshPhongMaterial
        color="#ff4d4d"
        emissive="#ff1a1a"
        emissiveIntensity={0.3}
        shininess={100}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

const BloodDrop3D = () => {
  return (
    <div className="w-64 h-64 mx-auto animate-float">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff4d4d" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        <BloodDropGeometry />
      </Canvas>
    </div>
  );
};

export default BloodDrop3D;