import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Tenant } from "../OMS";

interface ReportsProps {
  tenant: Tenant;
}

export default function Reports({ tenant }: ReportsProps) {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Reports and analytics functionality will be implemented here.
      </Typography>
    </Box>
  );
}
