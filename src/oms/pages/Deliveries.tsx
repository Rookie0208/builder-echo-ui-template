import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Tenant } from "../OMS";

interface DeliveriesProps {
  tenant: Tenant;
}

export default function Deliveries({ tenant }: DeliveriesProps) {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" gutterBottom>
        Delivery Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Delivery tracking and management functionality will be implemented here.
      </Typography>
    </Box>
  );
}
