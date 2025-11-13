"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

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
}
