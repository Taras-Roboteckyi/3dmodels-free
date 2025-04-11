"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import DrawerMenu from "./Drawer/DrawerMenu";
import Navigation from "./Navigation/Navigation";

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
        {/* Мобільне меню для Drawer (бічне меню)*/}
        <div className="block desktop:hidden">
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </div>

        {/* Заголовок */}
        <Typography variant="h6">Мій сайт</Typography>

        {/* Десктопне меню навігації*/}
        <Navigation closeMenu={closeMenu} />

        {/* Випадаюче меню (для іконки профілю) */}
        <div className="block desktop:hidden">
          <IconButton onClick={openMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={closeMenu}
          >
            <MenuItem onClick={closeMenu}>Профіль</MenuItem>
            <MenuItem onClick={closeMenu}>Налаштування</MenuItem>
            <MenuItem onClick={closeMenu}>Вихід</MenuItem>
          </Menu>
        </div>
      </Toolbar>

      {/* Drawer (бічне меню) */}
      <DrawerMenu drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </AppBar>
  );
}
