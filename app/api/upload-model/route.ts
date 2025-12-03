import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@utils/auth-options";
import { connectToDB } from "@lib/database";
import Model3D from "@models/Models3D";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function uploadToCloudinary(file: File, options: Record<string, any>) {
  const arrayBuffer = await file.arrayBuffer(); //бере файл як "сирі байти"
  const buffer = Buffer.from(arrayBuffer); //перетворює його у Node.js формат

  return await new Promise((resolve, reject) => {
    //завантажує цей buffer у Cloudinary
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stream.end(buffer);
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const modelFile = formData.get("model") as File;

  const previewFiles: File[] = [];
  for (let i = 0; i < 3; i++) {
    const file = formData.get(`preview_${i}`);
    if (file instanceof File) previewFiles.push(file);
  }

  // Upload model file (STL/STEP/ZIP etc)
  const modelUpload = await uploadToCloudinary(modelFile, {
    folder: "models",
    resource_type: "raw",
  });

  // Upload preview images
  const previewUrls: string[] = [];
  for (const img of previewFiles) {
    const upload = await uploadToCloudinary(img, {
      folder: "model-previews",
      resource_type: "image",
    });
    previewUrls.push((upload as any).secure_url);
  }

  const newModel = await Model3D.create({
    userId: session.user.id,
    title,
    description,
    modelUrl: (modelUpload as any).secure_url,
    previewImages: previewUrls,
    thumbnailUrl: previewUrls[0], // 🔥 перше фото — превʼю
  });

  return NextResponse.json(newModel, { status: 201 });
}
