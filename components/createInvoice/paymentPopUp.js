import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useState, useEffect } from "react";
import { updatePayment } from "../../store/invoiceSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useAxios from "../../axios/index";
import { useTranslation } from "react-i18next";

export default function PaymentPopUp({ open, setPaymentPopUp }) {
  const invoice = useSelector((state) => state.invoice);
  const { paymentQuantity, payments, total } = invoice;
  const { axiosInstance } = useAxios();
  const { t } = useTranslation();
  const [method, setMethod] = useState(1);
  const [pquantity, setPaymentQuantity] = useState();
  const dispatch = useDispatch();
  const [paymentType, setPaymentTypes] = useState([]);

  const handleMethod = (id) => {
    setMethod(id);
    // dispatch(updateStatus(value));
  };

  const upsertPaymentMethod = () => {
    let obj = { method, pquantity };
    dispatch(updatePayment(obj));
    setPaymentPopUp(false);
  };

  const getPaymentTypes = async () => {
    const { data: apiResponse } = await axiosInstance.get(`/payment/types`);
    setPaymentTypes(apiResponse);
    // alert(JSON.stringify(apiResponse));
  };

  useEffect(() => {
    getPaymentTypes();
  }, []);

  return (
    <>
      <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
        <DialogTitle>{t("paymentInfo")}</DialogTitle>
        <DialogContent dividers={true}>
          <FormControl className="flex space-y-3 md:space-y-0  md:flex-row items-center md:space-x-2">
            <FormControl className="w-full">
              <InputLabel size="normal" htmlFor="outlined-adornment-name">
                {t("paymentMethod")}
              </InputLabel>
              <Select
                id="outlined-adornment-name"
                label={t("paymentMethod")}
                size="normal"
                type="number"
                value={method}
                className="rounded-xl"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">
                    {/* <AttachMoney /> */}
                  </InputAdornment>
                }
              >
                {paymentType.length > 0 &&
                  paymentType.map((item) => {
                    return (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        onClick={() => handleMethod(item.id)}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
                {/* <MenuItem value={"debit"} onClick={() => handleMethod("debit")}>
                  Tarjeta Debito
                </MenuItem>
                <MenuItem
                  value={"credit"}
                  onClick={() => handleMethod("credit")}
                >
                  Tarjeta Credito
                </MenuItem>
                <MenuItem value={"cash"} onClick={() => handleMethod("cash")}>
                  Efectivo
                </MenuItem> */}
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <InputLabel size="normal" htmlFor="outlined-adornment-name">
                {t("paymentQuantity")}
              </InputLabel>
              <OutlinedInput
                type="number"
                id="outlined-adornment-name"
                onChange={(e) => setPaymentQuantity(e.target.value)}
                label={t("paymentQuantity")}
                size="large"
                value={pquantity}
                className="rounded-xl"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">
                    {/* <AttachMoney /> */}
                  </InputAdornment>
                }
              />
            </FormControl>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setPaymentPopUp(false)}>Cerrar</Button> */}
          <Button onClick={() => upsertPaymentMethod()}>{t("confirm")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
