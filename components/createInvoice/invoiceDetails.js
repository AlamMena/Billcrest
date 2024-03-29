import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeItem,
  calculateTotal,
  calculateSubTotal,
  updateItemPrice,
  updateItemQuantity,
} from "../../store/invoiceSlice";
import { useTranslation } from "react-i18next";

export default function InvoiceDetail() {
  const { t } = useTranslation();
  const { details, discountAmount, taxesAmount, subTotal } = useSelector(
    (state) => state.invoice
  );
  const dispatch = useDispatch();

  const handlePrice = (obj) => {
    dispatch(updateItemPrice(obj));
  };

  const handleQuantity = (obj) => {
    dispatch(updateItemQuantity(obj));
  };

  useEffect(() => {
    dispatch(calculateSubTotal());
  }, [details]);
  useEffect(() => {
    dispatch(calculateTotal());
  }, [taxesAmount, discountAmount, subTotal]);

  return (
    <>
      {details.map((item) => {
        return (
          <div key={item._id} className="py-2 odd:bg-neutral-100 rounded-lg">
            {/* Inputs */}
            <Grid container spacing={1} className="flex p-2">
              {/* Articulo */}
              <Grid item xs={12} md={3}>
                {" "}
                <FormControl className="w-full">
                  <InputLabel htmlFor="outlined-adornment-name">
                    {t("article")}
                  </InputLabel>
                  <OutlinedInput
                    label={t("article")}
                    id="outlined-adornment-name"
                    disabled
                    defaultValue={item.name}
                    className="rounded-xl"
                    variant="outlined"
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              {/* Descripcion */}
              <Grid item xs={12} md={4}>
                <FormControl className="w-full">
                  <InputLabel htmlFor="outlined-adornment-name">
                    {t("description")}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    label={t("description")}
                    disabled
                    defaultValue={item.description}
                    className="rounded-xl"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>

              {/* Cantidad */}
              <Grid item xs={12} md={1}>
                {" "}
                <FormControl className="w-full">
                  <InputLabel htmlFor="outlined-adornment-name">
                    {t("quantity")}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    label={t("quantity")}
                    type="number"
                    onChange={(e) =>
                      handleQuantity({
                        quantity: e.target.value,
                        id: item.productId,
                      })
                    }
                    value={item.quantity}
                    className="rounded-xl"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              {/* Precio */}
              <Grid item xs={12} md={2}>
                {" "}
                <FormControl className="w-full">
                  <InputLabel htmlFor="outlined-adornment-name">
                    {t("price")}
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    label={t("price")}
                    type="number"
                    onChange={(e) =>
                      handlePrice({
                        value: e.target.value,
                        id: item.productId,
                      })
                    }
                    value={item.price}
                    className="rounded-xl"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              {/* Total */}
              <Grid item xs={12} md={1}>
                <FormControl className="w-full">
                  <InputLabel htmlFor="outlined-adornment-name">
                    Total
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    label="Total"
                    type="number"
                    disabled
                    value={item.total}
                    className="rounded-xl"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>
                <IconButton
                  className=" text-red-600 hover:bg-red-100"
                  onClick={() => {
                    dispatch(removeItem(item.productId));
                  }}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
            {/* Delete Icon */}
            {/* <div className="flex justify-end py-5">
              <Button
                startIcon={<Delete />}
                size="small"
                className=" text-red-600 hover:bg-red-100"
                onClick={() => {
                  dispatch(removeItem(item._id));
                }}
              >
                Eliminar
              </Button>
            </div> */}
            {/* <Divider
              orientation="horizontal"
              variant="middle"
              flexItem
            ></Divider> */}
          </div>
        );
      })}
    </>
  );
}
