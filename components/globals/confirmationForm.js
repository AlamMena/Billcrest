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
        style: { borderRadius: 15, width: "490px", padding: "10px" },
      }}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>
        <Typography variant="h5">Eliminar</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>Estas seguro que quieres eliminar?</Typography>
      </DialogContent>
      <DialogActions>
        <div className="flex space-x-3 justify-end w-full">
          <Button
            onClick={() => onConfirm()}
            type="submit"
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>

          <Button
            color="inherit"
            className=" border-gray-300"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
