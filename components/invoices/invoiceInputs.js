import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DateRangeRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import useAxios from "../../axios/index";
import {
  updateStatus,
  updateCreationDate,
  updateDueDate,
  updateInvoiceType,
  updateWarehouse,
  updateNCFType,
} from "../../store/invoiceSlice";
import { useForm } from "react-hook-form";

export default function InvoiceInputs({ handlerNumber, bgcolor }) {
  const dispatch = useDispatch();

  const [creationDate, setCreationDate] = useState(dayjs());
  const invoice = useSelector((state) => state.invoice);
  const { invoiceNumber } = invoice;
  const [ncfstypes, setNCFstypes] = useState([]);

  const [invoicetypes, setInvoicetypes] = useState([]);

  const [warehouse, setWarehouse] = useState([]);
  const [warehouseid, setWarehouseId] = useState();

  const [dueDate, setDueDate] = useState(dayjs().add(1, "day"));

  const { axiosInstance } = useAxios();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => alert(data);

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

  useEffect(() => {
    getNCFType();
    getWarehouse();
    getInvoiceType();
    dispatch(updateCreationDate(creationDate.toString()));
    dispatch(updateDueDate(dueDate.toString()));
  });

  return (
    <form
      className={` ${bgcolor} flex items-center overflow-auto`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <button type="submit">submit</button>
      <Grid container spacing={{ xs: 3 }} sx={{ padding: 3 }}>
        {/* Invoice Number */}
        <Grid item xs={12} md={3}>
          <FormControl className="w-full">
            <InputLabel size="normal" htmlFor="outlined-adornment-name">
              Numero de Factura
            </InputLabel>
            <OutlinedInput
              defaultValue={invoiceNumber}
              disabled={handlerNumber}
              id="outlined-adornment-name"
              label="Numero de Factura"
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
            label="Estatus"
            className="w-full"
            select
            {...register("estatus", { required: true })}
            error={errors.estatus && "value"}
            helperText={errors.estatus && `El campo no es valido`}
            variant="outlined"
          >
            <MenuItem value={"Pagado"}>Pagado</MenuItem>
            <MenuItem value={"No Pagado"}>No Pagado</MenuItem>
            <MenuItem value={"Overdue"}>Overdue</MenuItem>
            <MenuItem value={"Draft"}>Draft</MenuItem>
          </TextField>
        </Grid>
        {/* Creation Date */}
        <Grid item xs={12} md={3}>
          <FormControl className="w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputLabel size="normal" htmlFor="outlined-adornment-name">
                Fecha de creacion
              </InputLabel>
              <MobileDatePicker
                label="Fecha de creacion"
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
                Fecha de vencimiento
              </InputLabel>
              <MobileDatePicker
                label="Fecha de vencimiento"
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
            label="Tipo de NCF"
            className="w-full"
            select
            size="normal"
            {...register("ncftype", { required: true })}
            error={errors.ncftype && "value"}
            helperText={errors.ncftype && `El campo no es valido`}
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
            {/* <MenuItem
                    value={"Pagado"}
                    onClick={() => handleNCFtype("Pagado")}
                  >
                    Credito Fiscal
                  </MenuItem> */}
          </TextField>
        </Grid>
        {/* Invoice type */}
        <Grid item xs={12} md={3}>
          <TextField
            id="outlined-adornment-name"
            label="Tipo de Factura"
            className="w-full"
            size="normal"
            select
            type="number"
            {...register("invoicetype", { required: true })}
            error={errors.invoicetype && "value"}
            helperText={errors.invoicetype && `El campo no es valido`}
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
            {/* <MenuItem
                    value={"Pagado"}
                    onClick={() => handleNCFtype("Pagado")}
                  >
                    Credito Fiscal
                  </MenuItem> */}
          </TextField>
        </Grid>
        {/* Warehouse */}
        <Grid item xs={12} md={3}>
          <TextField
            select
            id="outlined-adornment-name"
            label="Almacen"
            size="normal"
            value={warehouseid}
            {...register("warehouseid", { required: true })}
            error={errors.warehouseid && "value"}
            helperText={errors.warehouseid && `El campo no es valido`}
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
    </form>
  );
}
