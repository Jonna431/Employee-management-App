// src/components/hr/HRNavbar.jsx
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const HRNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          HR Portal
        </Typography>
        <Button color="inherit" onClick={() => navigate("/hr/dashboard")}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate("/hr/employees")}>
          Employees
        </Button>
        <Button color="inherit" onClick={() => navigate("/hr/assets")}>
          Assets
        </Button>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HRNavbar;
