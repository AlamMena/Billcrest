import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Add } from "@mui/icons-material";
import { updateDiscount } from "../../store/invoiceSlice";
import { useDispatch } from "react-redux";

export default function InvoiceMethods({ setProductPopUp, setPaymentPopUp }) {
  const dispatch = useDispatch();

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
        Anadir nuevo detalle
      </Button>
      <Button
        className="h-12 font-bold text-xs justify-start items-center "
        size="small"
        onClick={() => setPaymentPopUp(true)}
      >
        Informacion de pago
      </Button>

      <div className=" flex-col md:flex md:flex-row md:space-y-0 md:space-x-2 space-y-2">
        <FormControl className="w-full">
          <InputLabel htmlFor="outlined-adornment-name">Descuento</InputLabel>
          <OutlinedInput
            id="outlined-adornment-name"
            label="Descuento"
            onChange={(e) => handleDiscount(e.target.value)}
            type="number"
            className="rounded-xl"
            variant="outlined"
          />
        </FormControl>
        <FormControl className="w-full">
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
        </FormControl>
      </div>
    </div>
  );
}
