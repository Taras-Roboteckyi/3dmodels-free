import { NextResponse } from "next/server";
import { connectToDB } from "@lib/database";
import Model3D from "@models/Models3D";

// GET /api/models/:id → отримати одну модель
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const model = await Model3D.findById(params.id).populate(
      "userId",
      "name email image"
    );

    if (!model) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    return NextResponse.json(model, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
