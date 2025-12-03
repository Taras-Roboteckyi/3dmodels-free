"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ModelViewer from "@/components/Models/ModelViewer";

interface Model3D {
  _id: string;
  title: string;
  description?: string;
  modelUrl: string;
  previewImages: string[];
  thumbnailUrl: string;
  createdAt: string;
  userId: {
    name: string;
    email: string;
    image: string;
  };
}
