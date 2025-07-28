"use client";
import { useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useUploadUrl } from "../../hooks/useUploadUrl";
import AppLoader from "@components/Loader/Loader";

export default function UploadAvatar() {
  const { update } = useSession();
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

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
      router.refresh(); // оновлюємо сторінку, щоб автоматично відобразити нову аватарку
      setUploadedUrl(secureUrl);
    },
    onError: (err) => {
      console.error("Upload error:", err);
    },
  });

  const handleLabelClick = () => {
    if (!loading && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex  justify-center gap-4 ">
      <label
        onClick={handleLabelClick}
        className={`inline-block px-4 py-2 rounded text-white transition ${
          loading
            ? "bg-blue-300 cursor-not-allowed opacity-50"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Вибрати файл
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          disabled={loading}
        />
      </label>
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
        className={`px-4 py-2 rounded text-white transition 
    ${
      loading
        ? "bg-blue-300 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
      >
        {loading ? "Завантаження..." : "Завантажити"}
      </button>

      {uploadedUrl && (
        <p className="text-green-600 text-sm">Фото успішно завантажено!</p>
      )}
    </div>
  );
}
