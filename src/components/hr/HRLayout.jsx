// src/components/hr/HRLayout.jsx
import { Box, CssBaseline } from "@mui/material";
import HRNavbar from "./HRNavbar";

const HRLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <HRNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
        {children}
      </Box>
    </Box>
  );
};

export default HRLayout;
