"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Suspense } from "react";

type Props = {
  url: string;
  type: "glb" | "obj";
};

/* 🔹 ОКРЕМИЙ компонент для моделі */
function Model({ url, type }: Props) {
  const gltf = useLoader(GLTFLoader, url);
  const obj = useLoader(OBJLoader, url);

  if (type === "glb") {
    return <primitive object={gltf.scene} scale={1} />;
  }

  if (type === "obj") {
    return <primitive object={obj} scale={1} />;
  }

  return null;
}
