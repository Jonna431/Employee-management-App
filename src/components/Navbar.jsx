// src/components/Navbar.js
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../context/AuthContext";
import logo1 from "../assets/logo1.png";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Reports", path: "/reports" },
  { name: "Leave Management", path: "/leaves" },
  { name: "Tax Calculations", path: "/tax" },
  { name: "Payroll", path: "/payroll" },
];

const Navbar = ({ onMenuClick }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Toggle for avatar menu
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2a7b8bff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo + Mobile Menu Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && onMenuClick && (
            <IconButton color="inherit" onClick={onMenuClick} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
          <img src={logo1} alt="Logo" style={{ height: 60 }} />
        </Box>

        {/* Middle: Nav Links - Hidden on mobile */}
        {user && (
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 18,
              fontWeight: 600,
            }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                {({ isActive }) => (
                  <Typography
                    sx={{
                      color: isActive ? "#dab708ff" : "#fff",
                      fontSize: "1rem",
                      fontWeight: isActive ? 700 : 500,
                      transition: "0.3s",
                      "&:hover": {
                        color: "#dab708ff",
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                )}
              </NavLink>
            ))}
          </Box>
        )}

        {/* Right: Avatar + Dropdown Menu */}
        {user && (
          <Box sx={{ position: "relative" }}>
            <IconButton onClick={() => setMenuOpen((prev) => !prev)}>
              <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>
                {user.fullName?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            {menuOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: 60,
                  right: -15,
                  backgroundColor: "#ffff",
                  p: 4,
                  borderRadius: 1,
                  zIndex: 999,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  component={Link}
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  sx={{
                    color: "#333",
                    textDecoration: "none",
                    p: 1,
                    "&:hover": { color: "#09afaaff" },
                  }}
                >
                  Settings
                </Typography>
                <Typography
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  sx={{
                    color: "#333",
                    p: 1,
                    cursor: "pointer",
                    "&:hover": { color: "#f50909ff" },
                  }}
                >
                  Logout
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
