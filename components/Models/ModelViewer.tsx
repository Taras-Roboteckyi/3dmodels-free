"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Suspense } from "react";

type Props = {
  modelUrl: string;
};

function Model({ modelUrl }: Props) {
  const isGLB = modelUrl.endsWith(".glb") || modelUrl.endsWith(".gltf");
  const isOBJ = modelUrl.endsWith(".obj");

  // hooks БЕЗ умов
  const gltf = useLoader(GLTFLoader, isGLB ? modelUrl : "");
  const obj = useLoader(OBJLoader, isOBJ ? modelUrl : "");

  if (isGLB) return <primitive object={gltf.scene} scale={1.5} />;
  if (isOBJ) return <primitive object={obj} scale={1.5} />;

  return null;
}

export default function ModelViewer({ modelUrl }: Props) {
  if (!modelUrl) return null;

  return (
    <div className="w-full h-[500px] bg-gray-900 rounded-lg">
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <Model modelUrl={modelUrl} />
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
