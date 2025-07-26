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
          mt: 3,
          px: 2, 
          maxWidth: "1800px", 
          mx: "auto", 
          width: "100%",
          minHeight: "calc(100vh - 64px)", 
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
