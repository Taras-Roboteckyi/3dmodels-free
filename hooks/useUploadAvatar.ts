"use client";

import { useState } from "react";

export function useUploadAvatar(onUploaded: (url: string) => void) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.secure_url) throw new Error("Помилка при завантаженні");

      onUploaded(data.secure_url); // 👈 Передаємо результат у компонент
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    preview,
    loading,
    handleChange,
    handleUpload,
  };
}
