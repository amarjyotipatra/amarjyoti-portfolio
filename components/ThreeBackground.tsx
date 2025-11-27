"use client";

import { Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import { Color, PerspectiveCamera, Vector3 } from 'three';
import { useUISkinStore, type UISkinState } from '@/store/uiSkin';

const skinPalettes: Record<string, string[]> = {
  cyberwave: ['#38bdf8', '#c084fc', '#22d3ee'],
  solarflare: ['#fb923c', '#facc15', '#f97316'],
  stealth: ['#a3a3a3', '#525252', '#d4d4d8']
};

type StarFieldProps = {
  colorSet: string[];
};

function StarField({ colorSet }: StarFieldProps) {
  const particles = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 4000; i += 1) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      positions.push(x, y, z);
    }
    return Float32Array.from(positions);
  }, []);

  const color = useMemo(() => new Color(colorSet[Math.floor(Math.random() * colorSet.length)]), [colorSet]);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t / 2) * 4;
    camera.position.y = Math.cos(t / 3) * 2;
    camera.lookAt(new Vector3(0, 0, 0));
  });

  return (
    <Points positions={particles} stride={3} frustumCulled>
      <PointMaterial transparent color={color} size={0.04} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

export function ThreeBackground() {
  const skin = useUISkinStore((state: UISkinState) => state.skin);
  return (
    <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-100">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <Suspense fallback={null}>
          <color attach="background" args={[skin === 'stealth' ? '#020617' : '#020314']} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <StarField colorSet={skinPalettes[skin]} />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
        </Suspense>
      </Canvas>
    </div>
  );
}
