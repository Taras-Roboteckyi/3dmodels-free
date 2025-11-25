"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ModelViewer from "@components/Models/ModelViewer";

interface Model3D {
  userId: string;
  title: string;
  description?: string;
  modelUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model3D[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch("/api/models");
        const data = await res.json();
        setModels(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchModels();
  }, []);

  if (loading) return <p className="p-4">Завантаження...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Мої 3D моделі</h1>
      <ModelViewer />
      {models.length === 0 ? (
        <p>У вас ще немає моделей.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model) => (
            <Link key={model.userId} href={`/models/${model.userId}`}>
              <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
                {model.thumbnailUrl && (
                  <Image
                    src={model.thumbnailUrl}
                    alt={model.title}
                    width={300}
                    height={200}
                    className="rounded mb-3"
                  />
                )}
                <h2 className="text-lg font-semibold">{model.title}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(model.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
