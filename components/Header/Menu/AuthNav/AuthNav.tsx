"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { Link, IconButton } from "@mui/material";
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
    <div className=" bg-white">
      <Image
        src="/images/icon-google-symbol.png"
        width={40}
        height={40}
        alt="Google icon"
      />
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
