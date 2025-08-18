import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDB } from "@lib/database";
/* import Download from "@/models/Download";
import Model from "@/models/Model"; */

export async function POST(req: Request) {
  await connectToDB();
  const session = await getServerSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { modelId } = await req.json();
  if (!modelId)
    return NextResponse.json(
      { error: "Model ID is required" },
      { status: 400 }
    );

  try {
    // зберігаємо факт завантаження
    const download = await Download.create({
      user: session.user.id,
      model: modelId,
    });

    // інкрементуємо кількість завантажень у моделі
    await Model.findByIdAndUpdate(modelId, { $inc: { downloads: 1 } });

    return NextResponse.json({ success: true, download });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to record download" },
      { status: 500 }
    );
  }
}
