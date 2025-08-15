import Header from "@components/Header/Header";
import UploadsPage from "@components/Uploads/UploadsPage";
import React from "react";

export default function uploadsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Мої завантаження</h1>
      <UploadsPage />
    </div>
  );
}
