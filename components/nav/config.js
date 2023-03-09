// component
import { Box } from "@mui/material";

// ----------------------------------------------------------------------
function SvgColor({ src, sx, ...other }) {
  return (
    <Box
      component="span"
      className="svg-color"
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
  );
}

function Icon(name) {
  return (
    <SvgColor
      src={`/assets/icons/navbar/${name}.svg`}
      sx={{ width: 1, height: 1 }}
    />
  );
}

const config = [
  {
    groupTitle: "General",
    items: [
      {
        title: "Inicio",
        path: "/",
        icon: Icon("apps"),
        info: "",
      },
      {
        title: "Sucursales",
        path: "/sucursales",
        icon: Icon("branches"),
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
        icon: Icon("warehouses"),
        info: "",
      },
    ],
  },
  {
    groupTitle: "Inventory",
    items: [
      {
        title: "Products",
        path: "/productos",
        icon: Icon("products"),
        info: "",
      },
      {
        title: "Invoices",
        path: "/facturas",
        icon: Icon("invoices"),
        info: "",
      },

      {
        title: "Receptions",
        path: "/recepcionmercancia",
        icon: Icon("receptions"),
        info: "",
      },
      {
        title: "Earnings",
        path: "/404",
        icon: Icon("earnings"),
        info: "",
      },
      {
        title: "Loss",
        path: "/404",
        icon: Icon("losses"),
        info: "",
      },
    ],
  },
];

export default config;
