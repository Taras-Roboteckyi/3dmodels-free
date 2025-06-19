import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@utils/auth-options";
import { User } from "@models/User";
import { connectToDB } from "@lib/database";

// Оновлює поле image користувача в базі.

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { image } = await req.json();
  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  try {
    console.log("Пробую підключитися до бази...");
    await connectToDB();
    console.log("Підключення до бази успішне ✅");

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { image: image },
      { new: true }
    );
    if (!updatedUser) {
      console.log("⚠️ Користувача не знайдено");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("✅ Аватар оновлено:", updatedUser.image);
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json(
      { error: "Failed to update avatar" },
      { status: 500 }
    );
  }
}
