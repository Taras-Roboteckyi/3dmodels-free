"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { Link } from "@mui/material";

export default function AuthNav() {
  const { data: session } = useSession();
  return session ? (
    <div className="flex items-center gap-4">
      <p>Hello {session.user?.name}</p>
      <Link
        href="#"
        underline="hover"
        onClick={() => signOut({ callbackUrl: "/" })} //щоб користувач залишався на тій же сторінці після виходу додаєм callbackUrl.
      >
        Вийти
      </Link>
    </div>
  ) : (
    <div className=" bg-white">
      <Link
        href="#"
        underline="hover"
        className="text-white"
        onClick={() => signIn("google", { callbackUrl: "/" })} //щоб користувач залишався на тій же сторінці після входу додаєм callbackUrl.
      >
        Sign in with Google
      </Link>
    </div>
  );
}
