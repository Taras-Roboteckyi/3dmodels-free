"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import { PreviewImages } from "./PreviewImages";

export default function UploadModelForm() {
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [previewImages, setPreviewImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePreviewUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 3); // максимум 3 фото
    setPreviewImages(files);
  };

  const handleSubmit = async () => {
    if (!modelFile || previewImages.length === 0) {
      toast.error("❗ Додай модель і хоча б 3 фото прев'ю");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("model", modelFile);
    previewImages.forEach((file, i) => {
      formData.append(`preview_${i}`, file);
    });

    try {
      setLoading(true);
      const res = await fetch("/api/upload-model", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Помилка при завантаженні моделі");
      }

      const data = await res.json();
      toast.success("✅ Модель успішно завантажена!");
      console.log("Uploaded:", data);

      // Очистимо поля після успіху
      setModelFile(null);
      setPreviewImages([]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      toast.error("❌ Не вдалося завантажити модель");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg text-white max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Завантажити 3D модель</h2>

      <input
        type="file"
        accept=".zip,.glb,.gltf,.obj,.stl,.step" // Дозволені формати моделей
        onChange={(e) => setModelFile(e.target.files?.[0] || null)}
        className="block mb-3"
      />

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePreviewUpload}
        className="block mb-3"
      />

      <PreviewImages images={previewImages} />

      <input
        type="text"
        placeholder="Назва моделі"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-2 text-black rounded"
      />

      <textarea
        placeholder="Опис моделі"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 p-2 text-black rounded"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2 rounded font-medium ${
          loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Завантаження..." : "Завантажити модель"}
      </button>
    </div>
  );
}
