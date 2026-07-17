import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function Dust() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 300;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 60;
    return arr;
  }, []);

  // Pure visual animation on a ref — never touches React state, so it can
  // run every frame safely without any risk of an update-depth loop.
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#38C0E4"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function DesktopBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#05080c] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }} gl={{ antialias: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#38C0E4" />
        <Stars radius={80} depth={40} count={2000} factor={3.5} saturation={0} fade speed={0.6} />
        <Dust />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,8,12,0.75)_100%)]" />
    </div>
  );
}
