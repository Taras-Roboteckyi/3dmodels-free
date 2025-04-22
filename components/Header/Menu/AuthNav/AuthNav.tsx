import React from "react";

import { Link } from "@mui/material";

export default function AuthNav() {
  return (
    <div>
      <Link href="#" underline="hover">
        {"Ввійти"}
      </Link>
      <Link href="#" underline="hover">
        {"Реєстрація"}
      </Link>
    </div>
  );
}
