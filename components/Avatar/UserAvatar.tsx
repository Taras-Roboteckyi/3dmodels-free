"use client";

import Image from "next/image";

type UserAvatarProps = {
  image?: string | null;
  name?: string | " ";
  size?: number;
  styleClass?: string;
};

export default function UserAvatar({
  image,
  name = "User",
  size = 40,
  styleClass = "",
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
      className={`object-cover ${styleClass}`}
    />
  );
}
