import {
  CameraAltRounded,
  CalendarMonth,
  AttachMoney,
} from "@mui/icons-material";
import {
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Card,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAxios from "../../axios/index";
import { postImage } from "../globals/imageHandler";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className=" grid-cols-12 gap-4 grid ">{children}</Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ContactForm({ contact, invoices }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: contact
      ? contact
      : {
          allowCredit: false,
          creditdays: 0,
          allowDiscount: false,
          discount: 0,
          typeId: 1,
        },
  });
  const { t } = useTranslation();

  const [content, setContent] = useState(0);
  // const [invoices, setInvoices] = useState(false);

  const [clientType, setClientType] = useState(
    contact ? parseInt(contact.type) : ""
  );
  const [fileContainer, setFileContainer] = useState();
  const [currentImage, setCurrentImage] = useState(contact && contact.imageUrl);
  const [allowCredit, setAllowCredit] = useState(false);
  const [allowDiscount, setAllowDiscount] = useState(false);
  const [clientTypes, setClientTypes] = useState();
  const [discount, setDiscount] = useState();
  const [credit, setCredit] = useState();

  const { axiosInstance } = useAxios();
  const router = useRouter();

  useEffect(() => {
    reset(contact);
  }, [contact]);

  useEffect(() => {
    getClientsTypesAsync();
  }, []);

  const handleImageInput = (e) => {
    setCurrentImage(URL.createObjectURL(e.target.files[0]));
    setFileContainer(e.target.files[0]);
  };

  function removeEmptyFields(data) {
    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] == null) {
        delete data[key];
      }
    });
  }

  const upsertAsync = async (requestData) => {
    try {
      // if there is any file
      let imageUrl = requestData ? requestData.imageUrl : null;
      if (fileContainer) {
        imageUrl = await postImage(
          fileContainer,
          `clients/${requestData.name}`
        );
      }

      const parsedData = { ...requestData, imageUrl };

      // logic
      if (requestData.id !== undefined) {
        // if the item exists
        await toast.promise(axiosInstance.put("client", parsedData), {
          pending: t("creatingClient"),
          success: t("clientUpdated"),
          error: t("error"),
        });
        console.log(parsedData);
      } else {
        // if the item doesnt exists
        await toast.promise(axiosInstance.post("client", parsedData), {
          pending: t("creatingClient"),
          success: t("clientCreated"),
          error: t("error"),
        });
      }

      setFileContainer(null);
      await router.push("/clientes");
    } catch (error) {
      // error toast
      toast.error(t("error"));
    }
  };

  const getClientsTypesAsync = async () => {
    try {
      const { data } = await axiosInstance.get("clients/types");
      setClientTypes(data);
      setClientType(contact ? parseInt(contact.type) : 1);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    removeEmptyFields(data);
    data.contacts[0] = { ...data.contacts[0], name: "CASA" };
    data.addresses[0] = {
      ...data.addresses[0],
      country: "RD",
      name: "default",
    };

    // alert(JSON.stringify(data));
    await upsertAsync(data);
  };

  const handleChange = (e, newValue) => {
    setContent(newValue);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  space-y-4 rounded-2xl"
    >
      <TabPanel value={content} index={0}>
        {/* Image handeler */}
        <Card className="flex w-full justify-center col-span-12 lg:col-span-4">
          <div className=" px-8 py-12 flex flex-col   mb-10">
            <figure className="relative m-auto w-40 h-40 outline-dashed outline-2 outline-neutral-200  p-2 rounded-full">
              <Button
                component="label"
                className=" button-image absolute inset-0 m-2"
              >
                <div className="w-full flex flex-col justify-center space-y-2 items-center">
                  <CameraAltRounded />
                  <span className="text-xs capitalize">{t("updateImg")}</span>
                </div>

                <input
                  onChange={handleImageInput}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                />
              </Button>
              <img
                src={
                  currentImage
                    ? currentImage
                    : contact?.imageUrl
                    ? contact.imageUrl
                    : "/dashboard_welcome.png"
                }
                alt=""
                className=" w-36 h-36 rounded-full transition-all  "
              />
            </figure>
            <span className="text-xs px-8 m-5 text-center max-w-sm  text-neutral-500">
              Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
            </span>
            <FormGroup>
              <div className="flex items-center justify-between w-full">
                <div className="text-xs flex flex-col">
                  <span className="font-bold">{t("discount")}</span>
                  <span className="text-neutral-500">
                    {t("applyDiscount")}{" "}
                  </span>
                </div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={allowDiscount}
                      onClick={() => {
                        setAllowDiscount(!allowDiscount);
                      }}
                    />
                  }
                  size="small"
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-xs flex flex-col">
                  <span className="font-bold">{t("credit")}</span>
                  <span className="text-neutral-500">{t("allowCredit")} </span>
                </div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={allowCredit}
                      onClick={() => {
                        setAllowCredit(!allowCredit);
                      }}
                    />
                  }
                  size="small"
                />
              </div>
            </FormGroup>
          </div>
        </Card>

        {/* Personal info client */}
        <Card className="flex flex-col justify-around space-y-3 col-span-12 lg:col-span-8  p-6 ">
          <div className="flex flex-col mx-2 py-2">
            <span className="font-bold tracking-wider">{t("clientInfo")}</span>
            <span className="text-sm text-neutral-500">{t("addClientD")} </span>
          </div>
          <div className="lg:flex w-full space-y-3 lg:space-y-0 lg:space-x-4">
            <FormControl className="w-full">
              <TextField
                {...register("name", {
                  required: true,
                })}
                InputLabelProps={{ shrink: true }}
                id="outlined-adornment-name"
                label={t("name")}
                size="medium"
                error={errors.name && "value"}
                className="input-rounded"
                helperText={errors.name && t("inputValid")}
                variant="outlined"
                fullWidth
              />
            </FormControl>
            <FormControl className="w-full">
              <TextField
                {...register("noIdentification", {
                  required: true,
                })}
                id="outlined-adornment-name"
                label={t("noIdentification")}
                size="large"
                error={errors.noIdentification && "value"}
                className="input-rounded"
                helperText={errors.noIdentification && t("inputValid")}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </FormControl>
          </div>
          <FormControl className="w-full">
            <InputLabel id="select-type-identification">
              {t("clientType")}
            </InputLabel>
            <Select
              {...register("typeId")}
              labelId="select-type-identification"
              id="select-type-identificationr"
              value={clientType}
              onChange={(params) => setClientType(params.target.value)}
              size="large"
              className="rounded-xl text-md"
              label={t("clientType")}
            >
              {clientTypes &&
                clientTypes.map((type, index) => {
                  return (
                    <MenuItem value={type.id} key={index}>
                      <div className="flex items-center">
                        <span className="mx-2">{type.name}</span>
                      </div>
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <FormControl className="w-full">
            <TextField
              {...register("email")}
              id="outlined-adornment-email"
              label={t("login.email")}
              size="medium"
              className="input-rounded text-md"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <div className="lg:flex space-y-3 lg:space-y-0 lg:space-x-4">
            <FormControl className="w-full">
              <TextField
                {...register("addresses.0.address1")}
                id="outlined-adornment-address"
                label={t("address")}
                size="medium"
                className="input-rounded text-md"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
            <FormControl className="w-full">
              <TextField
                {...register("contacts.0.number")}
                id="outlined-adornment-phone"
                label={t("phone")}
                size="medium"
                className="input-rounded text-md"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </div>

          {/* Credit field */}
          <div className="flex space-x-4">
            <FormControl className="w-full">
              <TextField
                {...register("creditDays")}
                id="outlined-adornment-phone"
                label={t("creditDays")}
                size="medium"
                type="number"
                className="input-rounded text-md"
                variant="outlined"
                value={credit}
                disabled={!allowCredit}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonth />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl className="w-full">
              <TextField
                {...register("discount")}
                id="outlined-adornment-phone"
                label={t("discount")}
                size="medium"
                type="number"
                className="input-rounded text-md"
                variant="outlined"
                value={discount}
                disabled={!allowDiscount}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>

          {/* Save Button */}
          <div className="flex w-full justify-end space-x-4  ">
            {/* <Button
                  variant="contained"
                  size="medium"
                  className="  w-28 shadow-xl bg-neutral-200 rounded-2xl hover:bg-neutral-400 hover:text-white"
                  onClick={() => router.push("../suplidores")}
                >
                  Cancelar
                </Button> */}
            <Button variant="contained" type="submit" color="primary">
              {t("save")}
            </Button>
          </div>
        </Card>
      </TabPanel>
    </form>
  );
}
