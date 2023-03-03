import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
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

export default function InvoiceInputs() {
  const dispatch = useDispatch();

  const [creationDate, setCreationDate] = useState(dayjs());
  const invoice = useSelector((state) => state.invoice);
  const { invoiceNumber } = invoice;
  const [ncfstypes, setNCFstypes] = useState([]);
  const [ncftype, setNCFtype] = useState("");
  const [invoicetypes, setInvoicetypes] = useState([]);
  const [invoicetype, setInvoicetype] = useState("");
  const [warehouse, setWarehouse] = useState([]);
  const [warehouseid, setWarehouseId] = useState("");
  const [status, setStatus] = useState("Pagado");
  const [dueDate, setDueDate] = useState(dayjs().add(1, "day"));

  const { axiosInstance } = useAxios();

  const handleCreationDateChange = (value) => {
    setCreationDate(value);
    dispatch(updateCreationDate(value.toString()));
  };
  const handleDueDateChange = (value) => {
    setDueDate(value);
    dispatch(updateDueDate(value.toString()));
  };
  const handleStatus = (value) => {
    setStatus(value);
    dispatch(updateStatus(value));
  };

  const handleNCFtype = (value, id) => {
    setNCFtype(value);
    dispatch(updateNCFType(id));
  };

  const handleWarehouse = (value, id) => {
    setWarehouseId(value);
    dispatch(updateWarehouse(id));
  };

  const handleInvoicetype = (value, id) => {
    setInvoicetype(value);
    dispatch(updateInvoiceType(id));
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
  }, []);

  return (
    <div className=" bg-neutral-100 flex items-center overflow-auto  ">
      <Grid container spacing={{ xs: 3 }} sx={{ padding: 3 }}>
        <Grid item xs={12} md={3}>
          <FormControl className="w-full">
            <InputLabel size="normal" htmlFor="outlined-adornment-name">
              Numero de Factura
            </InputLabel>
            <OutlinedInput
              defaultValue={invoiceNumber}
              disabled
              id="outlined-adornment-name"
              label="Numero de Factura"
              size="large"
              className="rounded-xl"
              variant="outlined"
              startAdornment={
                <InputAdornment position="start">
                  {/* <AttachMoney /> */}
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className="w-full">
            <InputLabel size="normal" htmlFor="outlined-adornment-name">
              Estatus
            </InputLabel>
            <Select
              id="outlined-adornment-name"
              label="Estatus"
              size="normal"
              type="number"
              value={status}
              className="rounded-xl"
              variant="outlined"
              startAdornment={
                <InputAdornment position="start">
                  {/* <AttachMoney /> */}
                </InputAdornment>
              }
            >
              <MenuItem value={"Pagado"} onClick={() => handleStatus("Pagado")}>
                Pagado
              </MenuItem>
              <MenuItem
                value={"No Pagado"}
                onClick={() => handleStatus("No Pagado")}
              >
                No Pagado
              </MenuItem>
              <MenuItem
                value={"Overdue"}
                onClick={() => handleStatus("Overdue")}
              >
                Overdue
              </MenuItem>
              <MenuItem value={"Draft"} onClick={() => handleStatus("Draft")}>
                Draft
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
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
                className="rounded-xl"
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
        <Grid item xs={12} md={3}>
          <FormControl className="w-full">
            <InputLabel size="normal" htmlFor="outlined-adornment-name">
              Tipo de NCF
            </InputLabel>
            <Select
              id="outlined-adornment-name"
              label="Tipo de NCF"
              size="normal"
              type="number"
              value={ncftype}
              className="rounded-xl"
              variant="outlined"
              startAdornment={
                <InputAdornment position="start">
                  {/* <AttachMoney /> */}
                </InputAdornment>
              }
            >
              {ncfstypes.length > 0 &&
                ncfstypes.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.id}
                      onClick={() => handleNCFtype(item.name, item.id)}
                    >
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
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className="w-full">
            <InputLabel size="normal" htmlFor="outlined-adornment-name">
              Tipo de Factura
            </InputLabel>
            <Select
              id="outlined-adornment-name"
              label="Tipo de Factura"
              size="normal"
              type="number"
              value={invoicetype}
              className="rounded-xl"
              variant="outlined"
              startAdornment={
                <InputAdornment position="start">
                  {/* <AttachMoney /> */}
                </InputAdornment>
              }
            >
              {invoicetypes.length > 0 &&
                invoicetypes.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.id}
                      onClick={() => handleInvoicetype(item.name, item.id)}
                    >
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
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className="w-full">
            <InputLabel size="normal" htmlFor="outlined-adornment-name">
              Almacen
            </InputLabel>
            <Select
              id="outlined-adornment-name"
              label="Almacen"
              size="normal"
              type="number"
              value={warehouseid}
              className="rounded-xl"
              variant="outlined"
              startAdornment={
                <InputAdornment position="start">
                  {/* <AttachMoney /> */}
                </InputAdornment>
              }
            >
              {warehouse.length > 0 &&
                warehouse.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.id}
                      onClick={() => handleWarehouse(item.name, item.id)}
                    >
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
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
