import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@utils/auth-options";
import { connectToDB } from "@lib/database";
import Model3D from "@models/Models3D";

// GET /api/models → отримати всі моделі
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDB();
    const models = await Model3D.find({ userId: session.user.id }).sort({
      createdAt: -1, // Сортуємо, щоб нові моделі йшли першими;
    });

    return new Response(JSON.stringify(models), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch models" }), {
      status: 500,
    });
  }
}

/* export async function GET() {
  try {
    await connectToDB();
    const models = await Model3D.find().populate("userId", "name email image");
    return NextResponse.json(models, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} */

// POST /api/models → створити нову модель
/* export async function POST(req: Request) {
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
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDB();
    const body = await req.json();

    if (!body.modelUrl) {
      return Response.json({ error: "Model URL is required" }, { status: 400 });
    }

    const newModel = await Model3D.create({
      userId: session.user.id, // 🔑 прив’язка до користувача
      title: body.title || "Untitled Model",
      description: body.description || "",
      modelUrl: body.modelUrl,
      thumbnailUrl: body.thumbnailUrl || "",
      tags: body.tags || [],
    });

    return new Response(JSON.stringify(newModel), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to create model" }), {
      status: 500,
    });
  }
}
