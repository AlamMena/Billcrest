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
import { azAZ } from "@mui/material/locale";
import config from "./config";
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

function NavItem({ item, currentPath, redirect, onClose }) {
  const [open, setOpen] = useState(false);
  const { icon, title, items, info, path } = item;
  return (
    <Box>
      <StyledNavItem
        //   component={RouterLink}
        onClick={() => (items ? setOpen(!open) : redirect(path), onClose())}
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
            to={child.path}
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

export default function NavSection({ onClose }) {
  const { pathname, push: redirect } = useRouter();

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
                redirect={redirect}
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

// ----------------------------------------------------------------------
