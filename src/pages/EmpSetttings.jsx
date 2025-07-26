import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import {
  Person as ProfileIcon,
  Lock as PasswordIcon,
  Notifications as NotificationIcon,
  Help as HelpIcon,
  ContactSupport as SupportIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const EmpSettings = ({ toggleSidebar, isSidebarOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 240;
  const navigate = useNavigate();
  const location = useLocation();

  // Menu items configuration
  const menuItems = [
    {
      id: "profile",
      path: "/settings",
      exact: true,
      label: "Profile",
      icon: <ProfileIcon fontSize="small" />,
    },
    // {
    //   id: "profile",
    //   path: "/settings/employee-profile",
    //   label: "Profile",
    //   icon: <ProfileIcon fontSize="small" />,
    // },
    {
      id: "password",
      path: "/settings/change-password",
      label: "Change Password",
      icon: <PasswordIcon fontSize="small" />,
    },
    {
      id: "notifications",
      path: "/settings/notifications",
      label: "Notifications",
      icon: <NotificationIcon fontSize="small" />,
    },
    {
      id: "help",
      path: "/settings/help",
      label: "Help",
      icon: <HelpIcon fontSize="small" />,
    },
    {
      id: "support",
      path: "/settings/support",
      label: "Support",
      icon: <SupportIcon fontSize="small" />,
    },
  ];

  // Improved active check that handles nested routes
  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 64px)",
        width: "100vw",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Sidebar Navigation */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? isSidebarOpen : true}
        onClose={toggleSidebar}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "relative",
            height: "100%",
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            margin: 0,
            "& .MuiTypography-root": { margin: 0 },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: "#2a7b8bff" }}>
              Profile Settings
            </Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <List sx={{ flexGrow: 1, padding: 0 }}>
            {menuItems.map((item) => (
              <ListItem
                button
                key={`${item.id}-${item.path}`}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  ...(isActive(item.path, item.exact)
                    ? {
                        backgroundColor: theme.palette.action.selected,
                        borderLeft: `3px solid ${theme.palette.primary.main}`,
                        "& .MuiListItemIcon-root": {
                          color: theme.palette.primary.main,
                        },
                        "& .MuiListItemText-primary": {
                          fontWeight: "500",
                        },
                      }
                    : {}),
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  padding: "8px 16px",
                }}
              >
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 0,
          overflow: "auto",
          height: "100%",
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Paper
          elevation={5}
          sx={{
            height: "90%",
            padding: "6px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            margin: "20px",
            marginLeft: "10px",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              overflow: "auto",
              flexGrow: 1,
              padding: "4px",
              marginBottom: "30px",
              "& .MuiTypography-root": { margin: 0 },
            }}
          >
            <Outlet />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default EmpSettings;
