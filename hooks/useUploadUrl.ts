"use client";

import { useState } from "react";

type UseUploadUrlProps = {
  uploadEndpoint?: string;
  onSuccess?: (url: string) => void;
  onError?: (err: unknown) => void;
};

type UploadResponse = {
  secure_url: string;
  [key: string]: any; // додаткові поля, якщо є
};

export function useUploadUrl({
  uploadEndpoint = "/api/upload-avatar",
  onSuccess,
  onError,
}: UseUploadUrlProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected)); // створюємо попередній перегляд зображення
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });

      const data: UploadResponse = await res.json();

      if (!res.ok || !data.secure_url) {
        throw new Error("Upload failed");
      }

      onSuccess?.(data.secure_url);
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload error:", err);
      onError?.(err);
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
