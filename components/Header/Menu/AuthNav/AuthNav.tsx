"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { Link } from "@mui/material";

export default function AuthNav() {
  const { data: session } = useSession();
  return session ? (
    <div className="flex items-center gap-4">
      <p>Hello {session.user?.name}</p>
    </div>
  ) : (
    <div></div>
  );
}
