import PropTypes from "prop-types";
// @mui
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { ExpandLess, ExpandMore, FiberManualRecord } from "@mui/icons-material";
import palette from "../../styles/theme/palette";
import { useTranslation } from "react-i18next";

import useAuth from "../../auth/useAuth";
//

// ----------------------------------------------------------------------

const StyledNavItem = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledSubNavItemIcon = styled(ListItemIcon)({
  fontSize: 2,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function NavSection({ onClose }) {
  const { pathname, push } = useRouter();
  const { t } = useTranslation();

  const config = [
    {
      groupTitle: t("nav.invoices"),
      items: [
        {
          title: t("nav.invoices"),
          path: "/facturas",
          icon: Icon("invoices"),
          info: "",
          items: [
            { title: t("new"), path: "/facturas/crearfactura" },
            { title: t("list"), path: "/facturas" },
          ],
        },
        {
          title: t("nav.receptions"),
          path: "/recepcionmercancia",
          icon: Icon("receptions"),
          info: "",
          items: [
            {
              title: t("new"),
              path: "/recepcionmercancia/crearfacturamercancia",
            },
            { title: t("list"), path: "/recepcionmercancia" },
          ],
        },
      ],
    },
    {
      groupTitle: "General",
      items: [
        {
          title: t("nav.home"),
          path: "/",
          icon: Icon("apps"),
          info: "",
        },
        {
          title: t("nav.branches"),
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
          title: t("nav.warehouses"),
          path: "/almacenes",
          icon: Icon("warehouses"),
          info: "",
        },
        {
          title: t("nav.categories"),
          path: "/categorias",
          icon: Icon("categories"),
          info: "",
          items: [
            { title: t("nav.categories"), path: "/categorias" },
            { title: t("nav.subcategories"), path: "/subcategorias" },
          ],
        },
        {
          title: t("nav.brands"),
          path: "/marcas",
          icon: Icon("brands"),
          info: "",
        },
        {
          title: t("nav.providers"),
          path: "/proveedores",
          icon: Icon("supplier"),
          info: "",
          items: [
            { title: t("new"), path: "/proveedores/crear" },
            { title: t("list"), path: "/proveedores" },
          ],
        },
      ],
    },
    {
      groupTitle: t("nav.titles.management"),
      items: [
        {
          title: t("nav.products"),
          path: "/productos",
          icon: Icon("products"),
          info: "",
          items: [
            { title: t("new"), path: "/productos/crear" },
            { title: t("list"), path: "/productos" },
          ],
        },
        {
          title: t("nav.clients"),
          path: "/clientes",
          icon: Icon("users"),
          info: "",
        },

        {
          title: t("nav.earnings"),
          path: "/404",
          icon: Icon("earnings"),
          info: "",
        },
        {
          title: t("nav.losses"),
          path: "/404",
          icon: Icon("losses"),
          info: "",
        },
      ],
    },
  ];

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

  return (
    <Box>
      <List disablePadding sx={{ p: 2 }}>
        {config.map((groupItem, index) => (
          <div key={index}>
            <Typography variant="h6" sx={{ p: 2 }}>
              {groupItem.groupTitle}
            </Typography>
            {groupItem.items.map((child, index) => (
              <NavItem
                key={index}
                currentPath={pathname}
                item={child}
                redirect={push}
                onClose={onClose}
              />
            ))}
          </div>
        ))}
        <i className="fi fi-ro-user"></i>
      </List>
    </Box>
  );
}

function NavItem({ item, currentPath, redirect, onClose }) {
  const [open, setOpen] = useState(false);
  const { icon, title, items, info, path } = item;

  return (
    <Box>
      <StyledNavItem
        //   component={RouterLink}
        onClick={() => {
          items ? setOpen(!open) : (redirect(path), onClose?.() ?? null);
        }}
        selected={currentPath === path}
        sx={{
          "&.active": {
            color: "text.primary",
            bgcolor: "action.selected",
            fontWeight: "fontWeightBold",
          },
        }}
      >
        <StyledNavItemIcon
          sx={{ color: currentPath === path && palette.primary.main }}
        >
          {icon && icon}
        </StyledNavItemIcon>
        <ListItemText
          disableTypography
          primary={title}
          sx={{ color: currentPath === path && palette.primary.main }}
        />
        {info && info}
        {items && (open ? <ExpandLess /> : <ExpandMore />)}
      </StyledNavItem>

      <Collapse
        in={open || items?.find((d) => d.path == currentPath) != undefined}
      >
        {items?.map((child, index) => (
          <StyledNavItem
            key={index}
            // component={RouterLink}
            onClick={() => redirect(child.path)}
            // to={child.path}
            sx={{ m: 1 }}
          >
            {" "}
            <StyledSubNavItemIcon
              sx={{ color: currentPath === child.path && palette.primary.main }}
            >
              <FiberManualRecord
                sx={{
                  fontSize: currentPath === child.path ? 14 : 8,
                  color: currentPath === child.path && palette.primary.main,
                }}
              />
            </StyledSubNavItemIcon>
            <ListItemText
              disableTypography
              sx={{ color: currentPath === child.path && palette.text.primary }}
              primary={child.title}
            />
          </StyledNavItem>
        ))}
      </Collapse>
    </Box>
  );
}
// ----------------------------------------------------------------------
