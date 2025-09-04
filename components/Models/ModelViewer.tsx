"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React from "react";

export default function ModelViewer() {
  return (
    <div className="w-full h-[500px] bg-gray-900 rounded-lg">
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        {/* Освітлення */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Тестовий куб */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Управління камерою */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
