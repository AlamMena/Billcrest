import React from "react";
import { Button, Checkbox, Link, Avatar, AvatarGroup } from "@mui/material";
import { Info } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { FaGoogle } from "react-icons/fa";
import { FiFacebook, FiGithub } from "react-icons/fi";
import { useForm } from "react-hook-form";
import useAuth from "../auth/useAuth";
import { useState } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material";
import palette from "../styles/theme/palette";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const { LogIn } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogin = async (data) => {
    try {
      await LogIn(data);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const avatars = [
    {
      alt: "Mario",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8DLCX8WkTXBhPLEdDSurXmr66XlwIpa_EuY4cpUS9WxexK-piyps9ivFHtbnltBgDq7g&usqp=CAU",
      width: 40,
      height: 40,
    },
    {
      alt: "Mario",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwzF6ZipCh3_AcIho22fXQyvr2QSm2zZgq677xCnpS-IZor0dWyrrHQma6FUyGt2qXUFI&usqp=CAU",
      width: 40,
      height: 40,
    },
    {
      alt: "Mario",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz6FOCo35CJu6oDizL-rBOxFRoB_txplyFcOpAlSP2-qpUJar1J9n0FfZWBvEcCZ_Yz1w&usqp=CAU",
      width: 40,
      height: 40,
    },
    {
      alt: "Mario",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEO2XAm5iqp93uhaOFjtoOstSpBbDRlvBUuuWt9GZd5gy27yb5xZeveE8A_DjbIaGL7cQ&usqp=CAU",
      width: 40,
      height: 40,
    },
  ];

  return (
    <>
      {/* Login Page */}
      <div className="grid grid-cols-12 h-screen">
        {/*---------------------------------- Login Form -------------------------------------*/}
        <div className=" lg:ml-14 md:ml-0 lg:col-span-5 col-span-12 flex lg:items-center sm:items-baseline md:items-center pt-12 md:pt-0 justify-center bg-inherit lg:bg-inherit md:bg-gray-200">
          <div className=" lg:bg-inherit bg-inherit md:bg-white md:h-fit md:w-80 md:shadow-lg shadow-none lg:shadow-none rounded-xl lg:w-80 h-96 w-96 md:py-10 md:p-4 p-2 m-2 lg:py-0 lg:p-2">
            <Avatar
              alt="logo"
              variant="square"
              src="/logo.png"
              sx={{ width: 65, height: 65 }}
            />

            <div className=" text-3xl font-bold tracking-tighter mt-5">
              {t("login.login")}
            </div>
            <div className="text-xs mb-2">
              <span> {t("login.exist")}</span>
              <Link href="#" underline="always">
                <span> {t("login.create")}</span>
              </Link>
            </div>
            <div className=" flex flex-nowrap items-center gap-2 bg-slate-200 text-sm p-2  my-2 rounded-xl">
              <Info />
              <p>
                Use email: <b>testuser@gmail.com</b> / password: <b>1234567</b>
              </p>
            </div>
            {/* Inputs */}
            <form onSubmit={handleSubmit((data) => handleLogin(data))}>
              <div className="py-2">
                <TextField
                  required
                  id="email"
                  label={t("login.email")}
                  {...register("email")}
                  size="small"
                  error={error}
                  fullWidth
                  autoComplete="off"
                />
              </div>
              <div className="py-2">
                <TextField
                  autoComplete="off"
                  required
                  id="password"
                  error={error}
                  helperText={error ? t("login.found") : ""}
                  label={t("login.passw")}
                  {...register("password")}
                  size="small"
                  type="password"
                  fullWidth
                />
              </div>

              {/* Rembember me container */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center tracking-wide text-xs">
                  <Checkbox />
                  {t("login.remember")}
                </div>
                <div className="tracking-wide text-xs font-bold text-right">
                  <Link href="#" underline="always">
                    {t("login.forgotP")}
                  </Link>
                </div>
              </div>
              {/* Sign In Button */}
              <div className="p-3">
                <Button
                  className=" rounded-full bg-green-600"
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  <span className=" text-white font-bold tracking-wider">
                    {t("login.login")}
                  </span>
                </Button>
              </div>
            </form>
            <hr className="my-4"></hr>
            {/* Icons container */}
            <div className="flex justify-around mt-5">
              <Button variant="outlined" size="large">
                <FiFacebook />
              </Button>
              <Button variant="outlined" size="large">
                <FaGoogle />
              </Button>
              <Button variant="outlined" size="large">
                <FiGithub />
              </Button>
            </div>
          </div>
        </div>
        {/*-------------------------------- Login background -------------------------------- */}
        <div className=" hidden lg:flex lg:col-span-7 bg-[url('https://cdn.dribbble.com/users/373274/screenshots/10805897/media/6e234812bc4204db2848082933592e54.png')] bg-cover lg:items-center">
          <div className=" px-20 bg-[#F9FAFB]">
            {/* Title and subtitle */}
            <div className=" text-green-700/60 text-5xl p-3 rounded-md">
              {t("login.welcome")}
            </div>
            <div className=" text-green-600/80 text-sm p-3 ">
              {t("login.createdBy")}
            </div>
            {/* Avatars */}
            <div className="flex items-center py-4 px-3 ">
              <AvatarGroup max={4}>
                {avatars.map((item, index) => {
                  return (
                    <Avatar
                      key={index}
                      alt={item.alt}
                      src={item.src}
                      sx={{ width: item.width, height: item.height }}
                    />
                  );
                })}
              </AvatarGroup>
              <div className="text-green-600 px-4 text-xs">
                {t("login.joinUs")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
