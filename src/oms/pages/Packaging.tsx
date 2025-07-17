import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Tenant } from "../OMS";

interface PackagingProps {
  tenant: Tenant;
}

export default function Packaging({ tenant }: PackagingProps) {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography variant="h4" gutterBottom>
        Packaging Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Packaging management functionality will be implemented here.
      </Typography>
    </Box>
  );
}
