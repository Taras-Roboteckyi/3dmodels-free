"use client";

import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

import UploadAvatar from "@components/Avatar/UploadAvatar";
import EditProfileForm from "@components/EditProfileForm/EditProfileForm";
import UserAvatar from "@components/Avatar/UserAvatar";
import { authOptions } from "../../../../utils/auth-options";

export default function ProfilePage() {
  const { data: session, update } = useSession(); // для оновлення session
  //const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Loading...</div>; // або Loading spinner
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json(); // ⬅️
      console.log("🔄 Response:", data); // ⬅️

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      await update(); // 🔁 оновлення session
      alert("Profile successfully updated!");
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold ">Мій профіль</h1>

      <div className=" tablet:flex  items-center mt-6">
        <div className=" tablet:flex items-center gap-2 ">
          <div className="relative w-100 h-60 rounded-3 overflow-hidden mb-5 tablet:w-80 tablet:h-80 tablet:mb-0">
            <UserAvatar
              image={session.user.image || undefined}
              name={session.user.name || "User"}
              fill
            />
          </div>

          {/* <span>{session.user.name}</span> */}

          <UploadAvatar />
        </div>

        <EditProfileForm
          initialData={{
            name: session.user.name || "",
            surname: session.user.surname || "",
            description: session.user.description || "",
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
