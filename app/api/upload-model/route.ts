import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@utils/auth-options";
import { connectToDB } from "@lib/database";
import Model3D from "@models/Models3D";
import { v2 as cloudinary } from "cloudinary";

// 🔹 Конфігурація Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    // 🔑 Перевірка сесії користувача
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔗 Підключення до бази
    await connectToDB();

    // 🧾 Отримуємо FormData
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 📤 Завантаження файлу у Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto", // підтримує GLB/GLTF/STL/OBJ
            folder: "models",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });
    // 💾 Зберігаємо у MongoDB
    const newModel = await Model3D.create({
      userId: session.user.id,
      title,
      description,
      modelUrl: uploadResponse.secure_url,
      thumbnailUrl: uploadResponse.secure_url, // можна додати прев’ю пізніше
    });

    return NextResponse.json(newModel, { status: 201 });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
