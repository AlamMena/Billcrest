import React from "react";
import PageHeader from "../../components/globals/pageHeader";
import {
  Button,
  Card,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useState, useEffect } from "react";
import { Edit, SellOutlined, DateRangeRounded } from "@mui/icons-material";
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
import dayjs from "dayjs";
import PaymentPopUp from "../../components/createInvoice/paymentPopUp";
import InvoiceTotals from "../../components/invoices/invoiceTotals";
import InvoiceInputs from "../../components/invoices/invoiceInputs";
import InvoiceMethods from "../../components/invoices/invoiceMethods";
import { useForm } from "react-hook-form";
import {
  updateStatus,
  updateCreationDate,
  updateDueDate,
  updateInvoiceType,
  updateWarehouse,
  updateNCFType,
} from "../../store/invoiceSlice";
import ConfirmDialogCreate from "../../components/globals/confirmDialogCreate";
import { useTranslation } from "react-i18next";

export default function CreateInvoice() {
  const [openSelect, setOpenSelect] = useState(false);
  const [openProductPop, setProductPopUp] = useState(false);
  const [inputData, setInputData] = useState({});
  const [paymentPopUpOpen, setPaymentPopUp] = useState(false);
  const [type, setType] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmDraftOpen, setConfirmDraftOpen] = useState(false);
  const [creationDate, setCreationDate] = useState(dayjs());
  const [ncfstypes, setNCFstypes] = useState([]);
  const [invoicetypes, setInvoicetypes] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [warehouseid, setWarehouseId] = useState();
  const [dueDate, setDueDate] = useState(dayjs().add(1, "day"));
  const { t } = useTranslation();

  const invoice = useSelector((state) => state.invoice);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { total, details, recipient, payments, invoiceNumber } = invoice;

  const { axiosInstance } = useAxios();
  const dispatch = useDispatch();
  const router = Router;

  const onSubmit = (data) => {
    setInputData(data);
    setConfirmOpen(true);
  };

  const handleCreationDateChange = (value) => {
    setCreationDate(value);
    dispatch(updateCreationDate(value.toString()));
  };
  const handleDueDateChange = (value) => {
    setDueDate(value);
    dispatch(updateDueDate(value.toString()));
  };

  const getNCFType = async () => {
    const queryFilters = `page=${1}&limit=${100}&value=${""}`;
    const { data: apiResponse } = await axiosInstance.get(
      `ncf/types?${queryFilters}`
    );
    setNCFstypes(apiResponse);
  };

  const getInvoiceType = async () => {
    const queryFilters = `page=${1}&limit=${100}&value=${""}`;
    const { data: apiResponse } = await axiosInstance.post(
      `invoice/types?${queryFilters}`
    );
    setInvoicetypes(apiResponse);
  };

  const getWarehouse = async () => {
    const queryFilters = `page=${1}&limit=${100}&value=${""}`;
    const { data: apiResponse } = await axiosInstance.get(
      `warehouses?${queryFilters}`
    );
    setWarehouse(apiResponse.data);
  };

  // handles

  const handleInvoiceError = (error) => {
    console.log(error);
    if (
      error.response.data.status === 400 &&
      error.response.data.message === t("clientPermission")
    ) {
      setConfirmOpen(false);
      return t("clientPermission");
    }
    return t("error");
  };

  // Location Routes

  const locationRoutes = [
    {
      text: t("nav.home"),
      link: "/",
    },
    {
      text: t("nav.invoices"),
      link: "/facturas",
    },
    {
      text: t("newInvoice"),
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
        payments[0].amount < total ||
        payments[0].amount === undefined
      ) {
        if (Object.keys(recipient) <= 0) {
          toast.error(t("addClient"));
        }

        if (details.length <= 0) {
          toast.error(t("addItem"));
        }
        if (payments[0].amount < total || payments[0].amount === undefined) {
          toast.error(t("mountPay"));
        }
      } else {
        // console.log(invoice);
        if (invoice.id !== undefined) {
          // if the item exists
          await toast.promise(axiosInstance.put("/invoice", invoice), {
            pending: t("updatingInvoice"),
            success: t("invoiceCreated"),
            error: {
              render({ data }) {
                return handleInvoiceError(data);
              },
            },
          });
        } else {
          // if the item doesnt exists
          await toast.promise(axiosInstance.post("/invoice", invoice), {
            pending: t("creatingInvoice"),
            success: t("invoiceCreated"),
            error: {
              render({ data }) {
                return handleInvoiceError(data);
              },
            },
          });
        }
        router.push("/facturas");
        dispatch(resetState());
      }
    } catch (error) {
    } finally {
      setConfirmOpen(false);
    }
  };

  useEffect(() => {
    getNCFType();
    getWarehouse();
    getInvoiceType();
    dispatch(updateCreationDate(creationDate.toString()));
    dispatch(updateDueDate(dueDate.toString()));
  }, []);

  useEffect(() => {
    dispatch(updateWarehouse(inputData.warehouseid));
    dispatch(updateStatus(inputData.estatus));
    dispatch(updateNCFType(inputData.ncftype));
    dispatch(updateInvoiceType(inputData.invoicetype));
  }, [
    inputData.warehouseid,
    inputData.estatus,
    inputData.ncftype,
    inputData.invoicetype,
  ]);

  return (
    <form
      className="w-full  flex flex-col pb-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full justify-between items-center pr-8 ">
        <div>
          <PageHeader
            header={t("createInvoice")}
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
      <ConfirmDialogCreate
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={upserAsyncInvoice}
      />
      <ConfirmationForm
        open={confirmDraftOpen}
        setOpen={setConfirmDraftOpen}
        // onConfirm={onSubmit}
      />
      <PaymentPopUp open={paymentPopUpOpen} setPaymentPopUp={setPaymentPopUp} />
      {/* Invoice  */}
      <Card className="flex flex-col h-full w-full shadow-lg rounded-xl my-3">
        {/* Sender and Receiver */}
        <Grid container className="flex justify-between  px-8 py-3">
          <Grid item className="w-full" xs={12} md={6}>
            <div className=" flex items-center justify-between">
              <span className="text-neutral-500 text-lg">{t("from")}</span>
              <Button
                startIcon={<Edit />}
                className="h-10 font-bold"
                size="small"
                onClick={() => {
                  setOpenSelect(true), setType("beneficiente");
                }}
              >
                {t("change")}
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
              <span className="text-neutral-500 text-lg">{t("for")}</span>
              <Button
                startIcon={<Edit />}
                className="h-10 font-bold"
                size="small"
                onClick={() => {
                  setOpenSelect(true), setType("recipiente");
                }}
              >
                {t("change")}
              </Button>
            </div>
            <InvoiceRecipient />
          </Grid>
        </Grid>
        {/* Invoice settings Inputs */}
        <div className={` bg-neutral-100  flex items-center overflow-auto`}>
          <Grid container spacing={{ xs: 3 }} sx={{ padding: 3 }}>
            {/* Invoice Number */}
            <Grid item xs={12} md={3}>
              <FormControl className="w-full">
                <InputLabel size="normal" htmlFor="outlined-adornment-name">
                  {t("invoiceN")}
                </InputLabel>
                <OutlinedInput
                  defaultValue={invoiceNumber}
                  disabled
                  id="outlined-adornment-name"
                  label={t("invoiceN")}
                  size="large"
                  className="rounded-xl"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Status */}
            <Grid item xs={12} md={3}>
              <TextField
                id="outlined-adornment-name"
                label={t("status")}
                className="w-full"
                select
                {...register("estatus", { required: true })}
                error={errors.estatus && "value"}
                helperText={errors.estatus && t("inputValid")}
                variant="outlined"
              >
                <MenuItem value={"Pagado"}>{t("paid")}</MenuItem>
                <MenuItem value={"No Pagado"}>{t("notPaid")}</MenuItem>
                <MenuItem value={"Overdue"}>Overdue</MenuItem>
                <MenuItem value={"Draft"}>Draft</MenuItem>
              </TextField>
            </Grid>
            {/* Creation Date */}
            <Grid item xs={12} md={3}>
              <FormControl className="w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <InputLabel size="normal" htmlFor="outlined-adornment-name">
                    {t("creationDate")}
                  </InputLabel>
                  <MobileDatePicker
                    label={t("creationDate")}
                    inputFormat="MM/DD/YYYY"
                    value={creationDate}
                    onChange={handleCreationDateChange}
                    renderInput={(params) => (
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment position="start">
                            <DateRangeRounded />
                          </InputAdornment>
                        }
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            {/* Due Date */}
            <Grid item xs={12} md={3}>
              <FormControl className="w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <InputLabel size="normal" htmlFor="outlined-adornment-name">
                    {t("dueDate")}
                  </InputLabel>
                  <MobileDatePicker
                    label={t("dueDate")}
                    inputFormat="MM/DD/YYYY"
                    value={dueDate}
                    className="rounded-xl"
                    onChange={(value) => handleDueDateChange(value)}
                    renderInput={(params) => (
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment position="start">
                            <DateRangeRounded />
                          </InputAdornment>
                        }
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            {/* NCF Type */}
            <Grid item xs={12} md={3}>
              <TextField
                id="outlined-adornment-name"
                label={t("ncfType")}
                className="w-full"
                select
                size="normal"
                {...register("ncftype", { required: true })}
                error={errors.ncftype && "value"}
                helperText={errors.ncftype && t("inputValid")}
                variant="outlined"
              >
                {ncfstypes.length > 0 &&
                  ncfstypes.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            {/* Invoice type */}
            <Grid item xs={12} md={3}>
              <TextField
                id="outlined-adornment-name"
                label={t("invoiceType")}
                className="w-full"
                size="normal"
                select
                type="number"
                {...register("invoicetype", { required: true })}
                error={errors.invoicetype && "value"}
                helperText={errors.invoicetype && t("inputValid")}
                variant="outlined"
              >
                {invoicetypes.length > 0 &&
                  invoicetypes.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            {/* Warehouse */}
            <Grid item xs={12} md={3}>
              <TextField
                select
                id="outlined-adornment-name"
                label={t("warehouse")}
                size="normal"
                value={warehouseid}
                {...register("warehouseid", { required: true })}
                error={errors.warehouseid && "value"}
                helperText={errors.warehouseid && t("inputValid")}
                className="w-full"
                variant="outlined"
              >
                {warehouse.length > 0 &&
                  warehouse.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
          </Grid>
        </div>
        {/* Details */}
        <div className="p-3">
          <span className=" text-xl text-neutral-400">{t("details")}</span>
          <InvoiceDetail />
        </div>
        {details.length < 1 && (
          <span className="text-lg text-neutral-400 text-center p-2">
            {t("nodetails")}
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
          // onClick={() => setConfirmDraftOpen(true)}
        >
          {t("draft")}
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          type="submit"
          color="primary"
        >
          {t("create")}
        </Button>
      </div>
    </form>
  );
}
