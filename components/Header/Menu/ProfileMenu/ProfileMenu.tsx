"use client";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";

type Props = {
  menuAnchor: null | HTMLElement;
  closeMenu: () => void;
};

const ProfileMenu = ({ menuAnchor, closeMenu }: Props) => {
  return (
    <>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Профіль</MenuItem>
        <MenuItem onClick={closeMenu}>Налаштування</MenuItem>
        <MenuItem onClick={closeMenu}>Вихід</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
