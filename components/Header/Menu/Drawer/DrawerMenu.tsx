"use client";

import { Drawer, List, ListItem, ListItemText } from "@mui/material";

type Props = {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => void;
};

export default function DrawerMenu({ drawerOpen, toggleDrawer }: Props) {
  return (
    <>
      {/* Drawer (бічне меню) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <List className="w-64">
          <ListItem component="button" onClick={() => toggleDrawer(false)}>
            <ListItemText primary="Головна" />
          </ListItem>
          <ListItem component="button" onClick={() => toggleDrawer(false)}>
            <ListItemText primary="Про нас" />
          </ListItem>
          <ListItem component="button" onClick={() => toggleDrawer(false)}>
            <ListItemText primary="Контакти" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
