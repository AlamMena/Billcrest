import search from "../../public/assets/icons/navbar/search.svg";
import { Box, Avatar } from "@mui/material";
import palette from "../../styles/theme/palette";

export default function TopSection() {
  const account = {
    photoURL: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
    displayName: "Admin user",
    role: "admin",
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
    <div className="flex  w-full items-center justify-between ">
      <div className={`flex justify-center   p-2`}>{Icon("search")}</div>
      <div className="flex p-2 items-center justify-center space-x-4">
        {Icon("users")}
        {Icon("notification")}
        <Avatar
          src={account.photoURL}
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
      </div>
    </div>
  );
}
