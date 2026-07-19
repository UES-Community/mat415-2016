"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Lorenz attractor renderer
function LorenzLine({ sigma, rho, beta, pointsCount }: { sigma: number; rho: number; beta: number; pointsCount: number }) {
  const lineRef = useRef<THREE.Line>(null);

  // Animate rotation slightly
  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    let x = 0.1;
    let y = 0.0;
    let z = 0.0;
    const dt = 0.01;

    for (let i = 0; i < pointsCount; i++) {
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;
      x += dx;
      y += dy;
      z += dz;
      // Scale and center the attractor in the view
      points.push(new THREE.Vector3(x * 0.25, y * 0.25, (z - 25) * 0.25));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [sigma, rho, beta, pointsCount]);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="var(--color-jet-ink)" linewidth={2} />
    </line>
  );
}

// Separate component for Lorenz particle simulation that flows along the attractor path
function LorenzParticles({ sigma, rho, beta, count = 80 }: { sigma: number; rho: number; beta: number; count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Maintain positions of particles
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: Math.random() * 20,
      });
    }
    return arr;
  }, [count, sigma, rho, beta]); // regenerate if parameters reset

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    return new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const dt = 0.008;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const dx = sigma * (p.y - p.x) * dt;
      const dy = (p.x * (rho - p.z) - p.y) * dt;
      const dz = (p.x * p.y - beta * p.z) * dt;

      p.x += dx;
      p.y += dy;
      p.z += dz;

      // Scale and translate same as the line
      positions[i * 3] = p.x * 0.25;
      positions[i * 3 + 1] = p.y * 0.25;
      positions[i * 3 + 2] = (p.z - 25) * 0.25;

      // reset if particles fly away or after some steps
      if (isNaN(p.x) || Math.abs(p.x) > 100) {
        p.x = (Math.random() - 0.5) * 2;
        p.y = (Math.random() - 0.5) * 2;
        p.z = Math.random() * 5;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.002;
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial color="var(--color-sunbeam)" size={0.15} sizeAttenuation={true} transparent opacity={0.8} />
    </points>
  );
}

export default function VectorField3D() {
  const [mounted, setMounted] = useState(false);
  const [sigma, setSigma] = useState(10.0);
  const [rho, setRho] = useState(28.0);
  const [beta, setBeta] = useState(2.67); // 8/3

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[360px] bg-cream rounded-2xl flex items-center justify-center border border-dove/40">
        <span className="text-xs font-geistmono text-fog">Inicializando Canvas 3D...</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 p-6 md:p-8 bg-cream rounded-2xl shadow-subtle-2 border border-dove/40">
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-geistmono text-pewter tracking-wider uppercase">Simulación Tridimensional (EDOs)</span>
          <h3 className="text-xl font-medium tracking-tight text-jet-ink">Atractor de Lorenz</h3>
        </div>
        <div className="px-3 py-1 bg-sand rounded-full text-xs font-medium border border-dove/30 font-geistmono">
          dx/dt = σ(y - x)
        </div>
      </div>

      {/* 3D Canvas Box */}
      <div className="h-[360px] w-full bg-paper rounded-xl border border-dove/30 relative overflow-hidden">
        <Canvas camera={{ position: [0, 5, 20], fov: 45 }}>
          <color attach="background" args={["#ffffff"]} />
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          
          <LorenzLine sigma={sigma} rho={rho} beta={beta} pointsCount={2000} />
          <LorenzParticles sigma={sigma} rho={rho} beta={beta} count={120} />
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={true}
            maxPolarAngle={Math.PI / 1.8}
            minDistance={5}
            maxDistance={40}
          />
        </Canvas>
        
        {/* Helper overlay */}
        <div className="absolute bottom-3 right-3 bg-cream/90 backdrop-blur-sm px-2.5 py-1 rounded border border-dove/40 text-[10px] font-geistmono text-steel select-none pointer-events-none">
          Click + Arrastrar para rotar | Scroll para zoom
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sigma */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-geistmono text-steel">
            <span>Prandtl (σ):</span>
            <span className="font-bold text-jet-ink bg-sand px-2 py-0.5 rounded-full">{sigma.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={5.0}
            max={20.0}
            step={0.5}
            value={sigma}
            onChange={(e) => setSigma(parseFloat(e.target.value))}
            className="w-full h-1 bg-dove rounded-lg appearance-none cursor-pointer accent-jet-ink"
          />
        </div>

        {/* Rho */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-geistmono text-steel">
            <span>Rayleigh (ρ):</span>
            <span className="font-bold text-jet-ink bg-sand px-2 py-0.5 rounded-full">{rho.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={10.0}
            max={40.0}
            step={0.5}
            value={rho}
            onChange={(e) => setRho(parseFloat(e.target.value))}
            className="w-full h-1 bg-dove rounded-lg appearance-none cursor-pointer accent-jet-ink"
          />
        </div>

        {/* Beta */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-geistmono text-steel">
            <span>Geométrico (β):</span>
            <span className="font-bold text-jet-ink bg-sand px-2 py-0.5 rounded-full">{beta.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={1.0}
            max={4.0}
            step={0.1}
            value={beta}
            onChange={(e) => setBeta(parseFloat(e.target.value))}
            className="w-full h-1 bg-dove rounded-lg appearance-none cursor-pointer accent-jet-ink"
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-[12px] text-steel leading-relaxed">
        El atractor de Lorenz es un sistema de ecuaciones diferenciales ordinarias de 3er orden que exhibe comportamiento caótico para ciertos conjuntos de parámetros (e.g. \(\\sigma=10, \\rho=28, \\beta=8/3\\)). Resuelto numéricamente en tiempo real.
      </p>
    </div>
  );
}
