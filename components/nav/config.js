// component
import { Box } from "@mui/material";
// import { useTranslation } from "react-i18next";

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

// const { t } = useTranslation();

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
        // items: [
        //   { title: "Nuevo", path: "/crear" },
        //   { title: "lista", path: "/sucursales" },
        // ],
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
      {
        title: "Categorias",
        path: "/categorias",
        icon: Icon("categories"),
        info: "",
        items: [
          { title: "Categorias", path: "/categorias" },
          { title: "SubCategorias", path: "/subcategorias" },
        ],
      },
      {
        title: "Marcas",
        path: "/marcas",
        icon: Icon("brands"),
        info: "",
      },
      {
        title: "Proveedores",
        path: "/proveedores",
        icon: Icon("supplier"),
        info: "",
        items: [
          { title: "Nuevo", path: "/proveedores/crear" },
          { title: "Lista", path: "/proveedores" },
        ],
      },
    ],
  },
  {
    groupTitle: "Gestion",
    items: [
      {
        title: "Products",
        path: "/productos",
        icon: Icon("products"),
        info: "",
        items: [
          { title: "Nuevo", path: "/productos/crear" },
          { title: "Lista", path: "/productos" },
        ],
      },
      {
        title: "Clientes",
        path: "/clientes",
        icon: Icon("users"),
        info: "",
      },
      {
        title: "Invoices",
        path: "/facturas",
        icon: Icon("invoices"),
        info: "",
        items: [
          { title: "Nuevo", path: "/facturas/crearfactura" },
          { title: "Lista", path: "/facturas" },
        ],
      },

      {
        title: "Receptions",
        path: "/recepcionmercancia",
        icon: Icon("receptions"),
        info: "",
        items: [
          { title: "Nuevo", path: "/recepcionmercancia/crearfacturamercancia" },
          { title: "Lista", path: "/recepcionmercancia" },
        ],
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
