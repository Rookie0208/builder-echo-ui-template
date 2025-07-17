import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { User, Tenant } from "../OMS";

interface CreateOrderProps {
  user: User;
  tenant: Tenant;
}

export default function CreateOrder({ user, tenant }: CreateOrderProps) {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" gutterBottom>
        Create Order
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Order creation functionality will be implemented here.
      </Typography>
    </Box>
  );
}
