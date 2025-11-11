"use client";

import { useState } from "react";

export default function UploadModelForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [previewImages, setPreviewImages] = useState<File[]>([]);

  const handlePreviewUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 3); // максимум 3 фото
    setPreviewImages(files);
  };
}
