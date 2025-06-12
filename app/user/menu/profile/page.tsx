import UserAvatar from "@components/Avatar/UserAvatar";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Мій профіль</h1>
      <div className="flex items-center gap-2">
        <UserAvatar
          image={session?.user?.image || undefined}
          name={session?.user?.name || "User"}
          size={48}
        />
        <span>{session?.user?.name}</span>
      </div>
      {/* Тут контент профілю */}
    </div>
  );
}
