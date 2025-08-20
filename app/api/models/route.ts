import { NextResponse } from "next/server";
import { connectToDB } from "@lib/database";
import Model3D from "@models/Models3D";

// GET /api/models → отримати всі моделі
export async function GET() {
  try {
    await connectToDB();
    const models = await Model3D.find().populate("userId", "name email image");
    return NextResponse.json(models, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/models → створити нову модель
export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const { userId, title, description, modelUrl, thumbnailUrl, tags } = body;

    if (!userId || !title || !modelUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newModel = await Model3D.create({
      userId,
      title,
      description,
      modelUrl,
      thumbnailUrl,
      tags,
    });

    return NextResponse.json(newModel, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
