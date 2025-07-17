import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Tenant } from "../OMS";

interface ClientsProps {
  tenant: Tenant;
}

export default function Clients({ tenant }: ClientsProps) {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" gutterBottom>
        Client Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Client management functionality will be implemented here.
      </Typography>
    </Box>
  );
}
