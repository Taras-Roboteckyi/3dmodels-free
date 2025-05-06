/* "use client"; */
/* import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";

type Props = {
  menuAnchor: null | HTMLElement;
  closeMenu: () => void;
  signOut: () => void;
};

const ProfileMenu = ({ menuAnchor, closeMenu, signOut }: Props) => {
  return (
    <>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Профіль</MenuItem>
        <MenuItem onClick={closeMenu}>Налаштування</MenuItem>
        <MenuItem onClick={signOut}>Вихід</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu; */

"use client";

import { useRouter } from "next/navigation";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Switch,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

type Props = {
  menuAnchor: null | HTMLElement;
  closeMenu: () => void;
  signOut: () => void;
};

// Загальний стиль для пунктів меню
const menuItemStyle = {
  "&:hover": {
    backgroundColor: "#68c568",
  },
};

const logoutItemStyle = {
  "&:hover": {
    backgroundColor: "#ffe5e5", // інший колір для виходу
  },
};

const ProfileMenu = ({ menuAnchor, closeMenu, signOut }: Props) => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false); // Це можна буде пов'язати з контекстом теми

  const handleNavigate = (path: string) => {
    closeMenu();
    router.push(path);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    // TODO: інтегрувати з реальним перемикачем теми (наприклад через context або localStorage)
  };

  return (
    <Menu
      anchorEl={menuAnchor}
      open={Boolean(menuAnchor)}
      onClose={closeMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={() => handleNavigate("/profile")} sx={menuItemStyle}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        Мій профіль
      </MenuItem>

      <MenuItem onClick={() => handleNavigate("/uploads")} sx={menuItemStyle}>
        <ListItemIcon>
          <CloudUploadIcon fontSize="small" />
        </ListItemIcon>
        Завантаження
      </MenuItem>

      <MenuItem onClick={() => handleNavigate("/models")} sx={menuItemStyle}>
        <ListItemIcon>
          <ViewInArIcon fontSize="small" />
        </ListItemIcon>
        Мої моделі
      </MenuItem>

      <MenuItem onClick={toggleTheme} sx={menuItemStyle}>
        <ListItemIcon>
          <Brightness4Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Змінити тему</ListItemText>
        <Switch checked={darkMode} />
      </MenuItem>

      <Divider />

      <MenuItem
        onClick={() => {
          closeMenu();
          signOut();
        }}
        sx={logoutItemStyle}
      >
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Вийти
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
