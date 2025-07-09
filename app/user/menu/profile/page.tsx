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
    return <div>Завантаження...</div>; // або Loading spinner
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Не вдалося оновити профіль");
      }

      await update(); // 🔁 оновлення session
      alert("Профіль успішно оновлено!");
    } catch (error) {
      console.error("Помилка при оновленні:", error);
      alert("Сталася помилка. Спробуйте ще раз.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Мій профіль</h1>

      <div className="flex items-center gap-2 mb-4">
        <UserAvatar
          image={session.user.image || undefined}
          name={session.user.name || "User"}
          size={48}
        />
        <span>{session.user.name}</span>
        <UploadAvatar />
      </div>

      <EditProfileForm
        initialData={{
          name: session.user.name || "",
          surname: session.user.surname || "",
          description: session.user.description || "",
          avatarUrl: session.user.image || "",
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
