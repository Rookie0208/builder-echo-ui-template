import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { InputBase, Paper } from "@mui/material";
import { User, Tenant } from "../OMS";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";

const drawerWidth = 280;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
}));

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: 400,
  height: 36,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 20,
  boxShadow: "none",
  "&:hover": {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  "&:focus-within": {
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
  },
}));

interface OMSNavbarProps {
  user: User;
  tenant: Tenant;
  onLogout: () => void;
}

export default function OMSNavbar({ user, tenant, onLogout }: OMSNavbarProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNotifications, setAnchorElNotifications] =
    useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    onLogout();
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        {/* Search Bar */}
        <SearchContainer>
          <IconButton sx={{ p: "6px" }} aria-label="search">
            <SearchIcon fontSize="small" />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "0.9rem" }}
            placeholder="Search orders, products, clients..."
            inputProps={{ "aria-label": "search" }}
          />
        </SearchContainer>

        {/* Right side icons */}
        <Stack direction="row" alignItems="center" spacing={1}>
          {/* Color Mode Toggle */}
          <ColorModeIconDropdown />

          {/* Notifications */}
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={handleOpenNotifications}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Settings */}
          <IconButton size="large" aria-label="settings" color="inherit">
            <SettingsIcon />
          </IconButton>

          {/* User Profile */}
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: tenant.primaryColor,
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </Avatar>
          </IconButton>
        </Stack>

        {/* User Menu */}
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.role} • {tenant.name}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <AccountIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          sx={{ mt: "45px" }}
          anchorEl={anchorElNotifications}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElNotifications)}
          onClose={handleCloseNotifications}
        >
          <Box sx={{ px: 2, py: 1, minWidth: 300 }}>
            <Typography variant="h6" fontWeight="bold">
              Notifications
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleCloseNotifications}>
            <ListItemText
              primary="New order received"
              secondary="Order #12345 from ACME Corp"
              primaryTypographyProps={{ fontSize: "0.9rem" }}
              secondaryTypographyProps={{ fontSize: "0.8rem" }}
            />
          </MenuItem>
          <MenuItem onClick={handleCloseNotifications}>
            <ListItemText
              primary="Low stock alert"
              secondary="Product XYZ-123 is running low"
              primaryTypographyProps={{ fontSize: "0.9rem" }}
              secondaryTypographyProps={{ fontSize: "0.8rem" }}
            />
          </MenuItem>
          <MenuItem onClick={handleCloseNotifications}>
            <ListItemText
              primary="Delivery completed"
              secondary="Order #12340 delivered successfully"
              primaryTypographyProps={{ fontSize: "0.9rem" }}
              secondaryTypographyProps={{ fontSize: "0.8rem" }}
            />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
