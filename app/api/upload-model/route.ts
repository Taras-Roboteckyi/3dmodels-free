import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@utils/auth-options";
import { connectToDB } from "@lib/database";
import Model3D from "@models/Models3D";
import cloudinary from "@lib/cloudinary";

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

  // Upload model ZIP
  const modelUpload = await cloudinary.uploader.upload(await modelFile.stream(), {
    resource_type: "raw",
    folder: "models",
  });

  // Upload preview images
  const previewUrls = [];
  for (const img of previewFiles) {
    const upload = await cloudinary.uploader.upload(await img.stream(), {
      resource_type: "image",
      folder: "model-previews",
    });
    previewUrls.push(upload.secure_url);
  }

  const newModel = await Model3D.create({
    userId: session.user.id,
    title,
    description,
    modelUrl: modelUpload.secure_url,
    previewImages: previewUrls,
  });

  return NextResponse.json(newModel, { status: 201 });
}
