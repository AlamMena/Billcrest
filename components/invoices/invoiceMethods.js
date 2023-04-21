import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Add } from "@mui/icons-material";
import { updateDiscount } from "../../store/invoiceSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function InvoiceMethods({ setProductPopUp, setPaymentPopUp }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleDiscount = (e) => {
    dispatch(updateDiscount(e));
  };

  return (
    <div className="p-2 pt-4 md:flex-row flex md:justify-between w-full flex-col-reverse ">
      <Button
        startIcon={<Add />}
        className="h-12 font-bold text-xs justify-start items-center "
        size="small"
        onClick={() => setProductPopUp(true)}
      >
        {t("addDetail")}
      </Button>
      <Button
        className="h-12 font-bold text-xs justify-start items-center "
        size="small"
        onClick={() => setPaymentPopUp(true)}
      >
        {t("paymentInfo")}
      </Button>

      <div className=" flex-col md:flex md:flex-row md:space-y-0 md:space-x-2 space-y-2">
        <FormControl className="w-full">
          <InputLabel htmlFor="outlined-adornment-name">
            {t("discount")}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-name"
            label={t("discount")}
            onChange={(e) => handleDiscount(e.target.value)}
            type="number"
            className="rounded-xl"
            variant="outlined"
          />
        </FormControl>
        {/* <FormControl className="w-full">
          <InputLabel htmlFor="outlined-adornment-name">Taxes</InputLabel>
          <OutlinedInput
            disabled
            id="outlined-adornment-name"
            label="Taxes"
            onChange={(e) => dispatch(updateTaxes(e.target.value))}
            type="number"
            className="rounded-xl"
            variant="outlined"
          />
        </FormControl> */}
      </div>
    </div>
  );
}
