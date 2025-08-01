"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useUploadUrl } from "../../hooks/useUploadUrl";
import AppLoader from "@components/Loader/Loader";

export default function UploadAvatar() {
  const { update } = useSession();
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState(false);

  const router = useRouter();

  const {
    preview,
    loading,
    handleChange: originalHandleChange,
    handleUpload,
  } = useUploadUrl({
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
      setFileSelected(false); // Повертаємо до початкового стану

      // 🔽 Автоматичне приховання повідомлення через 3 секунди
      setTimeout(() => setUploadedUrl(null), 3000);
    },
    onError: (err) => {
      console.error("Upload error:", err);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(true);
      originalHandleChange(e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Вибрати файл */}
      <label
        className={`inline-block px-4 py-2 rounded text-white transition ${
          loading || fileSelected
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }`}
      >
        Вибрати файл
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading || fileSelected}
        />
      </label>

      {/* Прев’ю */}
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          className="w-32 h-32 rounded-full object-cover"
          width={128}
          height={128}
        />
      )}

      {/* Завантажити */}
      <button
        onClick={handleUpload}
        disabled={!fileSelected || loading}
        className={`px-4 py-2 rounded text-white transition ${
          !fileSelected || loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Завантаження..." : "Завантажити"}
      </button>

      {/* Повідомлення */}
      {uploadedUrl && (
        <p className="text-green-600 text-sm">Фото успішно завантажено!</p>
      )}
    </div>
  );
}
