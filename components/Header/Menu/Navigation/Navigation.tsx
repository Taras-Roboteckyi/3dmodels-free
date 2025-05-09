"use client";
import { useState } from "react";
import { MenuItem } from "@mui/material";

type Props = {
  closeMenu: (open: boolean) => void;
};

const hoverStyle = {
  "&:hover": {
    backgroundColor: "#357ae8",
    borderRadius: "2px",
  },
};
const Navigation = ({ closeMenu }: Props) => {
  return (
    <>
      {/* Десктопне меню */}
      <div className="hidden tablet:flex space-x-9">
        <MenuItem onClick={() => closeMenu} sx={hoverStyle}>
          Головна
        </MenuItem>
        <MenuItem onClick={() => closeMenu} sx={hoverStyle}>
          Про нас
        </MenuItem>
        <MenuItem onClick={() => closeMenu} sx={hoverStyle}>
          Контакти
        </MenuItem>
      </div>
    </>
  );
};

export default Navigation;
