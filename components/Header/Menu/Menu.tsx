"use client";
import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import DrawerMenu from "./DrawerMenu/DrawerMenu";
import Navigation from "./Navigation/Navigation";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import AuthNav from "./AuthNav/AuthNav";

export default function MenuHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between">
        {/* Кнопка - перемикач для Drawer (бічне меню)*/}
        <div className="block tablet:hidden">
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </div>

        {/* Заголовок */}
        <Typography variant="h6">Мій сайт</Typography>

        {/* Меню навігації*/}
        <Navigation closeMenu={closeMenu} />

        {/* Випадаюче меню (для іконки профілю) */}
        <div className="block desktop:hidden">
          {/* Кнопка - перемикач для Випадаючого меню*/}
          <IconButton onClick={openMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <AuthNav />
          {/*  Випадаюче меню профілю */}
          <ProfileMenu menuAnchor={menuAnchor} closeMenu={closeMenu} />
        </div>
      </Toolbar>

      {/* Drawer (бічне меню) */}
      <DrawerMenu drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </AppBar>
  );
}
