import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Inventory2,
  LocalShipping,
  Warning,
  CheckCircle,
  AccessTime,
  Assignment,
} from "@mui/icons-material";
import { User, Tenant } from "../OMS";

interface OMSDashboardProps {
  user: User;
  tenant: Tenant;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  color,
}: StatCardProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
            {trend !== undefined && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                sx={{ mt: 1 }}
              >
                {trend > 0 ? (
                  <TrendingUp color="success" fontSize="small" />
                ) : (
                  <TrendingDown color="error" fontSize="small" />
                )}
                <Typography
                  variant="body2"
                  color={trend > 0 ? "success.main" : "error.main"}
                  fontWeight="medium"
                >
                  {Math.abs(trend)}% from last month
                </Typography>
              </Stack>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: color + "15",
              color: color,
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

interface RecentOrderProps {
  id: string;
  customer: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
}

function RecentOrderItem({
  id,
  customer,
  amount,
  status,
  date,
}: RecentOrderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AccessTime fontSize="small" />;
      case "processing":
        return <Assignment fontSize="small" />;
      case "shipped":
        return <LocalShipping fontSize="small" />;
      case "delivered":
        return <CheckCircle fontSize="small" />;
      default:
        return <AccessTime fontSize="small" />;
    }
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <ShoppingCart fontSize="small" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2" fontWeight="medium">
              #{id}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ${amount.toFixed(2)}
            </Typography>
          </Stack>
        }
        secondary={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 0.5 }}
          >
            <Typography variant="body2" color="text.secondary">
              {customer}
            </Typography>
            <Chip
              icon={getStatusIcon(status)}
              label={status.charAt(0).toUpperCase() + status.slice(1)}
              size="small"
              color={getStatusColor(status) as any}
              variant="outlined"
            />
          </Stack>
        }
      />
    </ListItem>
  );
}

export default function OMSDashboard({ user, tenant }: OMSDashboardProps) {
  // Mock data
  const recentOrders: RecentOrderProps[] = [
    {
      id: "12345",
      customer: "ACME Corp",
      amount: 1250.0,
      status: "delivered",
      date: "2024-01-15",
    },
    {
      id: "12346",
      customer: "TechFlow Solutions",
      amount: 890.5,
      status: "shipped",
      date: "2024-01-14",
    },
    {
      id: "12347",
      customer: "Global Industries",
      amount: 2100.75,
      status: "processing",
      date: "2024-01-14",
    },
    {
      id: "12348",
      customer: "Startup Inc",
      amount: 445.25,
      status: "pending",
      date: "2024-01-13",
    },
  ];

  const lowStockItems = [
    { name: "Product A", stock: 5, minStock: 20 },
    { name: "Product B", stock: 2, minStock: 15 },
    { name: "Product C", stock: 8, minStock: 25 },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* Welcome Section */}
      <Card
        sx={{
          mb: 3,
          background: `linear-gradient(135deg, ${tenant.primaryColor}15 0%, ${tenant.secondaryColor}15 100%)`,
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Welcome back, {user.name}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your orders today.
          </Typography>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value="1,234"
            subtitle="This month"
            trend={12}
            icon={<ShoppingCart />}
            color={tenant.primaryColor}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue"
            value="$45,678"
            subtitle="This month"
            trend={8}
            icon={<TrendingUp />}
            color="#4caf50"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Orders"
            value="23"
            subtitle="Need attention"
            icon={<AccessTime />}
            color="#ff9800"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Delivered"
            value="1,156"
            subtitle="This month"
            trend={15}
            icon={<CheckCircle />}
            color="#2196f3"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid xs={12} md={8}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Recent Orders
                </Typography>
                <Button variant="outlined" size="small">
                  View All
                </Button>
              </Stack>
              <List>
                {recentOrders.map((order, index) => (
                  <React.Fragment key={order.id}>
                    <RecentOrderItem {...order} />
                    {index < recentOrders.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Alerts & Stock */}
        <Grid xs={12} md={4}>
          <Stack spacing={3}>
            {/* Low Stock Alert */}
            <Card>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  <Warning color="warning" />
                  <Typography variant="h6" fontWeight="bold">
                    Low Stock Alert
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  {lowStockItems.map((item, index) => (
                    <Box key={index}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 0.5 }}
                      >
                        <Typography variant="body2" fontWeight="medium">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.stock}/{item.minStock}
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={(item.stock / item.minStock) * 100}
                        color={
                          item.stock < item.minStock * 0.5 ? "error" : "warning"
                        }
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Quick Actions
                </Typography>
                <Stack spacing={1}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    sx={{ justifyContent: "flex-start" }}
                  >
                    Create New Order
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Inventory2 />}
                    sx={{ justifyContent: "flex-start" }}
                  >
                    Update Inventory
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<LocalShipping />}
                    sx={{ justifyContent: "flex-start" }}
                  >
                    Track Deliveries
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
