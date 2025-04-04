"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function MenuForHeader() {
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
        {/* Мобільне меню */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer(true)}
          className="lg:hidden"
        >
          <MenuIcon />
        </IconButton>

        {/* Заголовок */}
        <Typography variant="h6">Мій сайт</Typography>

        {/* Десктопне меню */}
        <div className="hidden lg:flex space-x-4">
          <MenuItem onClick={closeMenu}>Головна</MenuItem>
          <MenuItem onClick={closeMenu}>Про нас</MenuItem>
          <MenuItem onClick={closeMenu}>Контакти</MenuItem>
        </div>

        {/* Випадаюче меню (для іконки профілю) */}
        <div>
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
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List className="w-64">
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemText primary="Головна" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemText primary="Про нас" />
          </ListItem>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemText primary="Контакти" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
