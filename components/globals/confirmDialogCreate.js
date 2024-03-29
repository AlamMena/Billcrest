import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ConfirmDialogCreate({ onConfirm, open, setOpen }) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: { borderRadius: 15, width: "490px", padding: "10px" },
      }}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>
        <Typography variant="h5">{t("createInvoice")}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>{t("createInvoice?")}</Typography>
      </DialogContent>
      <DialogActions>
        <div className="flex space-x-3 justify-end w-full">
          <Button
            onClick={() => onConfirm()}
            type="submit"
            color="primary"
            variant="contained"
          >
            {t("confirm")}
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
