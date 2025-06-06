import UserAvatar from "@components/UserAvatar";
import React from "react";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Мій профіль</h1>
      <UserAvatar />
      {/* Тут контент профілю */}
    </div>
  );
}
