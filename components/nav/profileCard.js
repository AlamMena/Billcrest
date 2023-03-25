import { alpha, Avatar, Box, Link, styled, Typography } from "@mui/material";
import useAuth from "../../auth/useAuth";

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));
export default function ProfileCard() {
  const { LogOut } = useAuth();

  const account = {
    photoURL: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
    displayName: "Admin user",
    role: "admin",
  };
  return (
    <Box sx={{ mt: 4, mx: 2.5 }}>
      <Link underline="none">
        <StyledAccount>
          <Avatar src={account.photoURL} alt="photoURL" />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              {account.displayName}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {account.role}
            </Typography>
          </Box>
        </StyledAccount>
      </Link>
    </Box>
  );
}
