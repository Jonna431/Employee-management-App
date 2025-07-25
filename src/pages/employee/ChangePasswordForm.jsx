import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import SectionTitle from "../SectionTitle";
import CustomTextField from "../CustomTextField";

// Validation schema
const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(6, "Minimum 6 characters"),
  newPassword: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("New password is required")
    .notOneOf(
      [yup.ref("currentPassword")],
      "New password must be different from current password"
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm your new password"),
});

const ChangePasswordForm = () => {
  const { user, logout } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    getValues,
  } = useForm({ resolver: yupResolver(schema) });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onSubmit = async () => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      if (!user) {
        setErrorMessage("No user logged in!");
        return;
      }

      const data = getValues();
      const existingUsers =
        JSON.parse(localStorage.getItem("employee-users")) || [];

      const currentUserIndex = existingUsers.findIndex(
        (u) => u.email === user.email
      );

      if (currentUserIndex === -1) {
        setErrorMessage("User not found!");
        return;
      }

      if (existingUsers[currentUserIndex].password !== data.currentPassword) {
        setError("currentPassword", {
          type: "manual",
          message: "Current password is incorrect",
        });
        return;
      }

      existingUsers[currentUserIndex].password = data.newPassword;
      localStorage.setItem("employee-users", JSON.stringify(existingUsers));

      if (localStorage.getItem("employee-user")) {
        const currentUserData = JSON.parse(
          localStorage.getItem("employee-user")
        );
        localStorage.setItem(
          "employee-user",
          JSON.stringify({
            ...currentUserData,
          })
        );
      }

      reset();
      setSuccessMessage("Password changed successfully!");
      handleCloseDialog();
    } catch (error) {
      setErrorMessage("An error occurred while changing password");
      console.error("Password change error:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <SectionTitle title="Change Password" />

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit(handleOpenDialog)} noValidate>
          <CustomTextField
            label="Current Password"
            name="currentPassword"
            type={showPassword.current ? "text" : "password"}
            register={register}
            error={errors.currentPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle current password visibility"
                    onClick={() => handleClickShowPassword("current")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword.current ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CustomTextField
            label="New Password"
            name="newPassword"
            type={showPassword.new ? "text" : "password"}
            register={register}
            error={errors.newPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new password visibility"
                    onClick={() => handleClickShowPassword("new")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword.new ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CustomTextField
            label="Confirm New Password"
            name="confirmNewPassword"
            type={showPassword.confirm ? "text" : "password"}
            register={register}
            error={errors.confirmNewPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => handleClickShowPassword("confirm")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword.confirm ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{
              mt: 3,
              py: 1,
              backgroundColor: "#2a7b8bff",
              "&:hover": {
                bgcolor: "#22b7b7ff",
              },
            }}
          >
            {isSubmitting ? "Processing..." : "Change Password"}
          </Button>
        </form>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Password Change</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to change your password? You will need to
              use your new password for future logins.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={onSubmit}
              color="primary"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Confirm Change"}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default ChangePasswordForm;
