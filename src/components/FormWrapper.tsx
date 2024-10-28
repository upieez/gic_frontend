import { Paper, PaperProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  maxWidth: theme.breakpoints.values.sm,
  margin: "0 auto",
  marginTop: theme.spacing(8),
  padding: theme.spacing(2),
}));

export default function FormWithStyle({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormPaper>{children}</FormPaper>;
}
