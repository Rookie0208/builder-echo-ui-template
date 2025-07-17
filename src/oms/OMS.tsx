import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-data-grid-pro/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppTheme from "../shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../dashboard/theme/customizations";

// Components
import OMSLogin from "./components/OMSLogin";
import OMSNavbar from "./components/OMSNavbar";
import OMSSideMenu from "./components/OMSSideMenu";
import OMSHeader from "./components/OMSHeader";

// Pages
import OMSDashboard from "./pages/OMSDashboard";
import ProductCatalog from "./pages/ProductCatalog";
import CreateOrder from "./pages/CreateOrder";
import Orders from "./pages/Orders";
import Packaging from "./pages/Packaging";
import Deliveries from "./pages/Deliveries";
import Clients from "./pages/Clients";
import Reports from "./pages/Reports";

// Types
export interface Tenant {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  tenantId: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  tenant: Tenant | null;
  token: string | null;
}

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

// Mock tenant data
const mockTenants: Tenant[] = [
  {
    id: "tenant1",
    name: "ACME Corporation",
    logo: "https://via.placeholder.com/40x40/1976d2/ffffff?text=A",
    primaryColor: "#1976d2",
    secondaryColor: "#42a5f5",
  },
  {
    id: "tenant2",
    name: "TechFlow Solutions",
    logo: "https://via.placeholder.com/40x40/388e3c/ffffff?text=T",
    primaryColor: "#388e3c",
    secondaryColor: "#66bb6a",
  },
];

export default function OMS() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    tenant: null,
    token: null,
  });

  // Check for stored auth data on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("omsAuth");
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        const tenant = mockTenants.find(
          (t) => t.id === parsedAuth.user?.tenantId,
        );
        setAuth({
          ...parsedAuth,
          tenant,
        });
      } catch (error) {
        console.error("Failed to parse stored auth:", error);
        localStorage.removeItem("omsAuth");
      }
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    // Mock authentication - replace with real API call
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data based on email
      const mockUser: User = {
        id: "user1",
        email,
        name: email
          .split("@")[0]
          .replace(/[._]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        tenantId: email.includes("acme") ? "tenant1" : "tenant2",
        role: "admin",
      };

      const tenant =
        mockTenants.find((t) => t.id === mockUser.tenantId) || mockTenants[0];
      const token = "mock-jwt-token-" + Date.now();

      const authData = {
        isAuthenticated: true,
        user: mockUser,
        tenant,
        token,
      };

      setAuth(authData);
      localStorage.setItem("omsAuth", JSON.stringify(authData));

      return { success: true };
    } catch (error) {
      return { success: false, error: "Authentication failed" };
    }
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      tenant: null,
      token: null,
    });
    localStorage.removeItem("omsAuth");
  };

  if (!auth.isAuthenticated) {
    return (
      <AppTheme themeComponents={xThemeComponents}>
        <CssBaseline enableColorScheme />
        <OMSLogin onLogin={handleLogin} />
      </AppTheme>
    );
  }

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <OMSSideMenu tenant={auth.tenant!} />
        <OMSNavbar
          user={auth.user!}
          tenant={auth.tenant!}
          onLogout={handleLogout}
        />

        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <OMSHeader tenant={auth.tenant!} />
            <Routes>
              <Route
                index
                element={
                  <OMSDashboard user={auth.user!} tenant={auth.tenant!} />
                }
              />
              <Route
                path="catalog"
                element={<ProductCatalog tenant={auth.tenant!} />}
              />
              <Route
                path="create-order"
                element={
                  <CreateOrder user={auth.user!} tenant={auth.tenant!} />
                }
              />
              <Route path="orders" element={<Orders tenant={auth.tenant!} />} />
              <Route
                path="packaging"
                element={<Packaging tenant={auth.tenant!} />}
              />
              <Route
                path="deliveries"
                element={<Deliveries tenant={auth.tenant!} />}
              />
              <Route
                path="clients"
                element={<Clients tenant={auth.tenant!} />}
              />
              <Route
                path="reports"
                element={<Reports tenant={auth.tenant!} />}
              />
            </Routes>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
