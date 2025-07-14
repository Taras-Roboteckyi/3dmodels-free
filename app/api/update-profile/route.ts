import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@utils/auth-options";
import { connectToDB } from "@lib/database";
import { User } from "@models/User";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const description = formData.get("description") as string;

    await connectToDB();

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { name, surname, description },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "✅ Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Update profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
