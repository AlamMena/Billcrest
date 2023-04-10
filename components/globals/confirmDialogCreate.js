import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";

export default function ConfirmDialogCreate({ onConfirm, open, setOpen }) {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: { borderRadius: 15, width: "490px", padding: "10px" },
      }}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>
        <Typography variant="h5">Crear Factura</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>Estas seguro que quieres crear la factura?</Typography>
      </DialogContent>
      <DialogActions>
        <div className="flex space-x-3 justify-end w-full">
          <Button
            onClick={() => onConfirm()}
            type="submit"
            color="primary"
            variant="contained"
          >
            Confirmar
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
