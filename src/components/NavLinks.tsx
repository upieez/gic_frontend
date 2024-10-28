import { Link, LinkOptions } from "@tanstack/react-router";
import { Typography } from "@mui/material";

interface NavLinksProps {
  children: React.ReactNode;
  options: LinkOptions;
}

export default function NavLinks({ children, options }: NavLinksProps) {
  return (
    <Typography variant="h6" component="span">
      <Link
        {...options}
        style={{ textDecoration: "none", color: "lightgray" }}
        activeProps={{
          style: {
            fontWeight: "bold",
            color: "black",
          },
        }}
      >
        {children}
      </Link>
    </Typography>
  );
}
