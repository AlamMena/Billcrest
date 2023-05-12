import { Card, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CameraAltRounded, FormGroup } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function CompanySettings() {
  const [fileContainer, setFileContainer] = useState();
  const [currentImage, setCurrentImage] = useState();
  const { t } = useTranslation();

  const handleImageInput = (e) => {
    setCurrentImage(URL.createObjectURL(e.target.files[0]));
    setFileContainer(e.target.files[0]);
  };

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <form
      //   onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row space-y-6 md:space-x-3 "
    >
      <Card className="flex w-full justify-center">
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
              alt=""
              src={
                currentImage
                  ? currentImage
                  : // : contact?.imageUrl
                    // ? contact.imageUrl
                    "/dashboard_welcome.png"
              }
              className=" w-36 h-36 rounded-full transition-all  "
            />
          </figure>
          <span className="text-xs px-8 m-5 text-center max-w-sm  text-neutral-500">
            Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
          </span>
        </div>
      </Card>
      <Card className="flex flex-col w-full space-y-4 p-5">
        <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
          <TextField
            {...register("name", {
              required: true,
            })}
            id="outlined-adornment-name"
            label={t("companyName")}
            size="medium"
            error={errors.name && "value"}
            className="input-rounded"
            helperText={errors.name && t("inputValid")}
            variant="outlined"
            fullWidth
          />
          <TextField
            {...register("email", {
              required: true,
            })}
            id="outlined-adornment-name"
            label={t("login.email")}
            size="medium"
            error={errors.email && "value"}
            className="input-rounded"
            helperText={errors.email && t("inputValid")}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
          <TextField
            {...register("phone", { required: true })}
            id="outlined-adornment-phone"
            label={t("phone")}
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            error={errors.phone}
            helperText={errors.phone && t("inputValid")}
            fullWidth
          />
          <TextField
            {...register("address", { required: true })}
            id="outlined-adornment-phone"
            label={t("address")}
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            error={errors.address}
            helperText={errors.address && t("inputValid")}
            fullWidth
          />
        </div>
        <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
          <TextField
            {...register("website")}
            id="outlined-adornment-phone"
            label={t("website")}
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            fullWidth
          />
          <TextField
            {...register("noIdentification", { required: true })}
            id="outlined-adornment-phone"
            label={t("noIdentification")}
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            error={errors.noIdentification}
            helperText={errors.noIdentification && t("inputValid")}
            fullWidth
          />
        </div>
        <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
          <TextField
            {...register("ncf", { required: true })}
            id="outlined-adornment-phone"
            label={t("fiscalNumber")}
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            error={errors.ncf}
            helperText={errors.ncf && t("inputValid")}
            fullWidth
          />
          <TextField
            {...register("currencyId")}
            id="outlined-adornment-phone"
            label={t("currency")}
            size="medium"
            className="input-rounded text-md"
            variant="outlined"
            error={errors.currencyId}
            helperText={errors.currencyId && t("inputValid")}
            fullWidth
          />
        </div>

        <div className="flex w-full justify-end space-x-4 ">
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="medium"
            className=" w-28 "
          >
            {t("save")}
          </Button>
        </div>
      </Card>
    </form>
  );
}
