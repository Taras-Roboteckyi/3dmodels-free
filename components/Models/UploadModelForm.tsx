"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function UploadModelForm() {
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [previewImages, setPreviewImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleModelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setModelFile(file);
  };

  const handlePreviewUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from((e.target as HTMLInputElement).files ?? []).slice(
      0,
      3
    ); // максимум 3 фото
    setPreviewImages(files);
  };

  const handleSubmit = async () => {
    if (!modelFile || previewImages.length < 1) {
      toast.error("Додай модель і хоча б одне прев’ю!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("model", modelFile);

      previewImages.forEach((file, i) => {
        formData.append(`preview_${i}`, file);
      });

      const res = await fetch("/api/upload-model", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Помилка завантаження моделі");
      }

      const data = await res.json();
      console.log("✅ Uploaded model:", data);

      toast.success("Модель успішно завантажена!");
      setModelFile(null);
      setPreviewImages([]);
      setTitle("");
      setDescription("");
    } catch (err: any) {
      console.error(err);
      toast.error("Помилка при завантаженні!");
    } finally {
      setLoading(false);
    }
  };
}
