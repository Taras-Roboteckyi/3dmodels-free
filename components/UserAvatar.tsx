"use client";

import Image from "next/image";

type UserAvatarProps = {
  image?: string | null;
  name?: string | " ";
  size?: number; // опціональний розмір (default = 40)
};

export default function UserAvatar({
  image,
  name = "User",
  size = 40,
}: UserAvatarProps) {
  // Якщо не передано зображення, генеруємо аватарку за допомогою UI Avatars

  const uiAvatars = "https://ui-avatars.com/api/?name=";

  const placeholder = `${uiAvatars}${encodeURIComponent(
    name
  )}&background=random&color=fff`;

  return (
    <Image
      src={image || placeholder}
      alt={name}
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  );
}
