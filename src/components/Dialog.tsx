import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog as MuiDialog,
} from "@mui/material";

interface DialogProps {
  open: boolean;
  handleCancel: () => void;
  handleAccept: () => void;
}

export default function Dialog({
  open,
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
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to navigate away?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have some unsaved changes
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleAccept} autoFocus>
          Okay
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}
