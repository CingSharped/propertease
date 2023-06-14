import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

import { tokens } from "../../theme";

import Header from "../Header";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.colors);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header
        title="Landlord Dashboard"
        subtitle="Welcome to this dashboard {username}"
      />

      <Box>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Download Reports
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
