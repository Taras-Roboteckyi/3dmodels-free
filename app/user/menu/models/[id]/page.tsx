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
}
