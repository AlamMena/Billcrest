import React from "react";
import PageHeader from "../../components/globals/pageHeader";
import { Button, Card, Divider, Grid } from "@mui/material";
import { useState } from "react";
import { Edit, SellOutlined } from "@mui/icons-material";
import InvoiceDetail from "../../components/createInvoice/invoiceDetails";
import { toast } from "react-toastify";
import useAxios from "../../axios/index";
import {
  InvoiceRecipient,
  InvoiceBeneficiary,
} from "../../components/createInvoice/invoiceContact";
import SelectPopUp from "../../components/createInvoice/selectPopUp";
import { useDispatch } from "react-redux";
import { resetState } from "../../store/invoiceSlice";
import { useSelector } from "react-redux";
import SelectProducts from "../../components/createInvoice/selectProducts";
import ConfirmationForm from "../../components/globals/confirmationForm";
import Router from "next/router";
import PaymentPopUp from "../../components/createInvoice/paymentPopUp";
import InvoiceTotals from "../../components/invoices/invoiceTotals";
import InvoiceInputs from "../../components/invoices/invoiceInputs";
import InvoiceMethods from "../../components/invoices/invoiceMethods";

export default function CreateInvoice() {
  const [openSelect, setOpenSelect] = useState(false);
  const [openProductPop, setProductPopUp] = useState(false);
  const [paymentPopUpOpen, setPaymentPopUp] = useState(false);
  const [type, setType] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const invoice = useSelector((state) => state.invoice);
  const {
    total,
    details,
    recipient,
    typeId,
    ncfTypeId,
    warehouseId,
    payments,
  } = invoice;

  const { axiosInstance } = useAxios();
  const dispatch = useDispatch();
  const router = Router;

  // handles

  const handleInvoiceError = (error) => {
    console.log(error);
    if (
      error.response.data.status === 400 &&
      error.response.data.message ===
        "The client does not have permission to this type of invoice"
    ) {
      setConfirmOpen(false);
      return "Este cliente no tiene permiso a este tipo de factura";
    }
    return "Oops, algo ha ocurrido";
  };

  // Location Routes

  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Facturas",
      link: "/facturas",
    },
    {
      text: "Nueva Factura",
      link: "/facturas/crearfactura",
    },
    // {
    //   text: "Nueva factura de recepcion de mercancia",
    //   link: "/facturas/crearfacturamercancia",
    // },
  ];

  const upserAsyncInvoice = async () => {
    try {
      if (
        Object.keys(recipient) <= 0 ||
        details.length <= 0 ||
        ncfTypeId === 0 ||
        warehouseId === 0 ||
        typeId === 0 ||
        payments[0].amount < total ||
        payments[0].amount === undefined
      ) {
        if (Object.keys(recipient) <= 0) {
          toast.error(`Porfavor agrega un recipiente`);
        }
        if (ncfTypeId === 0) {
          toast.error(`Porfavor agrega el tipo de NCF`);
        }
        if (typeId === 0) {
          toast.error(`Porfavor agrega el tipo de factura`);
        }
        if (warehouseId === 0) {
          toast.error(`Porfavor agrega el almacen`);
        }
        if (details.length <= 0) {
          toast.error(`Porfavor agrega al menos un detalle`);
        }
        if (payments[0].amount < total || payments[0].amount === undefined) {
          toast.error(
            `El monto a pagar tiene que ser igual o mayor al precio a pagar`
          );
        }
      } else {
        // console.log(invoice);
        if (invoice.id !== undefined) {
          // logic
          // if the item exists
          await toast.promise(axiosInstance.put("/invoice", invoice), {
            pending: "Creando factura",
            success: "Genial!, tu factura ha sido actualizada.",
            error: {
              render({ data }) {
                return handleInvoiceError(data);
              },
            },
          });
          router.push("/facturas");
        } else {
          // if the item doesnt exists
          await toast.promise(axiosInstance.post("/invoice", invoice), {
            pending: "Actualizando factura",
            success: "Genial!, tu factura ha sido creada.",
            error: {
              render({ data }) {
                return handleInvoiceError(data);
              },
            },
          });
          router.push("/facturas");
        }
        // dispatch(resetState());
      }

      setConfirmOpen(false);
    } catch (error) {}
  };

  return (
    <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col pb-5">
      <div className="flex w-full justify-between items-center pr-8 ">
        <div>
          <PageHeader
            header="Crear Factura"
            locationRoutes={locationRoutes}
            Icon={<SellOutlined />}
          />
        </div>
      </div>
      <SelectPopUp
        open={openSelect}
        setOpenSelect={setOpenSelect}
        type={type}
      />
      <SelectProducts open={openProductPop} setProductPop={setProductPopUp} />
      <ConfirmationForm
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={upserAsyncInvoice}
        message="Estas seguro que quieres crear la factura?"
      />
      <PaymentPopUp open={paymentPopUpOpen} setPaymentPopUp={setPaymentPopUp} />
      {/* Invoice  */}
      <Card className="flex flex-col h-full w-full shadow-lg rounded-xl my-3">
        {/* Sender and Receiver */}
        <Grid container className="flex justify-between  px-8 py-3">
          <Grid item className="w-full" xs={12} md={6}>
            <div className=" flex items-center justify-between">
              <span className="text-neutral-500 text-lg">De:</span>
              <Button
                startIcon={<Edit />}
                className="h-10 font-bold"
                size="small"
                onClick={() => {
                  setOpenSelect(true), setType("beneficiente");
                }}
              >
                Cambiar
              </Button>
            </div>
            <InvoiceBeneficiary />
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            md={1}
            sx={{ display: { xs: "none", md: "block", lg: "block" } }}
          ></Divider>
          <Grid item className="w-full" xs={12} md={5}>
            <Divider
              light
              orientation="horizontal"
              sx={{
                width: "100%",
                display: { xs: "flex", md: "none", lg: "none" },
              }}
            ></Divider>
            <div className=" flex items-center justify-between">
              <span className="text-neutral-500 text-lg">Para:</span>
              <Button
                startIcon={<Edit />}
                className="h-10 font-bold"
                size="small"
                onClick={() => {
                  setOpenSelect(true), setType("recipiente");
                }}
              >
                Cambiar
              </Button>
            </div>
            <InvoiceRecipient />
          </Grid>
        </Grid>
        {/* Invoice settings Inputs */}
        <InvoiceInputs />
        {/* Details */}
        <div className="p-3">
          <span className=" text-xl text-neutral-400">Detalles:</span>
          <InvoiceDetail />
        </div>
        {details.length < 1 && (
          <span className="text-lg text-neutral-400 text-center p-2">
            No hay detalles
          </span>
        )}
        <Divider orientation="horizontal" variant="middle" flexItem></Divider>
        {/* Discount and Taxes */}
        <InvoiceMethods
          setPaymentPopUp={setPaymentPopUp}
          setProductPopUp={setProductPopUp}
        />
        {/* Totals */}
        <InvoiceTotals />
      </Card>
      {/* Buttons */}
      <div className="px-5 p-2 justify-end flex space-x-2">
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          color="grey"
          onClick={() => dispatch(resetState())}
          // className=" w-44 bg-neutral-200 hover:bg-neutral-300 font-extrabold h-12 text-xs rounded-2xl"
        >
          Salvar como Draft
        </Button>

        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          type="submit"
          color="primary"
          // className=" w-44 bg-green-600 text-white font-extrabold h-12 rounded-2xl"
          onClick={() => setConfirmOpen(true)}
        >
          Crear y enviar
        </Button>
      </div>
    </div>
  );
}
