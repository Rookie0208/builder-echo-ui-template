import * as React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
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

interface OMSHeaderProps {
  tenant: Tenant;
}

const pageConfig = {
  "/oms": {
    title: "Dashboard",
    subtitle: "Overview of your order management system",
    icon: DashboardIcon,
    breadcrumbs: ["Dashboard"],
  },
  "/oms/catalog": {
    title: "Product Catalog",
    subtitle: "Browse and manage your product inventory",
    icon: InventoryIcon,
    breadcrumbs: ["Dashboard", "Product Catalog"],
  },
  "/oms/create-order": {
    title: "Create Order",
    subtitle: "Place a new order for your customers",
    icon: AddIcon,
    breadcrumbs: ["Dashboard", "Create Order"],
  },
  "/oms/orders": {
    title: "Orders",
    subtitle: "Manage all customer orders and their status",
    icon: OrdersIcon,
    breadcrumbs: ["Dashboard", "Orders"],
  },
  "/oms/packaging": {
    title: "Packaging",
    subtitle: "Manage items ready for packaging",
    icon: PackagingIcon,
    breadcrumbs: ["Dashboard", "Packaging"],
  },
  "/oms/deliveries": {
    title: "Deliveries",
    subtitle: "Track and manage order deliveries",
    icon: DeliveryIcon,
    breadcrumbs: ["Dashboard", "Deliveries"],
  },
  "/oms/clients": {
    title: "Clients",
    subtitle: "Manage your customer information",
    icon: ClientsIcon,
    breadcrumbs: ["Dashboard", "Clients"],
  },
  "/oms/reports": {
    title: "Reports",
    subtitle: "Analytics and insights for your business",
    icon: ReportsIcon,
    breadcrumbs: ["Dashboard", "Reports"],
  },
};

export default function OMSHeader({ tenant }: OMSHeaderProps) {
  const location = useLocation();
  const currentPage =
    pageConfig[location.pathname as keyof typeof pageConfig] ||
    pageConfig["/oms"];
  const Icon = currentPage.icon;

  const currentTime = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: { xs: 2, sm: 4 },
        pb: 2,
      }}
    >
      <Stack spacing={2}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>
          {currentPage.breadcrumbs.map((crumb, index) => {
            const isLast = index === currentPage.breadcrumbs.length - 1;
            return isLast ? (
              <Typography
                key={crumb}
                color="text.primary"
                sx={{ fontWeight: 500 }}
              >
                {crumb}
              </Typography>
            ) : (
              <Link
                key={crumb}
                underline="hover"
                color="inherit"
                href="/oms"
                sx={{ cursor: "pointer" }}
              >
                {crumb}
              </Link>
            );
          })}
        </Breadcrumbs>

        {/* Page Header */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: tenant.primaryColor + "15",
                color: tenant.primaryColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 0.5,
                }}
              >
                {currentPage.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                }}
              >
                {currentPage.subtitle}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Chip
              label={currentTime}
              variant="outlined"
              size="small"
              sx={{
                borderColor: tenant.primaryColor + "40",
                color: tenant.primaryColor,
                fontWeight: 500,
              }}
            />
            <Chip
              label={`Tenant: ${tenant.name}`}
              size="small"
              sx={{
                backgroundColor: tenant.primaryColor + "15",
                color: tenant.primaryColor,
                fontWeight: 500,
                border: "none",
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
