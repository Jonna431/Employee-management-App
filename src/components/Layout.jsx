// src/components/Layout.jsx
import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar onMenuClick={isMobile ? toggleSidebar : null} />
      <Box
        component="main"
        sx={{
          marginTop: "0px", // Adjust to match your Navbar height
          padding: "2px",
          marginLeft: {
            xs: 0,
            md: "0px", // Match your sidebar width
          },
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet
          context={{
            isSidebarOpen: sidebarOpen,
            toggleSidebar: toggleSidebar,
          }}
        />
      </Box>
    </>
  );
};

export default Layout;
