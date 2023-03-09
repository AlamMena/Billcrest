import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";

export default function ConfirmationForm({
  onConfirm,
  open,
  setOpen,
  message,
}) {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: { borderRadius: 15 },
      }}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>
        <Typography variant="h6">Confirmar procedimiento</Typography>
      </DialogTitle>
      <DialogContent dividers={true}>
        <div className=" text-md tracking-wide  p-2 mr-5">
          <Typography variant="h5">{message}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="flex space-x-4 justify-end w-full">
          <Button
            onClick={() => onConfirm()}
            type="submit"
            color="primary"
            variant="contained"
          >
            Confirmar
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
