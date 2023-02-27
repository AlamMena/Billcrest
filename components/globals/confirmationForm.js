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
        <Typography variant="h6"> Confirmar procedimiento</Typography>
      </DialogTitle>
      <DialogContent dividers={true}>
        <div className=" text-md tracking-wide  p-2 mr-5">
          <h2>{message}</h2>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="flex space-x-4 justify-end w-full">
          <Button color="error" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onConfirm()} type="submit" color="success">
            Confirmar
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
