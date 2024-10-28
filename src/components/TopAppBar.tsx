import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { cafesLinkOptions, employeesLinkOptions } from "../utils";
import NavLinks from "./NavLinks";

export default function TopAppBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <NavLinks options={cafesLinkOptions}>Cafes</NavLinks>
        <NavLinks options={employeesLinkOptions}>Employees</NavLinks>
      </Toolbar>
    </AppBar>
  );
}
