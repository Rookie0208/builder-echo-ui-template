import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  MoreVert as MoreIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalShipping as ShipIcon,
  Print as PrintIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { Tenant } from "../OMS";

interface Order {
  id: string;
  customer: string;
  customerEmail: string;
  total: number;
  status:
    | "pending"
    | "processing"
    | "packaged"
    | "shipped"
    | "delivered"
    | "cancelled";
  date: string;
  items: number;
  shippingAddress: string;
}

interface OrdersProps {
  tenant: Tenant;
}

const mockOrders: Order[] = [
  {
    id: "ORD-12345",
    customer: "John Smith",
    customerEmail: "john@acme.com",
    total: 1250.0,
    status: "delivered",
    date: "2024-01-15",
    items: 3,
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-12346",
    customer: "Sarah Johnson",
    customerEmail: "sarah@techflow.com",
    total: 890.5,
    status: "shipped",
    date: "2024-01-14",
    items: 2,
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "ORD-12347",
    customer: "Mike Davis",
    customerEmail: "mike@global.com",
    total: 2100.75,
    status: "processing",
    date: "2024-01-14",
    items: 5,
    shippingAddress: "789 Pine St, Chicago, IL 60601",
  },
  {
    id: "ORD-12348",
    customer: "Emily Wilson",
    customerEmail: "emily@startup.com",
    total: 445.25,
    status: "pending",
    date: "2024-01-13",
    items: 1,
    shippingAddress: "321 Elm St, Austin, TX 78701",
  },
  {
    id: "ORD-12349",
    customer: "David Brown",
    customerEmail: "david@company.com",
    total: 675.8,
    status: "packaged",
    date: "2024-01-12",
    items: 2,
    shippingAddress: "654 Maple Dr, Seattle, WA 98101",
  },
];

const statusColors = {
  pending: "warning",
  processing: "info",
  packaged: "secondary",
  shipped: "primary",
  delivered: "success",
  cancelled: "error",
} as const;

export default function Orders({ tenant }: OrdersProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOrderId, setMenuOrderId] = useState<string | null>(null);

  const statusTabs = [
    { label: "All Orders", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Packaged", value: "packaged" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ];

  const getFilteredOrders = () => {
    let filtered = mockOrders;

    if (selectedTab > 0) {
      const status = statusTabs[selectedTab].value;
      filtered = filtered.filter((order) => order.status === status);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    orderId: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOrderId(null);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
    handleMenuClose();
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // In a real app, this would update the order status via API
    console.log(`Updating order ${orderId} to ${newStatus}`);
    handleMenuClose();
  };

  const filteredOrders = getFilteredOrders();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" fontWeight="bold">
          Order Management
        </Typography>
        <Button variant="contained" startIcon={<ShipIcon />}>
          Bulk Actions
        </Button>
      </Stack>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              placeholder="Search orders by ID, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "action.active" }} />
                ),
              }}
            />

            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
            >
              {statusTabs.map((tab, index) => (
                <Tab key={index} label={tab.label} />
              ))}
            </Tabs>
          </Stack>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="medium">
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: tenant.primaryColor,
                        }}
                      >
                        {order.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {order.customer}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.customerEmail}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.items} items</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      ${order.total.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)
                      }
                      color={statusColors[order.status] as any}
                      size="small"
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(order.date).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMenuOpen(e, order.id)}>
                      <MoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            const order = mockOrders.find((o) => o.id === menuOrderId);
            if (order) handleViewOrder(order);
          }}
        >
          <ViewIcon sx={{ mr: 1 }} fontSize="small" />
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange(menuOrderId || "", "processing")}
        >
          <EditIcon sx={{ mr: 1 }} fontSize="small" />
          Mark as Processing
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange(menuOrderId || "", "shipped")}
        >
          <ShipIcon sx={{ mr: 1 }} fontSize="small" />
          Mark as Shipped
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <PrintIcon sx={{ mr: 1 }} fontSize="small" />
          Print Invoice
        </MenuItem>
      </Menu>

      {/* Order Details Dialog */}
      <Dialog
        open={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <Typography variant="body2">
                  Name: {selectedOrder.customer}
                </Typography>
                <Typography variant="body2">
                  Email: {selectedOrder.customerEmail}
                </Typography>
                <Typography variant="body2">
                  Shipping Address: {selectedOrder.shippingAddress}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Typography variant="body2">
                  Items: {selectedOrder.items}
                </Typography>
                <Typography variant="body2">
                  Total: ${selectedOrder.total.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Status: {selectedOrder.status}
                </Typography>
                <Typography variant="body2">
                  Date: {new Date(selectedOrder.date).toLocaleDateString()}
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowOrderDetails(false)}>Close</Button>
          <Button variant="contained">Update Status</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
