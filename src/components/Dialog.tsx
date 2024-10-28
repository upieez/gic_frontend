import {
  Button,
  ButtonOwnProps,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog as MuiDialog,
} from "@mui/material";

interface DialogProps {
  open: boolean;
  title: string;
  content: string;
  color?: ButtonOwnProps["color"];
  handleCancel: () => void;
  handleAccept: () => void;
}

export default function Dialog({
  open,
  title,
  content,
  color = "primary",
  handleCancel,
  handleAccept,
}: DialogProps) {
  return (
    <MuiDialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          variant="contained"
          color={color}
          onClick={handleAccept}
          autoFocus
        >
          Okay
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}
