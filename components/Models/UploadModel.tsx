"use client";

import { useState } from "react";

export default function UploadModel() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    const res = await fetch("/api/upload-model", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Uploaded:", data);
  };
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <input
        type="file"
        accept=".glb,.gltf,.obj,.stl" // Дозволені формати файлів завантаження .glb/.gltf/.obj/.stl        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <input
        type="text"
        placeholder="Назва"
        className="block mt-2 p-2 text-black"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Опис"
        className="block mt-2 p-2 text-black"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handleUpload}
        className="mt-3 px-4 py-2 bg-blue-500 rounded text-white"
      >
        Завантажити
      </button>
    </div>
  );
}
