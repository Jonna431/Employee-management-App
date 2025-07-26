import React, { useState } from "react";
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
  Edit as EditIcon,
  Lock as PasswordIcon,
  Notifications as NotificationIcon,
} from "@mui/icons-material";
import EmployeeProfile from "./EmployeeProfile";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./employee/ChangePasswordForm";
import Notifications from "./employee/Notifications";

const ProfilePage = ({ toggleSidebar, isSidebarOpen }) => {
  const [activeComponent, setActiveComponent] = useState("profile");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 240;

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <EmployeeProfile />;
      case "edit":
        return <EditProfileForm />;
      case "password":
        return <ChangePasswordForm />;
      case "notifications":
        return <Notifications />;
      default:
        return <EmployeeProfile />;
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
          <Box sx={{ p: 1 }}>
            <Typography variant="h6">Your Profile</Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <List sx={{ flexGrow: 1, padding: 0 }}>
            <ListItem
              button
              onClick={() => setActiveComponent("profile")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.action.selected,
                },
                "&:hover": { backgroundColor: theme.palette.action.hover },
                padding: "8px 16px",
              }}
              selected={activeComponent === "profile"}
            >
              <ListItemIcon sx={{ minWidth: "36px" }}>
                <ProfileIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              button
              onClick={() => setActiveComponent("edit")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.action.selected,
                },
                "&:hover": { backgroundColor: theme.palette.action.hover },
                padding: "8px 16px",
              }}
              selected={activeComponent === "edit"}
            >
              <ListItemIcon sx={{ minWidth: "36px" }}>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItem>
            <ListItem
              button
              onClick={() => setActiveComponent("password")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.action.selected,
                },
                "&:hover": { backgroundColor: theme.palette.action.hover },
                padding: "8px 16px",
              }}
              selected={activeComponent === "password"}
            >
              <ListItemIcon sx={{ minWidth: "36px" }}>
                <PasswordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
            <ListItem
              button
              onClick={() => setActiveComponent("notifications")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.action.selected,
                },
                "&:hover": { backgroundColor: theme.palette.action.hover },
                padding: "8px 16px",
              }}
              selected={activeComponent === "notifications"}
            >
              <ListItemIcon sx={{ minWidth: "36px" }}>
                <NotificationIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

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
            padding: "4px",
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
            {renderComponent()}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfilePage;
