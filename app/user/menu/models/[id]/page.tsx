"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ModelViewer from "@components/Models/ModelViewer";

interface Model3D {
  _id: string;
  title: string;
  description?: string;
  modelUrl: string;
  previewImages: string[];
  thumbnailUrl: string;
  createdAt: string;
  userId: {
    name: string;
    email: string;
    image: string;
  };
}

export default function ModelPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [model, setModel] = useState<Model3D | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadModel() {
      try {
        const res = await fetch(`/api/models/${id}`);
        const data = await res.json();
        setModel(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadModel();
  }, [id]);

  if (loading) return <p className="p-6">Завантаження...</p>;
  if (!model) return <p className="p-6">Модель не знайдена.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">{model.title}</h1>

      <p className="text-gray-400 mb-6">{model.description}</p>

      {/* Превʼю фото */}
      <div className="flex gap-4 mb-6">
        {model.previewImages.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="preview"
            width={200}
            height={200}
            className="rounded-lg"
          />
        ))}
      </div>

      {/* 3D Viewer */}
      <div className="mb-8">
        <ModelViewer modelUrl={model.modelUrl} />
      </div>

      {/* Автор */}
      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-1">Автор:</h3>
        <div className="flex items-center gap-3">
          {model.userId?.image && (
            <Image
              src={model.userId.image}
              width={40}
              height={40}
              alt="author"
              className="rounded-full"
            />
          )}
          <div>
            <p>{model.userId?.name}</p>
            <p className="text-gray-400 text-sm">{model.userId?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
