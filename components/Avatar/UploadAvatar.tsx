"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useUploadUrl } from "../../hooks/useUploadUrl";
import { useState } from "react";

export default function UploadAvatar() {
  const { update } = useSession();
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const { preview, loading, handleChange, handleUpload } = useUploadUrl({
    uploadEndpoint: "/api/upload-avatar",
    onSuccess: async (secureUrl) => {
      // Зберігаємо URL в базу
      const updateRes = await fetch("/api/update-avatar", {
        method: "POST",
        body: JSON.stringify({ image: secureUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!updateRes.ok) throw new Error("Помилка при оновленні профілю");

      await update(); // оновлюємо сесію з сервера

      setUploadedUrl(secureUrl);
    },
    onError: (err) => {
      console.error("Upload error:", err);
    },
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <input type="file" accept="image/*" onChange={handleChange} />

      {preview && (
        <Image
          src={preview}
          alt="Preview"
          className="w-32 h-32 rounded-full object-cover"
          width={128}
          height={128}
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
