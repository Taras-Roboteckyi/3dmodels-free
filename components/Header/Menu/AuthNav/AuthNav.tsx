"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { Link, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import ProfileMenu from "../ProfileMenu/ProfileMenu";

type Props = {
  menuAnchor: null | HTMLElement;
  closeMenu: () => void;
  openMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function AuthNav({ menuAnchor, openMenu, closeMenu }: Props) {
  const { data: session } = useSession();

  const name = session?.user?.name?.split(" ")[0] ?? "User"; //Якщо користувач є, тоді показуємо тільки перше слово (ім'я) користувача

  return session ? (
    <div className="flex items-center gap-4">
      <p>Hello {name}</p>
      {/* <Link
        href="#"
        underline="hover"
        onClick={() => signOut({ callbackUrl: "/" })} //щоб користувач залишався на тій же сторінці після виходу додаєм callbackUrl.
      >
        Вийти
      </Link> */}

      {/* Випадаюче меню (для іконки профілю) */}

      <IconButton onClick={openMenu} color="inherit">
        {/* Кнопка - перемикач для випадаючого меню*/}
        <MenuIcon />
      </IconButton>

      {/*  Випадаюче меню профілю */}
      <ProfileMenu
        menuAnchor={menuAnchor}
        closeMenu={closeMenu}
        signOut={() => signOut({ callbackUrl: "/" })} //Щоб користувач залишався на тій же сторінці після виходу додаєм callbackUrl
      />
    </div>
  ) : (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/" })} //щоб користувач залишався на тій же сторінці після входу додаєм callbackUrl.
      variant="contained"
      sx={{
        backgroundColor: "inherit",
        textTransform: "none",
        fontWeight: 500,
        fontSize: "16px",
        padding: "6px 12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        "&:hover": {
          backgroundColor: "#357ae8",
        },
      }}
    >
      <Image
        src="/images/icon-google-symbol.png"
        width={20}
        height={20}
        alt="Google icon"
      />
      Sign in
    </Button>
  );
}
