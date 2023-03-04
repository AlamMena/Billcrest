// component
import { Box } from "@mui/material";
import { list } from "postcss";
import { forwardRef } from "react";

// ----------------------------------------------------------------------
const SvgColor = forwardRef(({ src, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: "inline-block",
      bgcolor: "currentColor",
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const config = [
  {
    groupTitle: "General",
    items: [
      {
        title: "Inicio",
        path: "/",
        icon: icon("apps"),
        info: "",
      },
      {
        title: "Sucursales",
        path: "/sucursales",
        icon: icon("branches"),
        info: "",
        items: [
          { title: "Nuevo", path: "/crear" },
          { title: "lista", path: "/sucursales" },
        ],
      },
      // {
      //   title: "Almacenes",
      //   path: "/almacenes",
      //   icon: icon("dashboard"),
      //   info: "",
      // },
      {
        title: "Almacenes",
        path: "/almacenes",
        icon: icon("warehouses"),
        info: "",
      },
    ],
  },
  {
    groupTitle: "Inventory",
    items: [
      {
        title: "Products",
        path: "/dashboard/blog",
        icon: icon("products"),
        info: "",
      },
      {
        title: "Invoices",
        path: "/login",
        icon: icon("invoices"),
        info: "",
      },

      {
        title: "Receptions",
        path: "/login",
        icon: icon("receptions"),
        info: "",
      },
      {
        title: "Earnings",
        path: "/404",
        icon: icon("earnings"),
        info: "",
      },
      {
        title: "Loss",
        path: "/404",
        icon: icon("losses"),
        info: "",
      },
    ],
  },
];

export default config;
