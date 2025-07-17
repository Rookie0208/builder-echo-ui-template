import * as React from "react";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Add as AddIcon,
  ListAlt as OrdersIcon,
  Inventory2 as PackagingIcon,
  LocalShipping as DeliveryIcon,
  People as ClientsIcon,
  Analytics as ReportsIcon,
} from "@mui/icons-material";
import { Tenant } from "../OMS";

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    borderRight: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.paper,
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  margin: "4px 8px",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.contrastText,
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface OMSSideMenuProps {
  tenant: Tenant;
}

const menuItems = [
  {
    key: "",
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/oms",
  },
  {
    key: "catalog",
    label: "Product Catalog",
    icon: InventoryIcon,
    path: "/oms/catalog",
  },
  {
    key: "create-order",
    label: "Create Order",
    icon: AddIcon,
    path: "/oms/create-order",
  },
  {
    key: "orders",
    label: "Orders",
    icon: OrdersIcon,
    path: "/oms/orders",
  },
  {
    key: "packaging",
    label: "Packaging",
    icon: PackagingIcon,
    path: "/oms/packaging",
  },
  {
    key: "deliveries",
    label: "Deliveries",
    icon: DeliveryIcon,
    path: "/oms/deliveries",
  },
  {
    key: "clients",
    label: "Clients",
    icon: ClientsIcon,
    path: "/oms/clients",
  },
  {
    key: "reports",
    label: "Reports",
    icon: ReportsIcon,
    path: "/oms/reports",
  },
];

export default function OMSSideMenu({ tenant }: OMSSideMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/oms" || path === "/") return "";
    const segments = path.split("/");
    return segments[segments.length - 1];
  };

  const selectedKey = getSelectedKey();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar sx={{ px: 3, py: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Avatar
            src={tenant.logo}
            sx={{
              width: 40,
              height: 40,
              bgcolor: tenant.primaryColor,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {tenant.name.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 600,
                color: tenant.primaryColor,
                fontSize: "1.1rem",
              }}
            >
              {tenant.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Order Management
            </Typography>
          </Box>
        </Stack>
      </Toolbar>

      <Box sx={{ flex: 1, pt: 1 }}>
        <List>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedKey === item.key;

            return (
              <ListItem key={item.key} disablePadding>
                <StyledListItemButton
                  selected={isSelected}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: "0.95rem",
                    }}
                  />
                </StyledListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          display="block"
        >
          Version 1.0.0
        </Typography>
      </Box>
    </StyledDrawer>
  );
}
