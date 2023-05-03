import React from "react";
import { Button, TextField, Card } from "@mui/material";
import { CameraAltRounded, PhoneOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ProfileSettings() {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { t } = useTranslation();

  const onSubmit = async (data) => {
    // const dataParsed = {
    //   address: "none",
    //   isDeleted: false,
    //   ...data,
    // };
    // await upsertAsync(dataParsed);
    console.log(data);
  };

  return (
    <div className="w-full h-full grid grid-cols-12 gap-4 ">
      {/* Image Setting Container */}
      <div className="flex justify-center col-span-12 lg:col-span-4">
        <Card className="  w-full px-8 py-12 flex flex-col items-center">
          <figure className=" relative w-40 h-40 outline-dashed outline-2 outline-neutral-200  p-2 rounded-full">
            <Button
              component="label"
              className=" button-image absolute inset-0 m-2"
            >
              <div className="w-full flex flex-col justify-center space-y-2 items-center">
                <CameraAltRounded />
                <span className="text-xs capitalize">{t("updateImg")}</span>
              </div>

              <input
                // onChange={handleImageInput}
                hidden
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
            <Image
              // src={
              //   currentImage
              //     ? currentImage
              //     : contact?.imageUrl
              //     ? contact.imageUrl
              //     : "/dashboard_welcome.png"
              // }
              alt=""
              className=" w-36 h-36 rounded-full transition-all  "
            />
          </figure>
          <span className="text-xs px-8 m-4 text-center max-w-sm  text-neutral-500">
            Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
          </span>
        </Card>
      </div>
      {/* Form */}
      <Card className=" col-span-12 lg:col-span-8 max-w-3xl ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-8 space-y-6 px-6"
        >
          <div className="md:flex md:space-x-4 space-y-6 md:space-y-0">
            <TextField
              {...register("name", {
                required: true,
              })}
              id="outlined-adornment-name"
              label={t("name")}
              error={errors.name && "value"}
              className="input-rounded"
              helperText={errors.name && t("inputValid")}
              variant="outlined"
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <BadgeOutlined
              //         className={`${errors.name && "text-red-500"} `}
              //       />
              //     </InputAdornment>
              //   ),
              // }}
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
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <EmailOutlined
              //         className={`${errors.email && "text-red-500"} `}
              //       />
              //     </InputAdornment>
              //   ),
              // }}
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
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <PhoneOutlined
              //         className={`${errors.phone && "text-red-500"} `}
              //       />
              //     </InputAdornment>
              //   ),
              // }}
            />
            <TextField
              {...register("address", { required: true })}
              id="outlined-adornment-phone"
              label={t("address")}
              size="medium"
              className="input-rounded text-md"
              variant="outlined"
              error={errors.phone}
              helperText={errors.phone && t("inputValid")}
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
        </form>
      </Card>
    </div>
  );
}
