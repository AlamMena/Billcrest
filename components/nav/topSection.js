import search from "../../public/assets/icons/navbar/search.svg";
import { Box, Avatar, Popover, Divider } from "@mui/material";
import palette from "../../styles/theme/palette";
import { useState } from "react";
import useAuth from "../../auth/useAuth";
import { useRouter } from "next/router";

export default function TopSection() {
  const { LogOut } = useAuth();
  const Router = useRouter();

  const account = {
    photoURL: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
    displayName: "Admin user",
    role: "admin",
    email: "testuser@gmail.com",
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const id = open ? "profile-popover" : undefined;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function SvgColor({ src, sx, ...other }) {
    return (
      <Box
        component="span"
        className="svg-color"
        sx={{
          display: "inline-block",
          bgcolor: palette.grey[600],
          mask: `url(${src}) no-repeat center / contain`,
          WebkitMask: `url(${src}) no-repeat center / contain`,
          ...sx,
        }}
        {...other}
      />
    );
  }

  function Icon(name) {
    return (
      <SvgColor
        src={`/assets/icons/navbar/${name}.svg`}
        sx={{
          padding: "8px",
          width: 24,
          height: 24,
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.1)",
            transitionDuration: "200ms",
            transitionProperty: "all",
            bgcolor: "text.primary.main",
            fontWeight: "fontWeightBold",
          },
        }}
      />
    );
  }

  return (
    <div className="flex w-full items-center justify-between ">
      <div className={`flex justify-cente items-center   p-2`}>
        {Icon("search")}
      </div>
      <div className="flex  p-2 items-center justify-center space-x-4">
        {Icon("users")}
        {Icon("notification")}

        <Avatar
          src={account.photoURL}
          aria-describedby={id}
          onClick={handleClick}
          alt="photoURL"
          sx={{
            "&:hover": {
              cursor: "pointer",
              transform: "scale(1.1)",
              transitionDuration: "200ms",
              transitionProperty: "all",
            },
          }}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="flex flex-col text-sm rounded-2xl">
            <div className="flex flex-col px-4 py-2 mt-1">
              <span className="font-semibold">{account.displayName}</span>
              <span className=" text-neutral-400">{account.email}</span>
            </div>
            <Divider className="px-0" />
            <div className="flex flex-col mx-2 my-2 ">
              <span
                className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200"
                onClick={() => {
                  Router.push("/"), handleClose();
                }}
              >
                Home
              </span>
              <span className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200">
                Profile
              </span>
              <span
                className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200"
                onClick={() => {
                  Router.push("/ajustes"), handleClose();
                }}
              >
                Settings
              </span>
            </div>
            <Divider className="px-0" />
            <div className="flex flex-col mx-2 py-2 ">
              <span
                className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200"
                onClick={() => LogOut()}
              >
                Logout
              </span>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
}
