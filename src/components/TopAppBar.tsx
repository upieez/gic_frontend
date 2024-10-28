import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";

export default function TopAppBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" component="div">
          <Link to="/cafes">Cafes</Link>
        </Typography>
        <Typography variant="h6" component="div">
          <Link to="/employees">Employees</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
