import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ConfirmationForm({
  onConfirm,
  open,
  setOpen,
  message,
}) {
  const {t} = useTranslation()
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: { borderRadius: 15, width: "490px", padding: "10px" },
      }}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>
        <Typography variant="h5">{t('delete')}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>{t("delete?")}</Typography>
      </DialogContent>
      <DialogActions>
        <div className="flex space-x-3 justify-end w-full">
          <Button
            onClick={() => onConfirm()}
            type="submit"
            color="error"
            variant="contained"
          >
            {t("delete")}
          </Button>

          <Button
            color="inherit"
            className=" border-gray-300"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            {t("cancel")}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
