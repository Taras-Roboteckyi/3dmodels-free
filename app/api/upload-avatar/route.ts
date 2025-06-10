import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file") as File; //Отримуємо файл із форми (multipart/form-data). Очікуємо, що він буде в полі file

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes); //Читаємо файл як ArrayBuffer і перетворюємо на Node.js Buffer — необхідний формат для upload_stream()

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "user_avatars" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(buffer); //Завантажуємо файл у Cloudinary в папку user_avatars. upload_stream() — створює потік, в який передаємо buffer
    });

    return NextResponse.json(result); //Повертаємо клієнту результат — URL до зображення, публічне ім’я, розмір, формат тощо
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
