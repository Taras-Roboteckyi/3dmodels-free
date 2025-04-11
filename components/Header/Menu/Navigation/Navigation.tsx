"use client";
import { useState } from "react";
import { MenuItem } from "@mui/material";

type Props = {
  closeMenu: (open: boolean) => void;
};

const Navigation = ({ closeMenu }: Props) => {
  return (
    <>
      {/* Десктопне меню */}
      <div className="hidden tablet:flex space-x-9">
        <MenuItem onClick={() => closeMenu}>Головна</MenuItem>
        <MenuItem onClick={() => closeMenu}>Про нас</MenuItem>
        <MenuItem onClick={() => closeMenu}>Контакти</MenuItem>
      </div>
    </>
  );
};

export default Navigation;
