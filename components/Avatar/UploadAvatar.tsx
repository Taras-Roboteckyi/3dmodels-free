"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UploadAvatar() {
  const { update } = useSession();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

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
      // 1. Завантаження на Cloudinary
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.secure_url) throw new Error("Помилка при завантаженні");

      // 2. Збереження URL у базу
      const updateRes = await fetch("/api/update-avatar", {
        method: "POST",
        body: JSON.stringify({ image: data.secure_url }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!updateRes.ok) throw new Error("Помилка при оновленні профілю");

      // 3. Оновлення сесії (щоб одразу підтягнувся новий аватар)
      await update(); // ← оновить session.user.image

      setUploadedUrl(data.secure_url);
      // 2. Збереження URL у базу
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          className="w-32 h-32 rounded-full object-cover"
        />
      )}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Завантаження..." : "Завантажити"}
      </button>
      {uploadedUrl && (
        <p className="text-green-600 text-sm">Фото успішно завантажено!</p>
      )}
    </div>
  );
}
